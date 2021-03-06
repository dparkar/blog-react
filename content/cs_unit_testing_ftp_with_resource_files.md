# C# & Visual Studio: FTP Methods, Testing by Creating Resource Files and Using their Streams

I had come across a scenario where I needed to store certain files to a certain location on a server. This certain location, basically acts like a shelf to hold these files. Just like a neatly arranged shelf, all these files were arranged within a directory structure. 

On the Server, I created an FTP site listening at the default port (Port 21). This FTP Server was mapped to the location of my interest.

If you don’t know how to create an FTP Site, please look [here](http://learn.iis.net/page.aspx/301/creating-a-new-ftp-site/).

In Visual Studio, through my C# code I wrote a class which provided two public methods:

```cs
public String WriteFtpMyFileToServer(Stream fileStream)

public Boolean DeleteFtpMyFileFromServer(String fileNamePlusPath)
```

There were private helper methods as well to remove repeated coding (good practice).

Following is a code snippet from method (1) which would write the file to location of interest:

```cs
/// <summary>
/// Method to Transfer the file via FTP
/// </summary>
/// <param name="fileStream">The stream on the file to be sent/// <returns>String</returns>
public String WriteFtpMyFileToServer (Stream fileStream)
{
    .
    .
    .
    .
    .
    //Get the FTP site Uri from ConfigurationManager in string including filepath
    Uri ftpUri = new Uri(String.Format(CultureInfo.CurrentCulture,"{0}{1}",ConfigurationManager.AppSettings["FtpSite"],filePath));
 
    //Creates an FTP web request
    FtpWebRequest request = (FtpWebRequest)WebRequest.Create(ftpUri);
 
    //Setting the request method
    request.Method = WebRequestMethods.Ftp.UploadFile;
 
    //Get the request stream
    Stream ftpStream = request.GetRequestStream();
 
    //Copy from fileStream to ftpStream
    int bufferLength = 2048; // 2K
    byte[] buffer = new byte[bufferLength];
    int count = 0;
    int readBytes = 0;
    //Byte by Byte
    do
    {
        readBytes = fileStream.Read(buffer, 0, bufferLength);
        ftpStream.Write(buffer, 0, readBytes);
        count += readBytes;
    }while (readBytes != 0);
 
    // Close both the streams
    fileStream.Close();
    fileStream.Dispose();
    ftpStream.Close();
 
    // Send the file and Get Response
    FtpWebResponse response = (FtpWebResponse)request.GetResponse();
 
    //Check the result of our upload and see if successful
    if (response.StatusCode == FtpStatusCode.ClosingData)
    {
        // Close the ftp session
        response.Close();
        fileSentSuccessfully = true;
    }
 
    .
    .
    .
    //Return String: Message of what happened or Null
    .
    .
    .
}
```

It's always a good thing to keep constant Uris (in this case FTP Site) in .config files. This is due to the fact that these Uris may change depending on your environments. It may be different in production, development and test environments. You can use the ConfigurationManager to access from these .config files.

Following is a code snippet from method (2) which would delete the file from the location of interest:

```cs
/// <summary>
/// This method deletes the specified File via FTP
/// </summary>
/// <param name=" fileNamePlusPathOnServer ">filepath followed by name/// <returns>bool sucess/failure</returns>
 
public Boolean DeleteFtpMyFileFromServer (String fileNamePlusPathOnServer)
{
    .
    .
    .
    //Creating Uri from string
    Uri ftpUri = new Uri(String.Format(CultureInfo.CurrentCulture,"{0}{1}",ConfigurationManager.AppSettings["FtpSite"],fileNamePlusPathOnServer));
 
    //Creates an FTP web request
    FtpWebRequest request = (FtpWebRequest)WebRequest.Create(ftpUri);
 
    //Method delete file
    request.Method = WebRequestMethods.Ftp.DeleteFile;
 
    // Send the command and Get Response
    FtpWebResponse response = (FtpWebResponse)request.GetResponse();
 
    //Check the result of our upload and see if successful
    if (response.StatusCode == FtpStatusCode.FileActionOK)
    {
        // Close the ftp session
        response.Close();
 
        return true;
    }
 
    return false;
}
```

Personally, I have always believed that throwing exceptions is a really good practice. Even though you don’t see any exceptions thrown in the code snippets above, you can always add code to throw exceptions to validate the parameters to the methods and for any other failure. This really helps to convey messages from the callee class to the caller class about what went wrong.

When this class is live, we would expect a real file stream to be passed to method (1). <i>But how will you write unit tests for these methods ?</i>

Writing unit tests for each possible scenario in your methods is the best way for documenting and portraying what is expected from the method you just wrote. It validates your logic in the method, checks whether the method indeed returns what you expect and if the method is working the way you want it to. Overall, it makes the code more robust and reliable. It also helps other developers to understand what you intended to do in the method. Test Driven Development (TDD) and Code Coverage are really good techniques for the same.

If you don’t know what TDD is, please look [here](http://en.wikipedia.org/wiki/Test-driven_development).

If you don’t know what Code Coverage is, please look [here](http://en.wikipedia.org/wiki/Code_coverage).

To write a test for method (1), I needed to create a file in my test and pass its stream to method (1). It made no sense to create a file each time locally at a certain path and use it for test purposes. This is due to the fact that the underlying directory structure may change from host to host, depending on where the tests are run. Each test should be written independent of the location, environment and of other tests.

This is where resource files come in. A resource file can be any data such as text files, images, audio or video that you application might require. Once a resource file is added to the project, it always stays with the project just like other .cs files (your code).

In my test project, I created a folder within the project called “Resources” and added a text file to it with a test name called “TestFile.txt”. This file had some junk data in it. I clicked on the file and in the Properties dialog below it, changed the Build Action to “Embedded Resource”. 

To get the stream of this file in your test class:

```cs
/// <summary>
/// Summary description for Your Test Class
/// </summary>
 
[TestClass]
public class YouTestClassName
{
    #region Private Variables
    .
    .
    .
    //Assembly giving reference to Resource File
    private static Assembly _thisAssembly;
    //File Stream of the file to be transferred (Resource Text File)
    private static Stream _TestFileStream;
    .
    .
    .
    #endregion Private Variables
 
    #region Test Context
 
    /// <summary>
    ///Gets or sets the test context which provides
    ///information about and functionality for the current test run.
    ///</summary>
    public TestContext TestContext { get; set; }
 
    #endregion Test Context
 
    #region Additional test attributes
 
    // You can use the following additional attributes as you write your tests:
    //
    // Use ClassInitialize to run code before running the first test in the class
    [ClassInitialize]
    public static void MyClassInitialize(TestContext testContext) 
    {
        .
        .
        .
        //Getting the assembly
        _thisAssembly = Assembly.GetExecutingAssembly();
        .
        .
        .
    }
 
    // Use ClassCleanup to run code after all tests in a class have run
    [ClassCleanup]
    public static void MyClassCleanup() 
    {
        .
        .
        .
    }
 
    //// Use TestInitialize to run code before running each test 
    //[TestInitialize()]
    //public void MyTestInitialize() 
    //{ 
 
    //}
 
    //// Use TestCleanup to run code after each test has run
    //[TestCleanup()]
    //public void MyTestCleanup() 
    //{
 
    //}
 
    #endregion Additional test attributes
 
    /// <summary>
    /// This method tests the FtpFile method successfully
    /// </summary>
    [TestMethod]
    public void FtpFileTest_Success()
   {
        //ARRANGE
        //Getting the file stream
        if (_thisAssembly != null)
        {
            //Getting the stream from resource file
            _TestFileStream = _thisAssembly.GetManifestResourceStream("Namespace.TestFile.txt");
        }
 
        //ACT
        //Calling the WriteFtpFileToServer method (METHOD(1))
        //_sut is the instance of the class which provides these methods
        _returnString = _sut.WriteFtpFileToServer(_TestFileStream);
 
        //ASSERT
        Assert.IsNotNull(_returnString);
    }
    .
    .
    .
    //More tests
    .
    .
    .
}
```

This way, the tests can be run on any machine without worrying about the underlying directory structure of the machine.