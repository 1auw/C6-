/**
 * Script pour créer un compte OWNER
 * Usage: npx ts-node scripts/create-owner.ts
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createOwner() {
  // ⚠️ MODIFIEZ CES VALEURS
  const username = 'Owner';          // Changez le pseudo
  const email = 'owner@central6rp.fr'; // Changez l'email
  const password = 'OwnerPass123!';    // Changez le mot de passe

  try {
    // Vérifier si l'utilisateur existe déjà
    const existing = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }]
      }
    });

    if (existing) {
      console.log('⚠️  Un utilisateur avec ce pseudo ou email existe déjà');
      
      // Mettre à jour le rôle en OWNER
      await prisma.user.update({
        where: { id: existing.id },
        data: { role: 'OWNER' }
      });
      
      console.log(`✅ Utilisateur "${existing.username}" promu OWNER !`);
      return;
    }

    // Hasher le mot de passe
    const passwordHash = await bcrypt.hash(password, 10);

    // Créer l'utilisateur OWNER
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: passwordHash,
        role: 'OWNER',
        isActive: true,
      }
    });

    console.log('✅ Compte OWNER créé avec succès !');
    console.log(`   Pseudo: ${user.username}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Rôle: ${user.role}`);

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createOwner();

