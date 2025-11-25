/**
 * Configuration du site Central 6RP
 * Modifiez ces valeurs pour personnaliser votre site
 */

export const siteConfig = {
  // Informations du serveur
  name: "Central 6RP",
  description: "Serveur FiveM RolePlay Français",
  
  // Liens sociaux et connexion
  links: {
    discord: "https://discord.gg/central6rp", // REMPLACEZ par votre vrai lien Discord
    fivem: "fivem://connect/cfx.re/join/drvao5",
  },
  
  // Logo (navbar)
  logo: {
    src: "/logo.png",  // Placez votre logo ici
    alt: "Central 6RP",
    height: 60, // Hauteur en pixels (modifiable)
  },
  
  // Vidéo du hero
  video: {
    src: "/videos/hero-bg.mp4",
    fallbackImage: "/images/hero-fallback.jpg", // Image de secours si la vidéo ne charge pas
  },
  
  // Thème de couleur (optionnel - déjà défini dans Tailwind)
  theme: {
    primary: "#2a7cff",
    primaryLight: "#5ea3ff",
    primaryNeon: "#00d4ff",
  }
};

