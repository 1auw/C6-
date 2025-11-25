# Script PowerShell pour initialiser Git et pousser vers GitHub
# Exécutez ce script dans PowerShell : .\setup-git.ps1

Write-Host "🚀 Configuration Git pour Central 6RP" -ForegroundColor Cyan
Write-Host ""

# Vérifier si Git est installé
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git n'est pas installé !" -ForegroundColor Red
    Write-Host "Téléchargez Git depuis : https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Git est installé" -ForegroundColor Green
Write-Host ""

# Demander l'URL du repository GitHub
$repoUrl = Read-Host "Entrez l'URL de votre repository GitHub (ex: https://github.com/username/central6.git)"

if ([string]::IsNullOrWhiteSpace($repoUrl)) {
    Write-Host "❌ URL invalide !" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📦 Initialisation de Git..." -ForegroundColor Cyan

# Initialiser Git
if (Test-Path .git) {
    Write-Host "⚠️  Git est déjà initialisé" -ForegroundColor Yellow
} else {
    git init
    Write-Host "✅ Git initialisé" -ForegroundColor Green
}

Write-Host ""
Write-Host "📝 Ajout des fichiers..." -ForegroundColor Cyan
git add .

Write-Host ""
Write-Host "💾 Création du commit initial..." -ForegroundColor Cyan
git commit -m "Initial commit - Site Central 6RP"

Write-Host ""
Write-Host "🔗 Configuration du remote..." -ForegroundColor Cyan
git remote remove origin 2>$null
git remote add origin $repoUrl

Write-Host ""
Write-Host "🌿 Configuration de la branche main..." -ForegroundColor Cyan
git branch -M main

Write-Host ""
Write-Host "📤 Poussage vers GitHub..." -ForegroundColor Cyan
Write-Host "⚠️  Vous devrez peut-être vous authentifier" -ForegroundColor Yellow
git push -u origin main

Write-Host ""
Write-Host "✅ Configuration terminée !" -ForegroundColor Green
Write-Host ""
Write-Host "Prochaines étapes :" -ForegroundColor Cyan
Write-Host "1. Allez sur https://vercel.com" -ForegroundColor White
Write-Host "2. Importez votre repository GitHub" -ForegroundColor White
Write-Host "3. Configurez les variables d'environnement" -ForegroundColor White
Write-Host "4. Déployez !" -ForegroundColor White
Write-Host ""
Write-Host "Variables d'environnement requises : DATABASE_URL, JWT_SECRET" -ForegroundColor Yellow

