$ErrorActionPreference = "Stop"

$projectPath = "E:\VScode\saas-ideas"
$tempDir = Join-Path $env:TEMP ("vercel-deploy-" + [guid]::NewGuid().ToString())
$tarball = Join-Path $tempDir "project.tgz"

New-Item -ItemType Directory -Path $tempDir | Out-Null

try {
  tar.exe -czf $tarball -C $projectPath --exclude=node_modules --exclude=.git --exclude=.next --exclude=out --exclude=dist --exclude=.env --exclude=.env.local .
  $response = & curl.exe -s -X POST "https://claude-skills-deploy.vercel.com/api/deploy" -F "file=@$tarball" -F "framework=nextjs"

  if (-not $response) {
    throw "Empty response from deployment endpoint."
  }

  Write-Output $response
}
finally {
  if (Test-Path $tarball) {
    Remove-Item $tarball -Force
  }

  if (Test-Path $tempDir) {
    Remove-Item $tempDir -Force -Recurse
  }
}
