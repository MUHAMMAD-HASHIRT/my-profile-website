$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8080/")
$listener.Start()
Write-Host "Server running at http://localhost:8080/"

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response
    
    $localPath = (Get-Location).Path + $request.Url.LocalPath.Replace("/", "\")
    if ($localPath.EndsWith("\")) { $localPath += "index.html" }
    
    if (Test-Path $localPath -PathType Leaf) {
        try {
            $content = [System.IO.File]::ReadAllBytes($localPath)
            $response.ContentLength64 = $content.Length
            
            if ($localPath.EndsWith(".html")) { $response.ContentType = "text/html" }
            elseif ($localPath.EndsWith(".css")) { $response.ContentType = "text/css" }
            elseif ($localPath.EndsWith(".js")) { $response.ContentType = "application/javascript" }
            elseif ($localPath.EndsWith(".glb")) { $response.ContentType = "model/gltf-binary" }
            elseif ($localPath.EndsWith(".png")) { $response.ContentType = "image/png" }
            
            $response.OutputStream.Write($content, 0, $content.Length)
        } catch {
            $response.StatusCode = 500
        }
    } else {
        $response.StatusCode = 404
    }
    $response.Close()
}
