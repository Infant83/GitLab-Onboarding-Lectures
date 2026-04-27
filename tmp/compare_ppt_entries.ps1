Add-Type -AssemblyName System.IO.Compression.FileSystem
function Get-ZipEntries($path){
  $zip=[IO.Compression.ZipFile]::OpenRead($path)
  try { $zip.Entries | ForEach-Object { $_.FullName } }
  finally { $zip.Dispose() }
}
$orig='C:\Users\angpa\myProjects\Daily_Work\Skills_convert\ppt-skills\pptx_Template.pptx'
$lg='C:\Users\angpa\myProjects\Daily_Work\Skills_convert\ppt-skills\pptx_Template_LGDisplay.pptx'
$origEntries=Get-ZipEntries $orig
$lgEntries=Get-ZipEntries $lg
