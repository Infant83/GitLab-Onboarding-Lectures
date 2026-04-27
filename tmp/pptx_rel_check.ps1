Add-Type -AssemblyName System.IO.Compression.FileSystem
function Get-ZipMap($path){
  $zip=[IO.Compression.ZipFile]::OpenRead($path)
  try {
    $entries=@{}
    foreach($e in $zip.Entries){ $entries[$e.FullName]=$e }
    return $entries
  } finally { $zip.Dispose() }
}
function Get-ZipText($path,$entry){
  $zip=[IO.Compression.ZipFile]::OpenRead($path)
  try {
    $target=$zip.GetEntry($entry)
    if(-not $target){ return $null }
    $sr=New-Object IO.StreamReader($target.Open())
    try { return $sr.ReadToEnd() } finally { $sr.Dispose() }
  } finally { $zip.Dispose() }
}
function Resolve-RelTarget($relsPath,$target){
  $relsDir = Split-Path $relsPath -Parent
  $baseDir = if($relsDir.EndsWith('_rels')){ Split-Path $relsDir -Parent } else { $relsDir }
  $combined = Join-Path $baseDir $target
  $full = [IO.Path]::GetFullPath((Join-Path 'C:\dummy' $combined))
  return $full.Substring(9).Replace('\','/')
}
function Test-Pptx($path){
  $map = Get-ZipMap $path
  $all = $map.Keys
  $issues = @()
  foreach($rels in $all | Where-Object { $_ -like '*.rels' }){
    $xmlText = Get-ZipText $path $rels
    try { [xml]$xml = $xmlText } catch { $issues += "XML parse fail: $rels :: $($_.Exception.Message)"; continue }
    $nodes = $xml.Relationships.Relationship
    foreach($node in $nodes){
      if($node.TargetMode -eq 'External'){ continue }
      $resolved = Resolve-RelTarget $rels $node.Target
      if(-not $map.ContainsKey($resolved)){
        $issues += "Missing target from $rels -> $($node.Target) => $resolved"
      }
    }
  }
  return $issues
}
$orig='C:\Users\angpa\myProjects\Daily_Work\Skills_convert\ppt-skills\pptx_Template.pptx'
$lg='C:\Users\angpa\myProjects\Daily_Work\Skills_convert\ppt-skills\pptx_Template_LGDisplay.pptx'
'--- Original relationship issues ---'
Test-Pptx $orig
'--- LG relationship issues ---'
Test-Pptx $lg
