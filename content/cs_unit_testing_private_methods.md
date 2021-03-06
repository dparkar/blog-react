# C# : Unit Testing Private Methods

When a developer writes a piece of code, he(or she) would like to verify and validate that what was just written by him is exactly what he intended to do. How can he be sure ? 

One of the possibilities is to run(execute) the code and see the output, which is possible when if its some small program/project. But when you are working on a huge project (e.g. a project with some back ends talking to a database or talking over the wire, a logical layer and multiple GUIs which may be using other assemblies) loading up the whole project and running it to verify if a small functionality is working isn't sensible. This is due to the facts that the project itself may take a long time to load and execute, it may require loading and linking multiple assemblies(.dll) which will take up resources and its an expensive operation. Wasting so much time and resources for a small functionality test is not worth it. And its definitely not sensible when you have to keep testing repetitively.

Instead. a developer can test a piece of his code by writing Unit Tests for that function. Its pretty simple when you are testing public methods.Following is a format for a normal public method of a public class being tested:

If you don't know what is a Unit Test, please take a look [here](http://en.wikipedia.org/wiki/Unit_testing)

For e.g. :
```cs
//The Class you want to test
 
public class foo
{
    .
    .
    .
    //The PUBLIC method you want to test
    public int bar(int c)
    {
        //Logic and result returned
    }
}
 
//In the test class
public class fooTest
{
    //System Under Test (Class foo) whose method needs to be tested
    private static foo _sut = new foo();
    .
    .
    //Test for bar
    //TestMethod is the method attribute which tells CLR that this is a test
    //method and not a normal method
    [TestMethod]
    public void barTest()
    {
        //Arrange (Any arrangement which might be needed before calling the method
        //to test
 
        //Act (The actual call)
        int y = _sut.bar(x);
 
        //Assert for 'y' (Assert the result of the method under test)
    }
}
```

If you don't know what is a [TestMethod] attribute, please look [here](http://msdn.microsoft.com/en-us/library/microsoft.visualstudio.testtools.unittesting.testmethodattribute%28VS.80%29.aspx).

The above format/set up is only possible if its a public method you are testing. Usually, it makes sense for the developer to test only the public methods. Private helper methods aren't usually tested. 

But, there are times when a developer would like to write tests for a private method. This is possible when the private method contains some critical logic which plays an important part in many other public methods. For developer's satisfaction and verification testing private methods may be needed. You can use the built-in MSTest private method testing methods which creates an accessor to the private methods,but that accessor is not compatible to Team Build. In that case, the above set up will require modification. Two different scenarios depending on if you are testing just Private methods or Private Static methods.

If you don't know what is MSTest, please take a look [here](http://en.wikipedia.org/wiki/MSTest).

If you don't know what is Team Build, please take a look [here](http://en.wikipedia.org/wiki/Team_Foundation_Server).

Following is the scenario for a Private Method:

```cs
//The Class you want to test
 
public class foo
{
    .
    .
    .
    //The PRIVATE method you want to test
    private int bar(int c)
    {
        //Logic and result returned
    }
}
 
//In the test class
public class fooTest
{
    .
    .
    .
    //Test for bar
    //TestMethod is the method attribute which tells CLR that this is a test
    //method and not a normal method
    [TestMethod]
    public void barTest()
    {
        //Arrange (Any arrangement which might be needed before calling the method
        //to test
 
        //Act (The actual call)
        //Creating an instance of PrivateObject class with the instance of the class
        //whose private method needs to be tested.
        PrivateObject privateObject = new PrivateObject(new foo());
 
        //Invoking the private method
        int y = privateObject.Invoke("bar", intParameter) as Integer;
 
        //Assert for 'y' (Assert the result of the method under test)
    }
}
```

If you don't know about PrivateObject, please take a look [here](http://msdn.microsoft.com/en-us/library/microsoft.visualstudio.testtools.unittesting.privateobject%28VS.80%29.aspx)

The private method's name has to be spelled correctly followed by correct no. of parameter. The invocation of the method returns you back an Object which needs to be cast to the expected type.

To test Private Static methods replace the above PrivateObject instance creation with PrivateType as following:

```cs
PrivateType privateType = new PrivateType(typeof(foo));
```

and invoke the test method like this :

```cs
Integer y = (Integer)privateType.InvokeStatic("bar",int someParameter);
```

Unit testing has become really popular with the practice of TDD (Test Driven Development).

If you don't know about the PrivateType class, please take a look [here](http://msdn.microsoft.com/en-us/library/microsoft.visualstudio.testtools.unittesting.privatetype%28VS.80%29.aspx).

If you don't know what is TDD, please take a look [here](http://en.wikipedia.org/wiki/Test-driven_development).

Unit tests also act as rules as to what should be expected from a method. Also its a great way of documenting what is expected from the method. A new developer can just look at the tests and see what is to be expected from the method under test.
