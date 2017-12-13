# Passing "arrays" to stored procedures - XML is the answer !

I had come across a situation where I had my code behind in c# making a call to a stored procedure in Transact-SQL in a database to return a result set based upon the Id coming in as SqlParameter(Which is a pretty common thing ... right ?!) 
Alright, lets make this interesting, what if the c# code behind makes a call to a stored procedure which would return a result set given 'n' no. of Ids. For each of these n ids, I wanted the stored procedure to take each one of them and get a result set, all the result sets are then UNIONed together and returned as one result set. I wanted the parameters to the stored procedures work something like passing an array or like MethodName(params int[] parameterName)
One of the ways which this can be done, which I found really convenient is passing in XML as parameter to the stored procedure and then using "IN" in the SELECT statement.

```sql
ALTER PROCEDURE [dbo].[GetResultsUsingIds]
@ids_xml Text
AS
BEGIN
-- SET NOCOUNT ON added to prevent extra result sets from
-- interfering with SELECT statements.
SET NOCOUNT ON;
 
DECLARE @hDoc int
 
exec sp_xml_preparedocument @hDoc OUTPUT, @ids_xml
 
BEGIN
 
SELECT
*
FROM studenttable
WHERE student_id IN
(SELECT Id FROM OPENXML(@hDoc,'/Ids/StudentId',1) WITH(Id int))
 
UNION ALL
 
SELECT
*
FROM studenttable
WHERE section_id IN
(SELECT Id FROM OPENXML(@hDoc,'/Ids/SectionId',1) WITH(Id int))
 
END
 
EXEC sp_xml_removedocument @hDoc
 
END
```

The input parameter for the above stored procedure may look like :

ids_xml :

```xml
<ids>
<studentid id="1"></studentid>
<studentid id="2"></studentid>
<sectionid id="7"></sectionid>
<sectionid id="8"></sectionid>
</ids>
```

Will return from student table:

all result sets with student_Id as 1 + all result sets with student_Id as 2 + all result sets with section_Id as 7 + all result sets with section_Id as 8

## sp_xml_preparedocument and sp_xml_removedocument

<i>"Reads the XML text provided as input, parses the text by using the MSXML parser (Msxmlsql.dll), and provides the parsed document in a state ready for consumption. This parsed document is a tree representation of the various nodes in the XML document: elements, attributes, text, comments, and so on.

sp_xml_preparedocument returns a handle that can be used to access the newly created internal representation of the XML document. This handle is valid for the duration of the session or until the handle is invalidated by executing sp_xml_removedocument."</i> - MSDN

## OPENXML(@hDoc,'/Ids/StudentId',1)

hDoc is the document handle of the internal representation of an XML document. The internal representation of an XML document is created by calling sp_xml_preparedocument.

'/Ids/StudentId' is the XPath pattern used to identify the nodes (in the XML document whose handle is passed in the idoc parameter) to be processed as rows.

1 indicates the mapping that should be used between the XML data and the relational rowset, and how the spill-over column should be filled. flags is an optional input parameter, and can be one of the values mentioned in the next section.

## Byte Value Description

0 : Defaults to attribute-centric mapping.

1 : Use the attribute-centric mapping.
Can be combined with XML_ELEMENTS; in which case, attribute-centric mapping is applied first, and then element-centric mapping is applied for all columns not yet dealt with.

2 : Use the element-centric mapping.Can be combined with XML_ATTRIBUTES; in which case, attribute-centric mapping is applied first, and then element-centric mapping is applied for all columns not yet dealt with.

8 : Can be combined (logical OR) with XML_ATTRIBUTES or XML_ELEMENTS.In context of retrieval, this flag indicates that the consumed data should not be copied to the overflow property @mp:xmltext.

For more description of OPENXML() see : 
http://msdn.microsoft.com/en-us/library/aa276847(SQL.80).aspx