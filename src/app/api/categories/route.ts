import { NextRequest, NextResponse } from 'next/server';
import { getCategories, addCategory, updateCategory, deleteCategory } from '@/lib/db-postgres';
import { uploadToCloudinary, isCloudinaryConfigured } from '@/lib/cloudinary';

// GET - Ottieni tutte le categorie
export async function GET() {
  try {
    const categories = await getCategories();
    
    // Aggiungi il conteggio prodotti per ogni categoria
    const { sql } = require('@vercel/postgres');
    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const { rows } = await sql`
          SELECT COUNT(*) as count FROM products WHERE category = ${category.slug}
        `;
        return {
          ...category,
          count: parseInt(rows[0].count)
        };
      })
    );
    
    return NextResponse.json(categoriesWithCount);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

// POST - Aggiungi nuova categoria
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Gestione upload immagine
    let imageUrl = formData.get('imageUrl') as string;
    const imageFile = formData.get('image') as File;
    
    if (imageFile && imageFile.size > 0) {
      // Se c'è un file, caricalo su Cloudinary
      if (isCloudinaryConfigured()) {
        try {
          imageUrl = await uploadToCloudinary(imageFile);
        } catch (error) {
          console.error('Error uploading to Cloudinary:', error);
          // Fallback a placeholder se Cloudinary fallisce
          imageUrl = 'https://via.placeholder.com/400x300?text=Categoria';
        }
      }
    }
    
    // Se non c'è né file né URL, usa placeholder
    if (!imageUrl) {
      imageUrl = 'https://via.placeholder.com/400x300?text=Categoria';
    }
    
    const categoryData = {
      name: formData.get('name') as string,
      slug: (formData.get('slug') as string) || (formData.get('name') as string).toLowerCase().replace(/\s+/g, '-'),
      image: imageUrl,
      color: formData.get('color') as string || 'from-gray-500 to-gray-600',
      order_index: parseInt(formData.get('order_index') as string) || 0
    };
    
    const newCategory = await addCategory(categoryData);
    
    if (!newCategory) {
      return NextResponse.json({ error: 'Failed to add category' }, { status: 500 });
    }
    
    return NextResponse.json(newCategory);
  } catch (error) {
    console.error('Error adding category:', error);
    return NextResponse.json({ error: 'Failed to add category' }, { status: 500 });
  }
}

// PUT - Aggiorna categoria
export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();
    const id = formData.get('id') as string;
    
    if (!id) {
      return NextResponse.json({ error: 'Category ID required' }, { status: 400 });
    }
    
    // Gestione upload immagine
    let imageUrl = formData.get('imageUrl') as string;
    const imageFile = formData.get('image') as File;
    
    if (imageFile && imageFile.size > 0) {
      // Se c'è un file, caricalo su Cloudinary
      if (isCloudinaryConfigured()) {
        try {
          imageUrl = await uploadToCloudinary(imageFile);
        } catch (error) {
          console.error('Error uploading to Cloudinary:', error);
        }
      }
    }
    
    const updates: any = {};
    
    if (formData.get('name')) updates.name = formData.get('name');
    if (formData.get('slug')) updates.slug = formData.get('slug');
    if (imageUrl) updates.image = imageUrl;
    if (formData.get('color')) updates.color = formData.get('color');
    if (formData.get('order_index')) updates.order_index = parseInt(formData.get('order_index') as string);
    
    const updatedCategory = await updateCategory(id, updates);
    
    if (!updatedCategory) {
      return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
    }
    
    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
  }
}

// DELETE - Elimina categoria
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Category ID required' }, { status: 400 });
    }
    
    const success = await deleteCategory(id);
    
    if (!success) {
      return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}