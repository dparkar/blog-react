# Aspect Oriented Programming with PostSharp and Gibraltar

Every good programmer tries to make sure that he codes the application or a website in such a way that it never fails. 
Nevertheless, sometimes it does. 
No matter how much effort is put in, it's a different story when the application is out in the real world and gets hammered and tested for real. Therefore, a good programmer should always be aware of the fact that he/she might not have considered all the variables in the equation. 

In fact, some variables can be completely out of control of the programmer itself. For instance, a website that relies on a web service provided by a third party can only hope that the web service is up and running and continues to behave the same way as his application expects it to. But, he can take measures to make sure that his application continues running properly and provide appropriate messages to the user if the failure of the web service or any other failure occurs. 

One way to do that is using exception handling. In fact, at times a programmer may even rely on exceptions to kick off a different behavior of a component.

Big companies have big projects; big projects can mean heavy software which may have multiple components working convolutedly and simultaneously with different functionalities. In a mess like that, if somewhere down the chain of events a failure occurs; it is VERY difficult to find it. Not only for the programmer who developed the application, but it's worse if somebody else is taking a look at it. Finding the failure is only a small part of the process. Even more important than finding the failure is to figure out why it occurred, where it occurred and what were all the variables involved which made it occur. The programmer can make sure that his system never again falls in such a state which caused the error. The easiest way to handle this is by event logging and software tracing.

Kicking off other processes on an event happening due to some circumstances simultaneously such as updating a UI or synchronizing with some other data may be required in a lot of places in the application. This is where multithreading and data binding come in.

To make the application failure resistant, validation and custom exceptions play an important role. Improper input will definitely result in improper output and we want to avoid such input. If an improper input is given, we can throw custom exceptions specifying exactly what was wrong and why was it considered wrong.

Another important issue of any application is performance. An application or website may do what it's supposed to do, but if it doesn't meet performance requirements, it's a failure. A good programmer keeps performance in mind while coding. Performance metrics can really help him to decide his way of programming.
These are all just few examples of the aspects of application development which play an important role towards the success of the application itself and building robust and high quality software. 

But programmers do realize that all these "aspects" of application development are different than the actual business rules of the application the company is trying to develop. These aspects can be translated to rules such as "if calling the web service throws exception, catch the exception and pass back <server down> message to UI" or "if any error occurs, log it" or "the parameter of this method should always be an integer between 10 and 50". 

These aspects are more technical and less business oriented. They are called "cross cutting concerns" and do not fit cleanly in object-oriented programming or procedural programming. These aspects or so called cross-cutting concerns are used all across the application in different conditions and under various situations but they do the same thing repetitively. As a result, the code addressing these cross-cutting concerns is usually scattered or duplicated across various related locations, which result in a loss of modularity.

## Aspect – Oriented Programming
Aspect-Oriented programming aims to encapsulate these cross-cutting concerns into aspects to retain modularity. This allows for clean isolation and reuse of code addressing the cross-cutting concern. By basing designs on cross-cutting concerns, software engineering benefits are affected, including modularity and simplified maintenance. It isolates these secondary concerns from the program's business logic.

## Postsharp
PostSharp is an Aspect-Oriented Programming framework from SharpCrafters that kill all the supporting code. 
"With PostSharp you can easily write and apply custom attributes that add new behaviors to your code-tracing, thread management, exception handling, data binding, and much more." - http://www.sharpcrafters.com/

### The Problem
PostSharp says that there are two parts of a software project:

#### Functional requirements
Functional Requirements are the business rules, the code that achieves the primary objective of the program, which are typically the requirements of the project.

#### Technical requirements
This is the supporting code (boilerplate) that ensures the proper execution and maintainability of the functional code. It is not part of the project requirements, but the application will be unstable and unmaintainable without it.
Because this technical code crosscuts the functional code at various points, it's not properly isolated in maintainable modules. For instance, implementing tracing, exception handling, thread synchronization or validations and most other technical requirements may be required by many methods and thus redundant code is inevitable.

### The Solution
PostSharp encapsulates these technical requirements into aspects in plain C#/VB classes and are applied to business objects and methods without invading their source code. Aspects in .NET are just plain attributes.

### Benefit
The ultimate benefit is a reduced cost of development and maintenance. The team can just decide on one standard technical specification all across the project at one time, and reuse these aspects over and over again.

Developers get to concentrate more on the business logic without worrying about other noise and messy code. The code looks cleaner. The no. of lines of code to write is greatly reduced. Using aspects, automatic implementation of design patterns is possible. For instance, in WPF and WinForms a design pattern is followed, where the objects must implement the INotifyPropertyChanged to update the UI when the property in the object is changed. It's very simple and very boring. This can be done in an aspect for you and this aspect can then be applied to multiple objects.
Architects will realize substantial long term improvements in Reliability as the application will continue to behave as expected over time since no new code is written and automatic implementation is used, Evolvability due to improved separation one part of the application can be changed safely without breaking it, Understandability as every aspect can be completely modular and easily understood to do one single thing, Reusability as all of the aspects can be written independent of the application and Maintainability as the maintenance related aspects such as tracing, performance monitoring or exception handling without invading the original source code will help to detect, diagnose and fix issues that occur after release.
Managers will realize reduced development time, simplifying maintenance and saving money.

### How does it to work ?
PostSharp works post-compilation, and enhances the .NET assemblies just after the C#/VB compiler completes. It adds the functionality the programmer specified in their implementation of the aspect.
The result is that the code is much faster than with run-time aspect weavers.
Anyone can view the enhanced assembly using Reflector.

### How to deploy ?
Use the PostSharp installer or manually edit the .csproj files in a text editor to use PostSharp from certain location. (Source Control)

### Examples
 

Before we add the attributes, we need to add TextWriterTraceListeners to System.Diagnostics.Trace.Listeners and then we write to those listeners in the aspects:

```cs
//Log files will be written to C:\Program Files (x86)\Common Files\microsoft shared\DevServer\10.0,
// because that is where ASP.Net helpfully defaults the write directory to :-)

//Trace Logger
         var traceLoggerFs = new FileStream("TraceLogger.txt", FileMode.OpenOrCreate, FileAccess.ReadWrite, FileShare.ReadWrite);
         var traceLoggerSw = new StreamWriter(traceLoggerFs, System.Text.Encoding.Unicode);
         //Trace Logger Listener
         System.Diagnostics.Trace.Listeners.Add(new System.Diagnostics.TextWriterTraceListener(traceLoggerSw, "TracingListener"));
 
         //Exception Logger
         var exceptionLoggerFs = new FileStream("ExceptionLogger.txt", FileMode.OpenOrCreate, FileAccess.ReadWrite, FileShare.ReadWrite);
         var exceptionLoggerSw = new StreamWriter(exceptionLoggerFs);
         //Exception Logger Listener
         System.Diagnostics.Trace.Listeners.Add(new System.Diagnostics.TextWriterTraceListener(exceptionLoggerSw, "ExceptionListener"));
 
         //Performance Logger
         var performanceLoggerFs = new FileStream("PerformanceLogger.txt", FileMode.OpenOrCreate, FileAccess.ReadWrite, FileShare.ReadWrite);
         var performanceLoggerSw = new StreamWriter(performanceLoggerFs);
         //Performance Logger Listener
         System.Diagnostics.Trace.Listeners.Add(new System.Diagnostics.TextWriterTraceListener(performanceLoggerSw, "PerformanceAnalyzerListener"));
 
         //Field Value Logger
         var fieldValueLoggerFs = new FileStream("FieldValueLogger.txt", FileMode.OpenOrCreate, FileAccess.ReadWrite, FileShare.ReadWrite);
         var fieldValueLoggerSw = new StreamWriter(fieldValueLoggerFs);
         //Field Value Tracker Logger Listener
         System.Diagnostics.Trace.Listeners.Add(new System.Diagnostics.TextWriterTraceListener(fieldValueLoggerSw, "FieldValueListener"));
```

Following are some of the aspects written using PostSharp. They have been divided into two categories based on their purposes:

#### Logging :

1. TraceMeAttribute : A simple aspect which Traces the execution of the method:

```cs
using System;
using PostSharp.Aspects;
 
namespace CustomLoggingAttributes
{
   [Serializable]
   public class TraceMeAttribute : OnMethodBoundaryAspect
   {
      String _enteringMessage;
      String _leavingMessage;
       
      public override void CompileTimeInitialize(System.Reflection.MethodBase method, AspectInfo aspectInfo)
      {
         var methodName = method.DeclaringType.FullName + "." + method.Name;
 
         _enteringMessage = "Entering " + methodName;
         _leavingMessage = "Leaving " + methodName;
      }
 
      public override void OnEntry(MethodExecutionArgs args)
      {
         System.Diagnostics.Trace.Listeners["TracingListener"].WriteLine(DateTime.UtcNow);
         System.Diagnostics.Trace.Listeners["TracingListener"].WriteLine(this._enteringMessage);
         System.Diagnostics.Trace.Listeners["TracingListener"].IndentLevel++;
         System.Diagnostics.Trace.Listeners["TracingListener"].Flush();
      }
 
      public override void OnExit(MethodExecutionArgs args)
      {
         System.Diagnostics.Trace.Listeners["TracingListener"].IndentLevel--;
         System.Diagnostics.Trace.Listeners["TracingListener"].WriteLine(this._leavingMessage);
         System.Diagnostics.Trace.Listeners["TracingListener"].Flush();
      }
 
      public override void OnSuccess(MethodExecutionArgs args)
      {
         System.Diagnostics.Trace.Listeners["TracingListener"].WriteLine(args.Method.Name + " Succeeded");
         System.Diagnostics.Trace.Listeners["TracingListener"].Flush();
      }
 
      public override void OnException(MethodExecutionArgs args)
      {
         System.Diagnostics.Trace.Listeners["TracingListener"].WriteLine(args.Method.Name + " Exception");
         System.Diagnostics.Trace.Listeners["TracingListener"].Flush();
      }
   }
}
```
Usage:

```cs
[TraceMe]
      public int CreateA(A aToCreate)
      {
         aToCreate.EmailAddress = "lawfulevil3@batsite3.com";
         aToCreate.NumberWithBounds = 50;
         aToCreate.ShouldNotBeNull = "something still not null 3";
 
         return 123;
      }
```

2. LogValueAttribute : A simple aspect which logs the value of a variable

```cs
using System;
using CustomValidationAttributes;
 
namespace CustomLoggingAttributes
{
   [Serializable]
   public class LogValueAttribute : FieldValidationAttribute
   {
      protected override void Validate(object value)
      {
         System.Diagnostics.Trace.Listeners["FieldValueListener"].WriteLine(FieldName + " = " + value);
         System.Diagnostics.Trace.Listeners["FieldValueListener"].Flush();
      }
   }
}
``` 

Usage:

```cs
using CustomLoggingAttributes;
using CustomValidationAttributes;
 
namespace CRM.A
{
   public class A
   {
      [LogValue]
      private string _emailAddress;
 
      [LogValue]
      private int _numberWithBounds;
 
      [LogValue]
      private object _shouldNotBeNull;
 
      public string EmailAddress
      {
         get { return _emailAddress; }
         set { _emailAddress = value; }
      }
 
      public int NumberWithBounds
      {
         get { return _numberWithBounds; }
         set { _numberWithBounds = value; }
      }
 
      public object ShouldNotBeNull
      {
         get { return _shouldNotBeNull; }
         set { _shouldNotBeNull = value; }
      }
   }
}
```

3. RecordExceptionAttribute : A simple aspect which records whenever an exception occurs in a method.

```cs
using System;
using PostSharp.Aspects;
 
namespace CustomLoggingAttributes
{
   [Serializable]
   public class RecordExceptionAttribute : OnMethodBoundaryAspect
   {
      public override void OnException(MethodExecutionArgs args)
      {
         System.Diagnostics.Trace.Listeners["ExceptionListener"].WriteLine(args.Method.Name + " threw " + args.Exception.Message + Environment.NewLine + args.Exception.ToString());
         System.Diagnostics.Trace.Listeners["ExceptionListener"].WriteLine("_________________________________________");
         System.Diagnostics.Trace.Listeners["ExceptionListener"].Flush();
      }
   }
}
```

Usage :

```cs
[RecordException]
      public ActionResult IndexBUpdate(int number)
      {
         bool isUpdated;
 
         if (number == 0)
         {
            isUpdated = _bService.UpdateB(null);
         }
         {
            isUpdated = _bService.UpdateB(new B());
         }
 
         return new ImplementationOfActionResult<bool>("IndexBUpdate", isUpdated);
      }
 
</bool>
```

4. PerformanceAnalyzerAttribute : An aspect which records the time taken for the execution of a method.


```cs
using System;
using System.Diagnostics;
using System.Threading;
using PostSharp.Aspects;
 
namespace CustomLoggingAttributes
{
   [Serializable]
   public class PerformanceAnalyzerAttribute : MethodInterceptionAspect
   {
      private String _methodName;
      private long _hits;
 
      public override void CompileTimeInitialize(System.Reflection.MethodBase method, AspectInfo aspectInfo)
      {
         _methodName = method.DeclaringType.FullName + "." + method.Name;
      }
 
      public override void OnInvoke(MethodInterceptionArgs methodInterceptionArgs)
      {
         var stopwatch = Stopwatch.StartNew();
 
         try
         {
            methodInterceptionArgs.Proceed();
         }
         finally
         {
            stopwatch.Stop();
            Interlocked.Increment(ref _hits);
 
            Trace.Listeners["PerformanceAnalyzerListener"].WriteLine(_methodName + " : Last Call Took : " + stopwatch.ElapsedMilliseconds + "ms . No of hits so far : " + _hits);
            Trace.Listeners["PerformanceAnalyzerListener"].Flush();
 
            stopwatch.Reset();
         }
      }
   }
}
```

Usage : 

```cs
[PerformanceAnalyzer]
      [RecordException]
      public ActionResult IndexCaCreate(int number)
      {
         int createdCaId;
 
         if (number == 0)
         {
            createdCaId = _caService.CreateCa(null);
         }
         else
         {
            var ca = new Ca()
            {
               EmailAddress = "lawfulevil@batsite.com",
               NumberWithBounds = 100,
               ShouldNotBeNull = "something not null"
            };
 
            createdCaId = _caService.CreateCa(ca);
         }
 
         return new ImplementationOfActionResult<int>("IndexCaCreate", createdCaId);
      }
 
</int>
```

#### Validation :
All the Validation attributes need to first implement intercept the Accessors or Modifiers of the fields and then Validate it. The following attribute intercepts the modifiers for a field. All validations then inherit from this attribute to validate the value of the field.

```cs
using System;
using System.Reflection;
using PostSharp.Laos;
 
namespace CustomValidationAttributes
{
   [Serializable]
   [AttributeUsage(AttributeTargets.Field, AllowMultiple = false)]
   public abstract class FieldValidationAttribute : OnFieldAccessAspect
   {
      public string FieldName { get; private set; }
 
      public override void CompileTimeInitialize(FieldInfo field)
      {
         base.CompileTimeInitialize(field);
 
         FieldName = field.DeclaringType.Name + "." + field.Name;
      }
 
      public sealed override void OnSetValue(FieldAccessEventArgs eventArgs)
      {
         Validate(eventArgs.ExposedFieldValue);
         base.OnSetValue(eventArgs);
      }
 
      public override OnFieldAccessAspectOptions GetOptions()
      {
         return OnFieldAccessAspectOptions.GeneratePropertyAuto;
      }
 
      protected abstract void Validate(object value);
   }
}
```

1. FieldNullValidatorAttribute : Throws argument exception whenever the field is null.

```cs
using System;
 
namespace CustomValidationAttributes
{
   [Serializable]
   public class FieldNullValidatorAttribute : FieldValidationAttribute
   {
      protected override void Validate(object value)
      {
         if(value == null)
         {
            throw new ArgumentNullException("field : " + FieldName);
         }
      }
   }
}
```

Usage : 

```cs
using CustomLoggingAttributes;
using CustomValidationAttributes;
 
namespace CRM.A
{
   public class A
   {
      [LogValue]
      private string _emailAddress;
 
      [LogValue]
      private int _numberWithBounds;
 
      [FieldNullValidator]
      [LogValue]
      private object _shouldNotBeNull;
 
      public string EmailAddress
      {
         get { return _emailAddress; }
         set { _emailAddress = value; }
      }
 
      public int NumberWithBounds
      {
         get { return _numberWithBounds; }
         set { _numberWithBounds = value; }
      }
 
      public object ShouldNotBeNull
      {
         get { return _shouldNotBeNull; }
         set { _shouldNotBeNull = value; }
      }
   }
}
```

2. FieldRangeValidator: Makes sure that the field falls in a certain range for ints. Throws ArgumentOutOfRangeException otherwise.

```cs
using System;
 
namespace CustomValidationAttributes
{
   [Serializable]
   public class FieldRangeValidatorAttribute : FieldValidationAttribute
   {
      private readonly int _lb;
      private readonly int _ub;
 
      public FieldRangeValidatorAttribute(int lb,int ub)
      {
         _lb = lb;
         _ub = ub;
      }
       
      protected override void Validate(object value)
      {
         var field = (Int32) value;
 
         if(_lb > field)
         {
            throw new ArgumentOutOfRangeException(FieldName + "is lower than the lower bound.");
         }
 
         if(_ub < field)
         {
            throw new ArgumentOutOfRangeException(FieldName + "is higher than the upper bound.");
         }
      }
   }
}
```

Usage :

```cs
using CustomLoggingAttributes;
using CustomValidationAttributes;
 
namespace CRM.A
{
   public class A
   {
      [LogValue]
      private string _emailAddress;
 
      [FieldRangeValidator(10,50)]
      [LogValue]
      private int _numberWithBounds;
 
      [FieldNullValidator]
      [LogValue]
      private object _shouldNotBeNull;
 
      public string EmailAddress
      {
         get { return _emailAddress; }
         set { _emailAddress = value; }
      }
 
      public int NumberWithBounds
      {
         get { return _numberWithBounds; }
         set { _numberWithBounds = value; }
      }
 
      public object ShouldNotBeNull
      {
         get { return _shouldNotBeNull; }
         set { _shouldNotBeNull = value; }
      }
   }
}
```

3. FieldRegexValidatorAttribute : Makes sure that a string follows a certain regex pattern (eg. Email). Else throws ArgumentException

```cs
using System;
using System.Text.RegularExpressions;
 
namespace CustomValidationAttributes
{
   [Serializable]
   public class FieldRegexValidatorAttribute : FieldValidationAttribute
   {
      private readonly String _pattern;
      private RegexOptions _regexOptions = RegexOptions.Compiled;
 
      [NonSerialized]
      private Regex _regex;
 
      public RegexOptions RegexOptions
      {
         get { return _regexOptions; }
         set { _regexOptions = value; }
      }
 
      public FieldRegexValidatorAttribute(string pattern)
      {
         _pattern = pattern;
      }
 
      public override void RuntimeInitialize(System.Reflection.FieldInfo fieldInfo)
      {
         base.RuntimeInitialize(fieldInfo);
         _regex = new Regex(_pattern,_regexOptions);
      }
 
      protected override void Validate(object value)
      {
         var field = (String) value;
 
         if(!_regex.IsMatch(field))
         {
            throw new ArgumentException("The value does not match the expected pattern.");
         }
      }
   }
}
```
Usage :

```cs
using CustomLoggingAttributes;
using CustomValidationAttributes;
 
namespace CRM.A
{
   public class A
   {
      [FieldRegexValidator(@"^((\""[^\""\f\n\r\t\v\b]+\"")|([\w\!\#\$\%\&\'\*\+\-\~\/\^\`\|\{\}]+(\.[\w\!\#\$\%\&\'\*\+\-\~\/\^\`\|\{\}]+)*))@((\[(((25[0-5])|(2[0-4][0-9])|([0-1]?[0-9]?[0-9]))\.((25[0-5])|(2[0-4][0-9])|([0-1]?[0-9]?[0-9]))\.((25[0-5])|(2[0-4][0-9])|([0-1]?[0-9]?[0-9]))\.((25[0-5])|(2[0-4][0-9])|([0-1]?[0-9]?[0-9])))\])|(((25[0-5])|(2[0-4][0-9])|([0-1]?[0-9]?[0-9]))\.((25[0-5])|(2[0-4][0-9])|([0-1]?[0-9]?[0-9]))\.((25[0-5])|(2[0-4][0-9])|([0-1]?[0-9]?[0-9]))\.((25[0-5])|(2[0-4][0-9])|([0-1]?[0-9]?[0-9])))|((([A-Za-z0-9\-])+\.)+[A-Za-z\-]+))$")]
      [LogValue]
      private string _emailAddress;
 
      [FieldRangeValidator(10,50)]
      [LogValue]
      private int _numberWithBounds;
 
      [FieldNullValidator]
      [LogValue]
      private object _shouldNotBeNull;
 
      public string EmailAddress
      {
         get { return _emailAddress; }
         set { _emailAddress = value; }
      }
 
      public int NumberWithBounds
      {
         get { return _numberWithBounds; }
         set { _numberWithBounds = value; }
      }
 
      public object ShouldNotBeNull
      {
         get { return _shouldNotBeNull; }
         set { _shouldNotBeNull = value; }
      }
   }
}
```

4. NullParameterValidatorAttribute : Checks that the parameter passed to the method is not null. Else throws the specified exception in the constructor.

```cs
using System;
using PostSharp.Aspects;
 
namespace CustomValidationAttributes
{
   [Serializable]
   public class NullParameterValidatorAttribute : OnMethodBoundaryAspect
   {
      private readonly Type _type;
      private String _methodName;
 
      public NullParameterValidatorAttribute(Type type)
      {
         _type = type;
      }
 
      public override void CompileTimeInitialize(System.Reflection.MethodBase method, AspectInfo aspectInfo)
      {
         _methodName = method.Name;
      }
 
      public override void OnEntry(MethodExecutionArgs args)
      {
         var arguments = args.Arguments;
 
         if (arguments[0] == null)
         {
            var constructor = _type.GetConstructor(new[]{typeof(String)});
            throw (Exception) constructor.Invoke(new Object[] {_methodName});
         }
      }
   }
}
```

Usage :

```cs
[NullParameterValidatorAttribute(typeof(ArgumentNullException))]
      public int CreateA(A aToCreate)
      {
         aToCreate.EmailAddress = "lawfulevil2@batsite2.com";
         aToCreate.NumberWithBounds = 40;
         aToCreate.ShouldNotBeNull = "something not null 2";
 
         System.Threading.Thread.Sleep(TimeSpan.FromSeconds(.1));
         return _aRepository.CreateA(aToCreate);
      }
```

5. ZeroParameterValidatorAttribute : Makes sure that the parameter passed to the method is non-zero.

```cs
using System;
using PostSharp.Aspects;
 
namespace CustomValidationAttributes
{
   [Serializable]
   public class ZeroParameterValidatorAttribute : OnMethodBoundaryAspect
   {
      private readonly Type _type;
      private String _methodName;
 
      public ZeroParameterValidatorAttribute(Type type)
      {
         _type = type;
      }
 
      public override void CompileTimeInitialize(System.Reflection.MethodBase method, AspectInfo aspectInfo)
      {
         _methodName = method.Name;
      }
 
      public override void OnEntry(MethodExecutionArgs args)
      {
         var arguments = args.Arguments;
 
         switch ((Int32)arguments[0])
         {
            case 0:
               {
                  var constructor = _type.GetConstructor(new[] { typeof(String) });
                  throw (Exception)constructor.Invoke(new Object[] { _methodName});
               }
         }
      }
   }
}
```

Usage :

```cs
[ZeroParameterValidator(typeof(ArgumentException))]
      public A GetA(int aId)
      {
         System.Threading.Thread.Sleep(TimeSpan.FromSeconds(.2));
         return _aRepository.GetA(123);
      }
``` 

All the above aspects (technically called attributes) all are classes which are applied to either methods or fields in classes. All attributes inherit from classes such as OnMethodBoundaryAspect, MethodInterceptionAspect, OnFieldAccessAspect etc. These classes when inherited give the programmer access to methods which intercept method calls or accessors and modifiers. Those are just few examples of the built-in classes which PostSharp provides us, many more are available to use and tailor according to the situation and need.

Going from the Programming Paradigm to a library which helps do that, we now move on to complete full blown software which is based on the same theory and uses PostSharp dlls and more, but with a fantastic UI and a convenient way to monitor applications running remotely.

## Gibraltar

"Gibraltar is like an airplane "black box" for ASP.NET web apps, desktop apps and services. It efficiently and safely collects errors, metrics and usage patterns from your applications and provides robust infrastructure to transmit and analyze all that data. "– Gibraltarsoftware.com

Gibraltar continues the aspect oriented programming approach and silently logs and reports error from the application being monitored. It drastically reduces analysis time, by exactly pointing our when and where a certain event has occurred.

Its aim is to improve software quality, streamline customer support and enhance the UI experience.

Gibraltar integrates with Defect Tracking Systems like Gemini and FogBugz (Senera might work). 

### Product Overview

Three aspects of integrating Gibraltar :

#### Gibraltar Agent
Add the Gibraltar Agent (.dll) to you application and by modifying the app.config or web.config. This can be done through the analyst configuration wizard or manually. It also adds references. Or simply use the API.
The Gibraltar Agents functionality is to gather data; it can record any events, metrics and any errors that occur.

#### Hub Web Service
This is where all the data is gathered from the Gilbraltar Agents and can be sent to the different analysts or can send emails.

#### Gibraltar Analyst
Analyze the data which the Gibraltar Agent has gathered in sessions and sent via the Hub. This is a desktop application.

#### Sessions 

Every package of data created by the Gibraltar Agent is called a session. Sessions are created and sent from the Gibraltar Agent and forwarded to the Gibraltar Hub Service, which then forwards the sessions to all the analysts which have subscribed to this Hub.

Every session can be opened by an analyst and can be easily navigated through filters. With analysts you can also play around with the metrics which have been recorded in the sessions to create graphs and charts to give a better representation of the performance of the application under observation.

#### Sending Sessions

By default, a session is closed and sent when the application is properly shut down and started up again or when the app pool recycles (Every 23 hours by default). When restarted the Gibraltar Agent checks for any unsent sessions and sends them.

We can control this behavior. Following are three ways to do it:

By simply setting Log.SendSessionsOnExit = true through code, the sessions are sent on a clean shut down of the application.
The Log class provides us with an event called "MessageAlert". By subscribing to this event you can hook on to the condition when any kind of alert occurs which includes Error messages.
With user's intervention and event can be triggered and on this event the session can be sent. Eg. A button on the website.

When Message Alert event occurs, it results in a LogMessageAlertEventArgs which is categorized into either one of these 

- LogMessageSeverity.Critical
- LogMessageSeverity.Error
- LogMessageSeverity.Warning
- LogMessageSeverity.Information
- LogMessageSeverity.Verbose
- LogMessageSeverity.Unknown

Actions can be decided based on the levels of Message Severity. 

For example : On the Event Log.MessageAlert I hook up two event handlers, one event handler will send the current active session to the Gibraltar Hub Service, the other will send an email stating that an Error or Critical alert has occurred. Notice that sessions are sent only if
e.TopSeverity <= LogMessageSeverity.Error

This means if severity is at the level of error or critical.

Also, the Log.SendSessionsOnExit is set to true to send sessions on clean exit of application.

```cs
protected void Application_Start()
      {
         AreaRegistration.RegisterAllAreas();
 
         RegisterRoutes(RouteTable.Routes);
 
         Log.MessageAlert += LogMessageAlert;
         Log.MessageAlert += LogMessageAlertSendEmail;
 
 
         Log.SendSessionsOnExit = true;
      }
 
      private static void LogMessageAlert(object sender, LogMessageAlertEventArgs e)
      {
         //if there are any errors (or worse - criticals) we want to send the
         //up to date information on this session immediately.
         if (e.TopSeverity <= LogMessageSeverity.Error) //numeric values DROP for more severe enum values
         {
            //set our auto-send to true.
            e.SendSession = true;
            //and lets make sure we don't send again for at least a few minutes
            //to ensure we don't flood in the event of a storm of errors.
            //e.MinimumDelay = new TimeSpan(0, 5, 0); //5 minutes
         }
      }
 
      private static void LogMessageAlertSendEmail(object sender, LogMessageAlertEventArgs e)
      {
         var p = new PackagerDialog();
         p.SetEmailServer("server.domain.com", 0, true, null, null);
          
         //if we had an error or critical we want to send);
         if (e.TopSeverity <= LogMessageSeverity.Error) //numeric values DROP for more severe enum values
         {
            //get the set of messages that are the "worst" in this event.
            var badMessages = e.Messages.Where(message => message.Severity == e.TopSeverity).ToList();
            //now make us an email message describing these guys
            var messageBody = FormatMessageBody(badMessages);
            var subject = string.Format("{0} {1}: {2}", Log.SessionSummary.Application,
                e.TopSeverity.ToString().ToUpper(), badMessages[0].Caption);
            //and for safety's sake lets keep our subject from being crazy long.
            if (subject.Length > 120)
            {
               subject = subject.Substring(0, 120) + "...";
            }
            //now that we've done all of that, lets send our message using the Agent's email config
            using (var message = new MailMessage(new MailAddress("gibraltar@domain.com","Gibraltar"),new MailAddress("name@domain.com")))
            {
               message.Subject = subject;
               message.Body = messageBody;
               message.Priority = MailPriority.High;
                
               //now send our email!  I'm not bothering to catch exceptions since the Agent handles that nicely for us
               //Log.SendMessage(message); //synchronous OK because we're already async from the flow of logging.
               var smtpClient = new SmtpClient("server.domain.com ") {UseDefaultCredentials = true};
               smtpClient.Send(message);
            }
            //and lets make sure we don't send again for at least a few minutes
            //to ensure we don't flood in the event of a storm of errors.
            //e.MinimumDelay = new TimeSpan(0, 5, 0); //5 minutes
         }
      }
 
      private static string FormatMessageBody(IList<ilogmessage> messages)
      {
         var messageBody = new StringBuilder(1024);
         //we write out more detail about the first item, then just summarize.
         var firstMessage = messages[0];
         messageBody.AppendFormat("Timestamp: {0:g}\r\n", firstMessage.Timestamp);
         messageBody.AppendFormat("Category:  {0}\r\n", firstMessage.CategoryName);
         messageBody.AppendFormat("Class:     {0}\r\n------------------------------\r\n", firstMessage.ClassName);
         messageBody.AppendFormat("{0}\r\n", firstMessage.Caption);
         messageBody.AppendFormat("{0}\r\n\r\n", firstMessage.Description);
         //report any exceptions on this first object.
         var currentException = firstMessage.Exception;
         if (currentException != null)
         {
            messageBody.Append("Exceptions:\r\n");
            while (currentException != null)
            {
               messageBody.AppendFormat("{0}: {1}\r\n\r\n", currentException.TypeName, currentException.Message);
               //Each outer exception can point to an inner exception, we get null when there are no more.
               currentException = currentException.InnerException;
            }
         }
         //summarize the rest of the messages
         if (messages.Count > 1)
         {
            messageBody.AppendFormat("Other {0}s:\r\n", firstMessage.Severity);
            for (var curMessageIndex = 1; curMessageIndex < messages.Count; curMessageIndex++)
            {
               var currentMessage = messages[curMessageIndex];
               messageBody.AppendFormat("------------------------------\r\nMessage {0} of {1}: {2}: {3}\r\n\r\n",
                   curMessageIndex, messages.Count, currentMessage.Severity, currentMessage.Caption);
            }
         }
         return messageBody.ToString();
      }
```

The next example shows how to use the Packager class to send ActiveSessions and any unsent sessions.

```cs
var packager = new Packager();

packager.SendToServerAsync(SessionCriteria.ActiveSession|SessionCriteria.NewSessions,true);
```

The above code can be put into an event handler for an event like Button.Click on User's intervention.

SessionCriteria has other options which are as following:

- SessionCriteria.ActiveSession
- SessionCriteria.AllSessions
- SessionCriteria.CompletedSessions
- SessionCriteria.CrashedSession
- SessionCriteria.CriticalSession
- SessionCriteria.ErrorSession
- SessionCriteria.NewSessions
- SessionCriteria.None
- SessionCriteria.WarningSession

## Gibraltar with Postsharp 

Gibraltar is shipped with PostSharp. This is due to the fact that Gibraltar has its own aspects for logging purposes. They are as following :

### GException

A PostSharp aspect that logs exceptions after they are thrown when they cause a method to exit. This allows for logging of handled as well as unhandled exceptions.

### GFeature

A PostSharp aspect used to record how often a particular method in your application is used, how long it takes to run, and whether it was ultimately succesful or not. It record both log messages and metrics to enable powerful analysis.

### GTimer

A PostSharp aspect that will log execution time for methods. Data is stored as a Gibraltar metric allowing charting and graphing in Gibraltar Analyst.

### GTrace

Enables the logging of method entry and exit at runtime complete with parameter information and results.

### *GField

Enables the logging of field values.

These attributes can be associated with a single method, a property or an entire class. Attribute multicasting can be used to apply it to all matching methods or fields or classes in the assembly.

```cs
// Log thrown exceptions for every method in this assembly.
[assembly: GException]
// Log entry and exit of every method with exceptions listed below
[assembly: GTrace(AttributePriority = -1)]
// Exclude constructors and a few excessively noisy classes & methods
[assembly: GTrace(AttributeTargetMembers = ".ctor", AttributeExclude = true)]
[assembly: GTrace(AttributeTargetMembers = "ToString", AttributeExclude = true)]
```

Attention Error Catchers: In case of exceptions, even if exceptions may be ultimately handled by a method higher up the call stack they are recorded. But because they are handled, they are logged as warnings. If they ultimately become unhandled exceptions then Gibraltar's Error Manager will automatically record them as error.

These are just out of the box PostSharp aspects which are provided by Gibraltar; custom logging and validation aspects can be easily added to use Gibraltar. For eg., the Log class provides most of the tracing functionalities.