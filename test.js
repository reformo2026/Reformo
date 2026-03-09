require('dotenv').config({ path: '.env.local', debug: true });

console.log('dotenv cargado. Variables leídas:');
console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL || 'NO LEÍDA');
console.log('KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'NO LEÍDA');

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.log('ERROR: Faltan variables. Verifica nombre y contenido de .env.local');
  process.exit(1);
}

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function test() {
  try {
    const { data, error } = await supabase.from('profiles').select('*').limit(1);
    console.log('Resultado:', data);
    console.log('Error:', error || 'Conexión OK (tabla profiles no existe aún)');
  } catch (err) {
    console.log('Error grave:', err.message);
  }
}

test();