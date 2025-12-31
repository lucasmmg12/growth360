import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pagyohqmupvugeuafuya.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhZ3lvaHFtdXB2dWdldWFmdXlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxOTU0MjcsImV4cCI6MjA4Mjc3MTQyN30.qbOb2sDZi0Tht0giMsoL0wzZYasBbqp8yOgY1Ce82b4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
