import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'
import AsyncStorage from "@react-native-async-storage/async-storage";

export  const supabase = createClient("https://hjqgqqanlxxwxzgqifey.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqcWdxcWFubHh4d3h6Z3FpZmV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU2OTAwMDEsImV4cCI6MjAyMTI2NjAwMX0.O21FPSHD2Ds51bJKeiXp1_tdqi92juYVu6rOnrt9Hxw", {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});