Add-Type -AssemblyName System.Drawing

function New-CoverImage {
  param([string]$Path)
  $width = 1600
  $height = 900
  $bmp = New-Object System.Drawing.Bitmap $width, $height
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit

  $bg = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(247,243,236))
  $navy = [System.Drawing.Color]::FromArgb(17,24,39)
  $teal = [System.Drawing.Color]::FromArgb(14,116,144)
  $muted = [System.Drawing.Color]::FromArgb(71,85,105)
  $line = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(210,221,228)), 3
  $navyBrush = New-Object System.Drawing.SolidBrush $navy
  $tealBrush = New-Object System.Drawing.SolidBrush $teal
  $mutedBrush = New-Object System.Drawing.SolidBrush $muted
  $whiteBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)

  $g.FillRectangle($bg, 0, 0, $width, $height)
  $g.FillEllipse($tealBrush, 1140, -120, 520, 520)
  $g.FillEllipse((New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(230,17,24,39))), 1180, -80, 360, 360)
  $g.FillRectangle((New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(240,255,255,255))), 0, 0, $width, 900)

  $titleFont = New-Object System.Drawing.Font('Segoe UI Semibold', 40, [System.Drawing.FontStyle]::Bold)
  $subtitleFont = New-Object System.Drawing.Font('Segoe UI', 20)
  $tagFont = New-Object System.Drawing.Font('Segoe UI Semibold', 16, [System.Drawing.FontStyle]::Bold)
  $smallFont = New-Object System.Drawing.Font('Segoe UI', 16)

  $g.DrawString('How to Validate a SaaS Idea', $titleFont, $navyBrush, (New-Object System.Drawing.RectangleF 90, 120, 930, 90))
  $g.DrawString('Before You Build', $titleFont, $navyBrush, (New-Object System.Drawing.RectangleF 90, 200, 930, 90))
  $g.DrawString('A founder-focused framework for testing demand, buyer clarity, competition, pricing, and MVP scope.', $subtitleFont, $mutedBrush, (New-Object System.Drawing.RectangleF 92, 305, 860, 100))

  # left tag
  $g.FillRectangle($navyBrush, 92, 430, 270, 52)
  $g.DrawString('SaaS Idea Validator', $tagFont, $whiteBrush, 118, 444)

  # checklist card
  $cardBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255,255,255,255))
  $g.FillRectangle($cardBrush, 90, 535, 620, 220)
  $g.DrawRectangle($line, 90, 535, 620, 220)
  $g.DrawString('What strong validation looks like', $tagFont, $navyBrush, 120, 570)
  $checks = @(
    'Clear buyer and painful problem',
    'Real alternatives and pricing logic',
    'A small wedge worth testing first',
    'Next-step validation actions'
  )
  $y = 625
  foreach ($check in $checks) {
    $g.FillEllipse($tealBrush, 120, $y + 7, 18, 18)
    $g.DrawString($check, $smallFont, $mutedBrush, 152, $y)
    $y += 38
  }

  # right mini diagram
  $panelBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255,17,24,39))
  $panelLine = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(255,14,116,144)), 2
  $g.FillRectangle($panelBrush, 1040, 180, 420, 520)
  $g.DrawString('IDEA', $tagFont, $whiteBrush, 1215, 230)
  $g.DrawString('BUYER', $tagFont, $whiteBrush, 1208, 330)
  $g.DrawString('PROBLEM', $tagFont, $whiteBrush, 1185, 430)
  $g.DrawString('TEST', $tagFont, $whiteBrush, 1215, 530)
  $g.DrawLine($panelLine, 1250, 275, 1250, 315)
  $g.DrawLine($panelLine, 1250, 375, 1250, 415)
  $g.DrawLine($panelLine, 1250, 475, 1250, 515)
  foreach ($yBox in @(205,305,405,505)) {
    $g.DrawRectangle((New-Object System.Drawing.Pen ([System.Drawing.Color]::White), 2), 1135, $yBox, 230, 60)
  }

  $bmp.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose(); $bmp.Dispose()
}

function New-FrameworkImage {
  param([string]$Path)
  $width = 1400
  $height = 900
  $bmp = New-Object System.Drawing.Bitmap $width, $height
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit

  $bg = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(250,247,242))
  $navy = [System.Drawing.Color]::FromArgb(17,24,39)
  $teal = [System.Drawing.Color]::FromArgb(14,116,144)
  $gold = [System.Drawing.Color]::FromArgb(180,132,28)
  $muted = [System.Drawing.Color]::FromArgb(71,85,105)
  $navyBrush = New-Object System.Drawing.SolidBrush $navy
  $tealBrush = New-Object System.Drawing.SolidBrush $teal
  $goldBrush = New-Object System.Drawing.SolidBrush $gold
  $mutedBrush = New-Object System.Drawing.SolidBrush $muted
  $whiteBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
  $linePen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(202,213,221)), 2
  $arrowPen = New-Object System.Drawing.Pen ($teal, 4)
  $g.FillRectangle($bg, 0, 0, $width, $height)

  $titleFont = New-Object System.Drawing.Font('Segoe UI Semibold', 30, [System.Drawing.FontStyle]::Bold)
  $cardTitle = New-Object System.Drawing.Font('Segoe UI Semibold', 18, [System.Drawing.FontStyle]::Bold)
  $bodyFont = New-Object System.Drawing.Font('Segoe UI', 15)
  $numFont = New-Object System.Drawing.Font('Segoe UI Semibold', 16, [System.Drawing.FontStyle]::Bold)

  $g.DrawString('A practical SaaS idea validation framework', $titleFont, $navyBrush, 75, 60)
  $g.DrawString('Use these six checks before you commit to a full build.', $bodyFont, $mutedBrush, 77, 115)

  $cards = @(
    @{X=80;Y=190;Title='1. Buyer';Body='Name the first buyer clearly.';Brush=$navyBrush},
    @{X=470;Y=190;Title='2. Problem';Body='Check that the pain is urgent.';Brush=$tealBrush},
    @{X=860;Y=190;Title='3. Alternatives';Body='Map the real workaround.';Brush=$goldBrush},
    @{X=80;Y=480;Title='4. Pricing';Body='Test willingness to pay early.';Brush=$goldBrush},
    @{X=470;Y=480;Title='5. MVP';Body='Keep the first version narrow.';Brush=$navyBrush},
    @{X=860;Y=480;Title='6. Validation test';Body='Run outreach, landing pages, or pilots.';Brush=$tealBrush}
  )

  foreach ($card in $cards) {
    $x = $card.X; $y = $card.Y
    $g.FillRectangle($whiteBrush, $x, $y, 310, 180)
    $g.DrawRectangle($linePen, $x, $y, 310, 180)
    $g.FillRectangle($card.Brush, $x, $y, 310, 12)
    $g.DrawString($card.Title, $cardTitle, $navyBrush, $x + 24, $y + 34)
    $g.DrawString($card.Body, $bodyFont, $mutedBrush, (New-Object System.Drawing.RectangleF ($x + 24), ($y + 78), 255, 70))
  }

  $g.DrawLine($arrowPen, 390, 280, 470, 280)
  $g.DrawLine($arrowPen, 780, 280, 860, 280)
  $g.DrawLine($arrowPen, 1015, 370, 1015, 480)
  $g.DrawLine($arrowPen, 860, 570, 780, 570)
  $g.DrawLine($arrowPen, 470, 570, 390, 570)

  $g.FillRectangle($navyBrush, 430, 780, 540, 58)
  $g.DrawString('Better idea quality before you build', $numFont, $whiteBrush, 470, 799)

  $bmp.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose(); $bmp.Dispose()
}

$dir = 'E:\VScode\saas-ideas\marketing\medium'
New-Item -ItemType Directory -Force -Path $dir | Out-Null
New-CoverImage -Path (Join-Path $dir 'validate-saas-idea-cover.png')
New-FrameworkImage -Path (Join-Path $dir 'validate-saas-idea-framework.png')
