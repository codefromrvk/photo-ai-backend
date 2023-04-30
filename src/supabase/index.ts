import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.DB_URL as string
const supabaseKey = process.env.SUPABASE_KEY as string

export const supabase = createClient(supabaseUrl, supabaseKey)
