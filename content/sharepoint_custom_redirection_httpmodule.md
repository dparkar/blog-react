# Sharepoint : Custom redirection HttpModule based on UserProfile Property

When a request is made to an ASP.NET application, an instance of HttpApplication class is made to process this request. One instance of the HttpApplication class can process multiple requests during its lifetime, however only one at a time.

When the request is being processed, the application raises a chain of events on to which an implementation of IHttpModule can be hooked on.

If you don’t know about HttpApplication class and the chain of events, please look [here](http://msdn.microsoft.com/en-us/library/system.web.httpapplication.aspx).

If you don’t know about IHttpModule interface, please look [here](http://msdn.microsoft.com/en-us/library/system.web.ihttpmodule.aspx).

Assuming that you are developing for Sharepoint 2007.

Install WSPBuilder on Visual Studio from [here](http://wspbuilder.codeplex.com/).

1. Create new WSPBuilder Project in Visual Studio.
2. Add Sharepoint Resources : Microsoft.Office.Server.dll and Microsoft.Sharepoint.dll
3. Write a class which implement interface IHttpModule. 
4. "PostAuthenticateRequest" is a EventHandler to which you can add an event (delegate) which here is fulfilled by OnAuthenticationCustomRedirect.

The HttpModule’s functionality is to redirect a user based on user’s chosen user profile property. To redirect the user or to write in the event logs on the server, the commands need to be run with elevated privileges and that is exactly what the private functions do.

The redirection happens only if the request is coming from a different host. If surfing within the website the redirection will not take place. This is done by comparing the hosts of the incoming url from current request and the previous url from previous request.

If you don't know about accessing previous urls, please look [here](http://msdn.microsoft.com/en-us/library/system.web.httprequest.urlreferrer.aspx).

If the Sharepoint user doesn’t exist and <i>userProfileManager.GetUserProfile(“name”)</i> is called. An exception is thrown. This is the reason why the module is under try-catch block. If such an error occurs then an error is recorded in the Event Log on the server.

By comparing the value of the properties, we can then redirect the user in a customized manner.

```cs
public class RedirectModule : IHttpModule
{

#region Implementation of IHttpModule
/// <summary>
/// Initializes a module and prepares it to handle requests.
/// </summary>
/// <param name="context">An <see cref="T:System.Web.HttpApplication"> that provides access to the methods, properties, and events common to all application objects within an ASP.NET application 
public void Init(HttpApplication context)
{
//Adding an event handler to handle and redirect the incoming request to corresponding address
context.PostAuthenticateRequest += OnAuthenticationCustomRedirect;
}
 
/// <summary>
/// Disposes of the resources (other than memory) used by the module that implements <see cref="T:System.Web.IHttpModule">.
/// </see></summary>
public void Dispose()
{
 
}
 
#endregion Implementation of IHttpModule
 
#region Redirection based on User Profile Module
 
private static void OnAuthenticationCustomRedirect(object sender,EventArgs eventArgs)
{
//The user who is trying to access tabnet
SPUser spUser = null;
 
try
{
//Getting the HttpRequest
HttpRequest request = ((HttpApplication) sender).Request;
 
//Host Domain
String requestUrlDomain = "http://" + request.Url.Host;
 
//Previous Host Domain
String previousRequestUrlDomain = String.Empty;

if(request.UrlReferrer != null)
{
previousRequestUrlDomain = "http://" + request.UrlReferrer.Host;
}
 
//If coming from within same host, no redirection required
if(!requestUrlDomain.Equals(previousRequestUrlDomain))
{
//Redirect only if going to the home page
if (request.Url.ToString().Equals(requestUrlDomain + "originalhomepage.aspx"))
{
//Getting the HttpContext
HttpContext context = ((HttpApplication)sender).Context;
 
//Creating SPSite object
SPSite spSite;
//Creating SPWeb object
SPWeb spWeb;
 
//Checking for the current SPContext
if (SPContext.Current != null)
{
//Getting the SPSite
spSite = SPContext.Current.Site;
//Getting the SPWeb
spWeb = spSite.RootWeb;
//Get the SPUser
spUser = spWeb.CurrentUser;
 
//Creating the UserProfileManager for the site
UserProfileManager userProfileManager = new UserProfileManager(ServerContext.GetContext(spSite));
 
//Getting the user profile from the name using the UserProfileManager
UserProfile userProfile = userProfileManager.GetUserProfile(spUser.LoginName);
 
//Getting all the properties from the UserProfileManager
PropertyCollection propertyCollection = userProfileManager.Properties;
//Filtering out the single property which we are interested in
Property property = propertyCollection.GetPropertyByName("PropertyName");
 
//Finding that property in the user profile for value
if (userProfile[property.Name].Value != null)
{
String propertyString = userProfile[property.Name].Value.ToString();
 
//Different actions depending on hosts of each user
switch (propertyString.ToUpper())
{
case "property value 1":
case "property value 2":
//Write the information with the user login name to eventlog
WriteToEventLog("OnAuthenticationCustomRedirect", spUser.LoginName + " has been redirected",EventLogEntryType.Information);
//Actual redirection
ResponseRedirectElevatedPriviliges(context, requestUrlDomain + "newhomepage.aspx");
break;
//anything else no redirection
default:
break;
}
}
}
}
}
}
catch (Exception exception)
{
String message = "Exception Stack Trace : " + exception.StackTrace;
 
if(spUser!=null)
{
message += " User Login Name : " + spUser.LoginName;
}
 
//Write the error with stack trace to the event log
WriteToEventLog("OnAuthenticationCustomRedirect",message, EventLogEntryType.Error);
}
}
 
#endregion Redirection based on User Profile Module
 
#region Methods to Run With Elevated Priviliges
 
/// <summary>
/// This method runs with elevated privileges which writes a log entry to eventlog
/// </summary>
/// <param name="source">
/// <param name="message">
/// <param name="eventLogEntryType">
private static void WriteToEventLog(String source, String message, EventLogEntryType eventLogEntryType)
{
SPSecurity.RunWithElevatedPrivileges(
() => EventLog.WriteEntry(source, message, eventLogEntryType));
}
 
/// <summary>
/// This method runs with elevated privileges which redirects the user to the new URL via the response.
/// </summary>
/// <param name="context">
/// <param name="url">    
private static void ResponseRedirectElevatedPriviliges(HttpContext context,String url)
    {
        SPSecurity.RunWithElevatedPrivileges(() => context.Response.Redirect(url, false));
    }
 
    #endregion Methods to Run With Elevated Priviliges
}
```