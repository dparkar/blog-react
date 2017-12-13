# C# : HostName, MachineName and IPAddresses

Host Name and Machine Name are not the same. A Host Name is a name given to a host(e.g. computer or phone) by the Domain Name System(DNS). Therefore, this name is in context with the DNS. For more details have a look [here](http://en.wikipedia.org/wiki/Hostname).

On the other hand, a Machine Name is more in the local context. which is established during system start up and when the name is ready from the registry.

## Find the Host Name

```cs
String HostName = System.Net.Dns.GetHostName();
```

## Find the Machine Name

```cs
String MachineName = System.Environment.MachineName;
```

## Find the IPAddress (IPv4)

System.Net.Dns.GetHostName() and "" (Empty String) refer to the same host name.
"localhost" refers to the reserved IP addresses 127.0.0.1 in IPv4, or ::1 in IPv6.
For more details about localhost, take a look [here](http://en.wikipedia.org/wiki/Localhost)

```cs
System.Net.IPAddress IpAddress = System.Net.Dns.GetHostAddresses("").Single(ipAddressFamily => ipAddressFamily.AddressFamily == AddressFamily.InterNetwork);
```

is the same as

```cs
System.Net.IPAddress IpAddress = System.Net.Dns.GetHostAddresses(System.Net.Dns.GetHostName()).Single(ipAddressFamily => ipAddressFamily.AddressFamily == AddressFamily.InterNetwork);
```

but is NOT the same as

```cs
System.Net.IPAddress IpAddress = System.Net.Dns.GetHostAddresses("localhost").Single(ipAddressFamily => ipAddressFamily.AddressFamily == AddressFamily.InterNetwork);
```

<i>.Single(ipAddress => ipAddress.AddressFamily == AddressFamily.InterNetwork)</i> is a function which takes a Predicate Delegate as an argument. The predicate determines whether the object to which it is applied to meets the criteria stated in the Predicate. The predicate here is a lambda function/inline function. For e.g. here the predicate checks whether each ipAddress(from AddressList which is returned by System.Net.Dns.GetHostAddress(...)) satisfies the fact that the ipAddress.AddressFamily == AddressFamily.InterNetwork (IPv4). Since we are using "Single" here it means that, it will return only the one which satisfied the condition, if there are more than one which satisfy the condition, it will throw an error.

Look [here](http://msdn.microsoft.com/en-us/library/system.aspx) for more of different delegates offered by C#.

Look [here](http://msdn.microsoft.com/en-us/library/bb397687.aspx) for more on lambda expressions.

Look [here](http://msdn.microsoft.com/en-us/library/ms173171%28VS.80%29.aspx) for more on delegates.

More on the power of delegates later ...