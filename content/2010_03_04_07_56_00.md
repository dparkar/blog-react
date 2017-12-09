# Installing SharePoint Server 2010 in VirtualBox

- Guest OS : Windows Server 2008 SP2 64-bit
- Host OS : Windows 7 Enterprise 64-bit

Installing SharePoint on a normal Windows Machine itself can be a bit messy, let alone installing it on a Virtual Machine (VM).

If you don’t know what is SharePoint, please look [here](http://sharepoint2010.microsoft.com/Pages/default.aspx) and it's [conceptional overview]( 
http://msdn.microsoft.com/en-us/library/ee537319%28office.14%29.aspx).

If you don’t know what is a Virtual Machine, please look [here](http://en.wikipedia.org/wiki/Virtual_machine).

Developers prefer installing SharePoint on a VM since it requires a lot of other installations and configurations which are prerequisites to install SharePoint. This eats up a lot of resources and gives you the feeling that SharePoint is all over the place. Therefore, it makes sense to install SharePoint on a VM which keeps it isolated and will not hinder any production or other kind of development on your host machine. This is really important in the case of SharePoint 2010 as it is still in the beta stage and should not be used in a production environment (As of 3/2/2010).

If you don’t know what is a Host Machine, please look [here](http://en.wikipedia.org/wiki/Host_Machine).

If you don’t know the differences between a Development Environment and Production Environment, please look [here](http://garronselliken.com/2009/02/15/production-vs-development/comment-page-1/#comment-103) (Garron Selliken explains it very simply and nicely on his blog)

SharePoint Server 2010 Hardware and Software requirements can be found [here](http://technet.microsoft.com/en-us/library/cc262485%28office.14%29.aspx). If you looked at the Hardware and Software requirements link, you would understand when I say that I would like to create a ‘Single server with built-in database’, therefore I will install the 64-bit edition of Windows Server 2008 Standard with SP2 on the VM. Also, Windows Server 2008 SP 2 provides infrastructure  and management tools that enable to create multiple server environments on single host which can’t be on Windows 7. If you have only Windows Server 2008 and no Service Pack 2, then the installation of SharePoint will figure out that the OS requires Service Pack 2 and will download and install it.
Following are my host machine specifications :
- Windows 7 Enterprise 64-bit OS
- Processor : Intel® Core™ 2 Quad CPU Q6700 @ 2.66GHz 2.67GHz
- RAM : 8.00GB
- HDD : 150GB
- High- Speed Internet Connection

## Decide the virtualization software package to use

It goes without saying that which ever virtualization software package is used, it should allow to fulfill the minimum hardware and software requirements as stated by Microsoft for SharePoint Server 2010.

If you don’t know what is Virtualization, please look [here](http://en.wikipedia.org/wiki/Virtualization).

Virtual PC, which comes along with Windows 7 (basically to virtualize Windows XP) can only run 32-bit operating systems. But as we know SharePoint 2010 can currently be installed only on a 64-bit operating system. Therefore, we can strike out VirtualPC.

If you don’t know differences between 32-bit OS and 64-bit OS, please look [here](http://windows.microsoft.com/en-US/windows-vista/32-bit-and-64-bit-Windows-frequently-asked-questions).

There are a lot of virtualization software packages out there which can allow you to install a 64-bit Operating System (the 64-bit edition of Windows Server 2008 Standard with SP2 as decided).
You can find differences between different virtualization software packages [here](http://en.wikipedia.org/wiki/Comparison_of_platform_virtual_machines). 

I decided on using VirtualBox as I am already familiar with it. The recommended virtualization software package  by Microsoft for SharePoint 2010 is Hyper-V.

## Creating a VM and Virtual Hard Disk Drive

1. Close all other applications and have a clean desktop.
2. Download and install VirtualBox like any other software package. It can be found [here](
http://www.virtualbox.org/wiki/Downloads) (Use the one for Windows hosts and 64-bit)
3. Start the VirtualBox application.
4. Click on New and follow the wizard.
5. Give a name for the VM you want to create and select the appropriate OS Type. This is how it looked in my case:

<center><img src="https://dplogscontent.blob.core.windows.net/dplogs/blog_sharepoint_vmname_ostype.png" width="50%" height="50%" /></center>

6. Click next.
7. Select the amount of base memory(RAM). Remember that we should keep in mind the requirements of SharePoint Server 2010 and not the requirements to merely install Windows Server 2008. Therefore 4GB.

<center><img src="https://dplogscontent.blob.core.windows.net/dplogs/blog_sharepoint_memory.png" width="50%" height="50%" /></center>

8. Click Next.
9. Make sure ‘Boot Hard Disk (Primary Master)’ is checked and radio button is on ‘Create new hard disk’

<center><img src="https://dplogscontent.blob.core.windows.net/dplogs/blog_sharepoint_vhd.png" width="50%" height="50%" /></center>

10. Click Next.
11. A wizard to create new virtual disk will start up.
12. Click Next.
13. Storage Type should be ‘Dynamically Expanding Storage’. When I used this option, I thought that I would be allowed to change the size of the Virtual Hard Disk (VHDD) even after installation is complete. But I couldn’t find a way to do that. But even if there is a slightest possibility that I can do this (if I find out the way later on) then I would like to keep this option open.
14. Click Next.
15. Give a name for the VHDD you will create for your VM.  Keep the size of the VHDD to 100GB. This is how my window looks like :

<center><img src="https://dplogscontent.blob.core.windows.net/dplogs/blog_sharepoint_location_size.png" width="50%" height="50%" /></center>

16. Click Next.
17. Confirm and Click Finish.
You will be back to ‘Create New Virtual Machine’ window with your VHDD selected.
18. Click Next.
19. Confirm and Click Finish.
20. You will see your VM added to VirtualBox with the new VHDD. It will look similar to this :

<center><img src="https://dplogscontent.blob.core.windows.net/dplogs/blog_sharepoint_vm_created.png" width="50%" height="50%" /></center>

## Booting from DVD or ISO

If you don’t know what is ISO image file, please look [here](http://en.wikipedia.org/wiki/Iso_image)

If you don’t know what is booting, please look [here](http://en.wikipedia.org/wiki/Booting)

1. Put in the Windows Server 2008 SP2 DVD in the CD Tray to install from your DVD.
OR If you have an Iso image of the Operating System.
2. Click on File
3. Start Virtual Media Manager
4. Click on CS/DVD Images tab
5. Click on ‘Add’
6. Hunt for the Iso file
7. Click ‘Open’.
8. Click ‘OK’

<center><img src="https://dplogscontent.blob.core.windows.net/dplogs/blog_sharepoint_os_install.png" width="50%" height="50%" /></center>

9. To make sure that the boot order of the VM is CD/DVD before VHDD :
    1. Highlight the VM by clicking on it once and click on ‘Settings’.
    2. Click on ‘System’ and make sure that CD/DVD-ROM is on top of Hard Disk. You can use the check boxes  and use arrows to change the boot order.

<center><img src="https://dplogscontent.blob.core.windows.net/dplogs/blog_sharepoint_os_config.png" width="50%" height="50%" /></center>

10. Click OK.

## Install Windows Server 2008 SP2

1. Double Click on the VM you just created OR Highlight the VM you just created and click Start.
2. The Virtual Machine will boot up with a blue Sun VirtualBox Screen and will start the install of the Operating System from your Iso image or the DVD in your tray (According to your set up).
3. Following this, installation of the Operating System on the VM is the same as how you would normally install an Operating System on a normal machine except that this installation will be running in your VM Window.
4. Enter the product key information of the Operating System when asked.
5. There shouldn’t be any problem installing the Windows Server 2008 SP2 Operating System as VirtualBox provides all virtualization support, hardware drivers can also be installed without any effort.

## Connecting the Virtual Machine to the internet

If this VM is on a host machine which is on an internal network which is monitored by a  firewall then this VM will require permissions to access the internet. This may involve working with the Active Directory too. In this case make sure that an Anti-Virus is installed on the VM. Unless this is done Windows Updates and SharePoint install will not work as they need to connect to the internet and download files during installation.

If you don’t know what is a Firewall, please look [here](http://en.wikipedia.org/wiki/Firewall_%28computing%29).

If you don’t know what is an Active Directory, please look [here](http://en.wikipedia.org/wiki/Active_Directory)

If you don’t require your VM to be on some internal network and just want the VM like an independent sandbox and your host machine has an independent internet connection, then all updates and downloads should work fine. Since we will take the snapshot of the VM when its clean and new(“Clean State”) before we start doing anything on it, we don’t really require an Anti-Virus since you can always set back your VM to the “Clean State”.
Make sure that once the installation of the OS is complete then do all the Windows Updates.

## Setting up shared folders between host and VM

You might be still comfortable to use the internet connection and browser on your host machine to download files which can be required to install SharePoint 2010 or any other software you need on your VM. In that case you need to transfer your files from  your host machine to your VM. You need to set up a share folder between them.
1. Once the VM has started and you have come to your desktop on your VM. Click on the “Devices” menu on the window in which your VM is being run by VirtualBox. This window should be saying its name as “(…) [Running] – Sun VirtualBox”.
2. Click “Shared Folders”.
3. Click the plus folder icon on the top right, which will open up a dialog box asking you to choose a folder from your host machine which you would like to share with this VM. If you don’t already have a separate folder for this purpose, you can go ahead and make one on your host machine and then come back to this window and find the folder you just created by clicking on the down arrow on the Folder Path and then Clicking “Other”.
Give an appropriate folder name. 
4. Click OK. If you choose read-only, it should reflect that access in the “Access” column.
If you don’t know about File system permissions, please look [here](http://en.wikipedia.org/wiki/File_system_permissions)

<center><img src="https://dplogscontent.blob.core.windows.net/dplogs/blog_sharepoint_sharedfolder1.png" width="50%" height="50%" /></center>

<center><img src="https://dplogscontent.blob.core.windows.net/dplogs/blog_sharepoint_sharedfolder2.png" width="50%" height="50%" /></center>

5. Click OK.
6. In your VM, goto Control Panel and then to Network and Sharing Center and make sure that Network Discovery is on. Make it a private network.
7. In your VM, goto the windows explorer and type the following command.
net use Z:\vboxsvr\ (Name of your shared folder)
8. Press enter.
It will take you back to your “My Computer” and under Network Location you should see the folder you shared from your host machine mapped as drive letter Z. If this doesn’t happen then you manually need to map the Z letter to the shared folder.
9. Click on Map Network Drive in Explorer and choose the Drive as Z: and Folder can be chosen after browsing. Since your network discovery is on, you should be able to see VBOXSVR. Expand it and you will find your folder which you shared from your host OS.
10. Select this folder and Click OK. Then Click Finish.

Now you can see the shared folder under Network Location of your VM.
If you don’t know about Drive letter mapping, please look [here](http://en.wikipedia.org/wiki/Drive_letter_assignment).

## Install Guest Additions

It will really make things convenient for you if you Install the Guest Additions by VirtualBox (especially with the mouse). 

1. Click on “Devices”
2. Click on “Install Guest Additions”. 

Let it do its work. Make sure that when you click on “Install Guest Additions” you are on the desktop of your VM, else nothing will happen.

## Download and install WCF hotfix
Before you actually install SharePoint Server 2010 on Windows Server 2008 SP2, you need to install the WCF HotFix (KB971831). It is provided by Microsoft and can be found [here](http://go.microsoft.com/fwlink/?linkID=160770). You can download it straight away from your VM’s browser or download to your host machine, put it in your shared folder and then take it to your VM from your shared folder.
 
## Download Sharepoint Server 2010

If you don’t have SharePoint Server 2010 installation file (called “OfficeServer.exe”), then you will need to go and download it from [here](http://technet.microsoft.com/en-us/evalcenter/ee388573.aspx). I chose the SharePoint Server 2010 (Enterprise Client Access License features) because I believe it’s the whole deal.
You will get the product key of this software in your email which will be asked to you before you download.

## Getting started

1. Once you get OfficeServer.exe on your VM, make a folder in your C: Drive called “SharePointFiles” and keep your OfficeServer.exe file in there.
2. Open Command Prompt and extract the SharePoint Files from OfficeServer.exe to the SharePointFiles folder.
To do this, in the command prompt do the following :
 c:\SharePointFiles\OfficeServer /extract:c:\SharePointFiles
All files will now be extracted to SharePointFiles.
3. If you Run Setup.exe in SharePointFiles you might get error of Hardware and Software Requirements if everything required is not there.

<center><img src="https://dplogscontent.blob.core.windows.net/dplogs/blog_sharepoint_office_pre_req.png" width="50%" height="50%" /></center>

## Installing pre-requisities (preparation tool)

Run the Prerequisite Installer(Preparation Tool) before running the Setup.exe which will check and install all the required softwares for Sharepoint 2010 on Windows Server 2008 SP2.
If at any given point, the Installation fails, you might want to check the log files to see what failed. Most of the time it might be that the installer was not able to download the required files. In this case you need to reset the network adapter. This can be done by going to Network and Sharing Center and clickin on View Status, then clicking on Diagnose. This might be happening only because of the fact that VM is using host internet connection and is not consistent.

## Installing Sharepoint Server 2010

Then run Setup.exe. Choose Standalone. Since you are installing it on a VM, you can run multiple servers to give you the farm effect (Still have to work on that).
If at any given point, the Installation fails, you might want to check the log files to see what failed. Most of the time it might be that the installer was not able to download the required files. In this case you need to reset the network adapter. This might be happening only because of the fact that VM is using host internet connection and is not consistent.
If everything is runs fine and your SharePoint Server 2010 installation is complete, you should be brought to the “Configuration Wizard” window. WAIT. You need to install the SQL Server 2008 KB Hotfixes before you continue.  Let the wizard stay as it is in the background.

## Increase VHDD size

If you have given a VHDD size lesser than what is required to install SharePoint(which happened to me initially, I had given only 20 GB) the installer will stop and say configuration failed.
The ones which are already configured wont be rolled back, on restarting it will just continue from there.
To increase the VHDD space. I believe there are many softwares out there (e.g. CloneZilla).You can refer VirtualBox Forums (Storage) [here](http://forums.virtualbox.org/viewtopic.php?p=33945#33945)
I tried using clonevdi (has an option to increase vdi size while cloning, but didn’t work for me) and researched and came across Gparted. But going through all that is way too much effort and time consuming , instead just do the whole thing all over again with enough space. You can go through all that pain if you have installed a lot of stuff on your VHDD and cannot risk deleting it. (Here we have only installed an OS on a VM as yet).
This time make sure you have enough space on your host computer to dedicate atleast 80 GB for  VHDD (100GB to be safe).

## Download and Install SQL Server 2008 KB hotfixes

Before you continue on the wizard, you need to get the SQL Server 2008 KB Hotfixes which will be emailed to you with passwords. They can be found [here](http://support.microsoft.com/kb/970315) (Click on View and request hotfix downloads)
Get these files on your VM and install them. There should be 2 hotfixes.

## Completing configuration wizard

You can now go ahead and complete the Configuration Wizard.
You will get to the website which you will asked to choose the template. You can choose what you like depending upon what you require it for or match it to your organization. I just made it Blank because I would like to custom build it.
 
## Development tools

We are not done yet. To do any kind of development you will need to :
1. Download and install Visual Studio 2010 which can be found [here](http://msdn.microsoft.com/en-us/vstudio/dd582936.aspx). I installed Visual Studio 2010 Ultimate RC.
2. Download and install the Microsoft SharePoint Platform SDK which can be found [here](http://msdn.microsoft.com/en-us/sharepoint/default.aspx).
 
## Taking a snapshot of VM

Now that all the installation is done. You want to save this state of the VM so that you can always revert to this “Clean State”. VirtualBox allows you to do that by taking a snapshot of the VM.
1. Clear your desktop and click on “Machine” menu on the window which is running your VM. 
2. Click on “Take Snapshot”.
3. Enter this Snapshot’s name and description if you would like. 
4. Click OK. You are all set and ready to play in the sandbox. If at any point of time you would like to come back to the “Clean State” of the VM :
    1. When the VM is “Powered Off”. Click on the Snapshots tab. You should see that it says “Snapshots(1)”. 
    2. You can right click on the Snapshot name which you gave and click on “Restore Snapshot”.

<b>You're all set !</b>