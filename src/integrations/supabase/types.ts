export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      abandoned_funnels: {
        Row: {
          address: string | null
          city: string | null
          created_at: string
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          last_step: number
          last_step_label: string
          payment_option: string | null
          phone: string | null
          program_code: string
          program_id: string | null
          recovered: boolean
          resume_token: string | null
          selected_date_id: string | null
          selected_ghl_slot: string | null
          selected_variant_id: string | null
          session_id: string
          state: string | null
          updated_at: string
          user_id: string | null
          zip: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          last_step?: number
          last_step_label?: string
          payment_option?: string | null
          phone?: string | null
          program_code: string
          program_id?: string | null
          recovered?: boolean
          resume_token?: string | null
          selected_date_id?: string | null
          selected_ghl_slot?: string | null
          selected_variant_id?: string | null
          session_id: string
          state?: string | null
          updated_at?: string
          user_id?: string | null
          zip?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          last_step?: number
          last_step_label?: string
          payment_option?: string | null
          phone?: string | null
          program_code?: string
          program_id?: string | null
          recovered?: boolean
          resume_token?: string | null
          selected_date_id?: string | null
          selected_ghl_slot?: string | null
          selected_variant_id?: string | null
          session_id?: string
          state?: string | null
          updated_at?: string
          user_id?: string | null
          zip?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "abandoned_funnels_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      agreement_templates: {
        Row: {
          content_json: Json
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean
          is_default: boolean
          is_system_default: boolean
          name: string
          organization_id: string | null
          updated_at: string | null
          version: number
        }
        Insert: {
          content_json?: Json
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          is_default?: boolean
          is_system_default?: boolean
          name: string
          organization_id?: string | null
          updated_at?: string | null
          version?: number
        }
        Update: {
          content_json?: Json
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          is_default?: boolean
          is_system_default?: boolean
          name?: string
          organization_id?: string | null
          updated_at?: string | null
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "agreement_templates_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      ambassador_profiles: {
        Row: {
          id: string
          joined_at: string
          organization_id: string | null
          residual_rate_cents: number
          status: string
          tier: string
          total_lifetime_earned_cents: number
          total_lifetime_referrals: number
          user_id: string
        }
        Insert: {
          id?: string
          joined_at?: string
          organization_id?: string | null
          residual_rate_cents?: number
          status?: string
          tier?: string
          total_lifetime_earned_cents?: number
          total_lifetime_referrals?: number
          user_id: string
        }
        Update: {
          id?: string
          joined_at?: string
          organization_id?: string | null
          residual_rate_cents?: number
          status?: string
          tier?: string
          total_lifetime_earned_cents?: number
          total_lifetime_referrals?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ambassador_profiles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ambassador_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      appointments: {
        Row: {
          client_id: string | null
          created_at: string
          id: string
          meeting_date: string
          meeting_time: string
          notes: string | null
          organization_id: string | null
          status: string
          tax_pro_id: string | null
          title: string
          updated_at: string
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          id?: string
          meeting_date: string
          meeting_time: string
          notes?: string | null
          organization_id?: string | null
          status?: string
          tax_pro_id?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          client_id?: string | null
          created_at?: string
          id?: string
          meeting_date?: string
          meeting_time?: string
          notes?: string | null
          organization_id?: string | null
          status?: string
          tax_pro_id?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_tenant_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      attempt_answers: {
        Row: {
          attempt_id: string
          correct_answer: string
          created_at: string
          id: string
          is_correct: boolean
          question_id: string | null
          question_snapshot: Json
          selected_answer: string | null
          time_spent_seconds: number | null
        }
        Insert: {
          attempt_id: string
          correct_answer: string
          created_at?: string
          id?: string
          is_correct?: boolean
          question_id?: string | null
          question_snapshot: Json
          selected_answer?: string | null
          time_spent_seconds?: number | null
        }
        Update: {
          attempt_id?: string
          correct_answer?: string
          created_at?: string
          id?: string
          is_correct?: boolean
          question_id?: string | null
          question_snapshot?: Json
          selected_answer?: string | null
          time_spent_seconds?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "attempt_answers_attempt_id_fkey"
            columns: ["attempt_id"]
            isOneToOne: false
            referencedRelation: "quiz_attempts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attempt_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      attendance_records: {
        Row: {
          created_at: string
          enrollment_id: string
          hours_attended: number | null
          id: string
          marked_at: string | null
          marked_by: string | null
          notes: string | null
          organization_id: string | null
          session_id: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          enrollment_id: string
          hours_attended?: number | null
          id?: string
          marked_at?: string | null
          marked_by?: string | null
          notes?: string | null
          organization_id?: string | null
          session_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          enrollment_id?: string
          hours_attended?: number | null
          id?: string
          marked_at?: string | null
          marked_by?: string | null
          notes?: string | null
          organization_id?: string | null
          session_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendance_records_enrollment_id_fkey"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "enrollments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_records_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_records_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "class_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          actor_id: string | null
          created_at: string
          details: string | null
          id: string
          metadata: Json | null
          organization_id: string | null
        }
        Insert: {
          action: string
          actor_id?: string | null
          created_at?: string
          details?: string | null
          id?: string
          metadata?: Json | null
          organization_id?: string | null
        }
        Update: {
          action?: string
          actor_id?: string | null
          created_at?: string
          details?: string | null
          id?: string
          metadata?: Json | null
          organization_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_tenant_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      auto_publish_settings: {
        Row: {
          audit_enabled: boolean
          created_at: string
          enabled: boolean
          frequency: string
          id: string
          last_category_index: number
          last_published_at: string | null
          max_retries: number
          posts_per_cycle: number
          preferred_days: number[] | null
          preferred_hour: number
          updated_at: string
        }
        Insert: {
          audit_enabled?: boolean
          created_at?: string
          enabled?: boolean
          frequency?: string
          id?: string
          last_category_index?: number
          last_published_at?: string | null
          max_retries?: number
          posts_per_cycle?: number
          preferred_days?: number[] | null
          preferred_hour?: number
          updated_at?: string
        }
        Update: {
          audit_enabled?: boolean
          created_at?: string
          enabled?: boolean
          frequency?: string
          id?: string
          last_category_index?: number
          last_published_at?: string | null
          max_retries?: number
          posts_per_cycle?: number
          preferred_days?: number[] | null
          preferred_hour?: number
          updated_at?: string
        }
        Relationships: []
      }
      automation_triggers: {
        Row: {
          channel: string
          created_at: string
          error_message: string | null
          id: string
          lead_application_id: string | null
          organization_id: string | null
          payload: Json | null
          program_id: string | null
          sent_at: string | null
          status: string
          trigger_type: string
          user_id: string
        }
        Insert: {
          channel?: string
          created_at?: string
          error_message?: string | null
          id?: string
          lead_application_id?: string | null
          organization_id?: string | null
          payload?: Json | null
          program_id?: string | null
          sent_at?: string | null
          status?: string
          trigger_type: string
          user_id: string
        }
        Update: {
          channel?: string
          created_at?: string
          error_message?: string | null
          id?: string
          lead_application_id?: string | null
          organization_id?: string | null
          payload?: Json | null
          program_id?: string | null
          sent_at?: string | null
          status?: string
          trigger_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "automation_triggers_lead_application_id_fkey"
            columns: ["lead_application_id"]
            isOneToOne: false
            referencedRelation: "lead_applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "automation_triggers_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "automation_triggers_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "automation_triggers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_audit_log: {
        Row: {
          attempt_number: number
          audit_result: string
          authority_score: number | null
          compliance_notes: string | null
          created_at: string
          has_index: boolean | null
          id: string
          issues: string[] | null
          post_id: string | null
          word_count: number | null
        }
        Insert: {
          attempt_number?: number
          audit_result: string
          authority_score?: number | null
          compliance_notes?: string | null
          created_at?: string
          has_index?: boolean | null
          id?: string
          issues?: string[] | null
          post_id?: string | null
          word_count?: number | null
        }
        Update: {
          attempt_number?: number
          audit_result?: string
          authority_score?: number | null
          compliance_notes?: string | null
          created_at?: string
          has_index?: boolean | null
          id?: string
          issues?: string[] | null
          post_id?: string | null
          word_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_audit_log_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          agent_type: string | null
          author_name: string
          author_role: string | null
          category_id: string | null
          content: string
          created_at: string
          excerpt: string | null
          featured: boolean
          featured_image: string | null
          id: string
          published_at: string | null
          scheduled_at: string | null
          seo_description: string | null
          seo_keywords: string[] | null
          seo_title: string | null
          slug: string
          status: string
          subtitle: string | null
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          agent_type?: string | null
          author_name?: string
          author_role?: string | null
          category_id?: string | null
          content?: string
          created_at?: string
          excerpt?: string | null
          featured?: boolean
          featured_image?: string | null
          id?: string
          published_at?: string | null
          scheduled_at?: string | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          seo_title?: string | null
          slug: string
          status?: string
          subtitle?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          agent_type?: string | null
          author_name?: string
          author_role?: string | null
          category_id?: string | null
          content?: string
          created_at?: string
          excerpt?: string | null
          featured?: boolean
          featured_image?: string | null
          id?: string
          published_at?: string | null
          scheduled_at?: string | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          seo_title?: string | null
          slug?: string
          status?: string
          subtitle?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      calendar_connections: {
        Row: {
          access_token: string | null
          connected_at: string | null
          created_at: string
          id: string
          organization_id: string | null
          provider: string
          refresh_token: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          access_token?: string | null
          connected_at?: string | null
          created_at?: string
          id?: string
          organization_id?: string | null
          provider: string
          refresh_token?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          access_token?: string | null
          connected_at?: string | null
          created_at?: string
          id?: string
          organization_id?: string | null
          provider?: string
          refresh_token?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "calendar_connections_tenant_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      calendar_holidays: {
        Row: {
          calendar_id: string
          created_at: string
          date: string
          id: string
          name: string
          recurring: boolean
        }
        Insert: {
          calendar_id: string
          created_at?: string
          date: string
          id?: string
          name: string
          recurring?: boolean
        }
        Update: {
          calendar_id?: string
          created_at?: string
          date?: string
          id?: string
          name?: string
          recurring?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "calendar_holidays_calendar_id_fkey"
            columns: ["calendar_id"]
            isOneToOne: false
            referencedRelation: "holiday_calendars"
            referencedColumns: ["id"]
          },
        ]
      }
      calendar_integrations: {
        Row: {
          active: boolean
          config_json: Json
          created_at: string
          id: string
          organization_id: string
          type: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          config_json?: Json
          created_at?: string
          id?: string
          organization_id: string
          type: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          config_json?: Json
          created_at?: string
          id?: string
          organization_id?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "calendar_integrations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      calendar_mappings: {
        Row: {
          calendar_integration_id: string
          class_duration_hours: number | null
          created_at: string
          external_calendar_id: string | null
          id: string
          shift_name: string | null
          variation_id: string
        }
        Insert: {
          calendar_integration_id: string
          class_duration_hours?: number | null
          created_at?: string
          external_calendar_id?: string | null
          id?: string
          shift_name?: string | null
          variation_id: string
        }
        Update: {
          calendar_integration_id?: string
          class_duration_hours?: number | null
          created_at?: string
          external_calendar_id?: string | null
          id?: string
          shift_name?: string | null
          variation_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "calendar_mappings_calendar_integration_id_fkey"
            columns: ["calendar_integration_id"]
            isOneToOne: false
            referencedRelation: "calendar_integrations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calendar_mappings_variation_id_fkey"
            columns: ["variation_id"]
            isOneToOne: false
            referencedRelation: "program_variations"
            referencedColumns: ["id"]
          },
        ]
      }
      calendar_sync_jobs: {
        Row: {
          attempts: number
          created_at: string
          event_type: string
          id: string
          last_error: string | null
          max_attempts: number
          organization_id: string
          payload: Json
          processed_at: string | null
          scheduled_for: string
          status: string
        }
        Insert: {
          attempts?: number
          created_at?: string
          event_type: string
          id?: string
          last_error?: string | null
          max_attempts?: number
          organization_id: string
          payload?: Json
          processed_at?: string | null
          scheduled_for?: string
          status?: string
        }
        Update: {
          attempts?: number
          created_at?: string
          event_type?: string
          id?: string
          last_error?: string | null
          max_attempts?: number
          organization_id?: string
          payload?: Json
          processed_at?: string | null
          scheduled_for?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "calendar_sync_jobs_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      call_participants: {
        Row: {
          call_id: string
          id: string
          joined_at: string
          left_at: string | null
          user_id: string
        }
        Insert: {
          call_id: string
          id?: string
          joined_at?: string
          left_at?: string | null
          user_id: string
        }
        Update: {
          call_id?: string
          id?: string
          joined_at?: string
          left_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "call_participants_call_id_fkey"
            columns: ["call_id"]
            isOneToOne: false
            referencedRelation: "call_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      call_sessions: {
        Row: {
          call_type: Database["public"]["Enums"]["call_type"]
          conversation_id: string
          duration_seconds: number | null
          ended_at: string | null
          id: string
          started_at: string
          started_by: string
          status: Database["public"]["Enums"]["call_status"]
        }
        Insert: {
          call_type?: Database["public"]["Enums"]["call_type"]
          conversation_id: string
          duration_seconds?: number | null
          ended_at?: string | null
          id?: string
          started_at?: string
          started_by: string
          status?: Database["public"]["Enums"]["call_status"]
        }
        Update: {
          call_type?: Database["public"]["Enums"]["call_type"]
          conversation_id?: string
          duration_seconds?: number | null
          ended_at?: string | null
          id?: string
          started_at?: string
          started_by?: string
          status?: Database["public"]["Enums"]["call_status"]
        }
        Relationships: [
          {
            foreignKeyName: "call_sessions_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      certificates: {
        Row: {
          certificate_number: string
          course_id: string
          enrollment_id: string | null
          id: string
          issued_at: string
          program_name: string
          student_name: string
          user_id: string
        }
        Insert: {
          certificate_number?: string
          course_id: string
          enrollment_id?: string | null
          id?: string
          issued_at?: string
          program_name: string
          student_name: string
          user_id: string
        }
        Update: {
          certificate_number?: string
          course_id?: string
          enrollment_id?: string | null
          id?: string
          issued_at?: string
          program_name?: string
          student_name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "certificates_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "certificates_enrollment_id_fkey"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "enrollments"
            referencedColumns: ["id"]
          },
        ]
      }
      class_sessions: {
        Row: {
          classroom: string | null
          cohort_id: string | null
          created_at: string
          end_time: string
          id: string
          instructor_name: string | null
          notes: string | null
          program_id: string
          schedule_version: number | null
          session_date: string
          session_type: string
          start_time: string
          zoom_link: string | null
        }
        Insert: {
          classroom?: string | null
          cohort_id?: string | null
          created_at?: string
          end_time: string
          id?: string
          instructor_name?: string | null
          notes?: string | null
          program_id: string
          schedule_version?: number | null
          session_date: string
          session_type?: string
          start_time: string
          zoom_link?: string | null
        }
        Update: {
          classroom?: string | null
          cohort_id?: string | null
          created_at?: string
          end_time?: string
          id?: string
          instructor_name?: string | null
          notes?: string | null
          program_id?: string
          schedule_version?: number | null
          session_date?: string
          session_type?: string
          start_time?: string
          zoom_link?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "class_sessions_cohort_id_fkey"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "class_sessions_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      client_assignments: {
        Row: {
          client_id: string | null
          created_at: string | null
          id: string
          status: string | null
          taxpro_id: string | null
        }
        Insert: {
          client_id?: string | null
          created_at?: string | null
          id?: string
          status?: string | null
          taxpro_id?: string | null
        }
        Update: {
          client_id?: string | null
          created_at?: string | null
          id?: string
          status?: string | null
          taxpro_id?: string | null
        }
        Relationships: []
      }
      cohort_instructor_assignments: {
        Row: {
          created_at: string
          effective_end_date: string | null
          effective_start_date: string
          generated_cohort_id: string
          id: string
          instructor_id: string
          organization_id: string
        }
        Insert: {
          created_at?: string
          effective_end_date?: string | null
          effective_start_date: string
          generated_cohort_id: string
          id?: string
          instructor_id: string
          organization_id: string
        }
        Update: {
          created_at?: string
          effective_end_date?: string | null
          effective_start_date?: string
          generated_cohort_id?: string
          id?: string
          instructor_id?: string
          organization_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cohort_instructor_assignments_generated_cohort_id_fkey"
            columns: ["generated_cohort_id"]
            isOneToOne: false
            referencedRelation: "generated_cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cohort_instructor_assignments_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cohort_instructor_assignments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      cohort_instructors: {
        Row: {
          cohort_id: string
          created_at: string
          id: string
          instructor_id: string
          organization_id: string | null
          role: string
        }
        Insert: {
          cohort_id: string
          created_at?: string
          id?: string
          instructor_id: string
          organization_id?: string | null
          role?: string
        }
        Update: {
          cohort_id?: string
          created_at?: string
          id?: string
          instructor_id?: string
          organization_id?: string | null
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "cohort_instructors_cohort_id_fkey"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cohort_instructors_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      cohort_session_overrides: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          new_date: string | null
          new_duration: number | null
          new_start_time: string | null
          override_type: string
          reason: string | null
          session_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          new_date?: string | null
          new_duration?: number | null
          new_start_time?: string | null
          override_type: string
          reason?: string | null
          session_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          new_date?: string | null
          new_duration?: number | null
          new_start_time?: string | null
          override_type?: string
          reason?: string | null
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cohort_session_overrides_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "cohort_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      cohort_sessions: {
        Row: {
          cohort_id: string
          date: string
          duration_hours: number
          id: string
          session_number: number
          session_type: string
          start_time: string
          timezone: string
        }
        Insert: {
          cohort_id: string
          date: string
          duration_hours: number
          id?: string
          session_number: number
          session_type?: string
          start_time: string
          timezone?: string
        }
        Update: {
          cohort_id?: string
          date?: string
          duration_hours?: number
          id?: string
          session_number?: number
          session_type?: string
          start_time?: string
          timezone?: string
        }
        Relationships: [
          {
            foreignKeyName: "cohort_sessions_cohort_id_fkey"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
        ]
      }
      cohorts: {
        Row: {
          created_at: string
          created_via: string | null
          curriculum_hours_snapshot: number
          end_date: string | null
          enrolled_count: number
          event_time: string | null
          generated: boolean
          generator_version: number
          ghl_event_id: string | null
          id: string
          locked: boolean
          max_seats: number
          organization_id: string | null
          program_id: string
          schedule_template_id: string | null
          schedule_version: number
          start_date: string
          status: string
          template_snapshot: Json
          updated_at: string
          variation_id: string | null
        }
        Insert: {
          created_at?: string
          created_via?: string | null
          curriculum_hours_snapshot: number
          end_date?: string | null
          enrolled_count?: number
          event_time?: string | null
          generated?: boolean
          generator_version?: number
          ghl_event_id?: string | null
          id?: string
          locked?: boolean
          max_seats?: number
          organization_id?: string | null
          program_id: string
          schedule_template_id?: string | null
          schedule_version?: number
          start_date: string
          status?: string
          template_snapshot?: Json
          updated_at?: string
          variation_id?: string | null
        }
        Update: {
          created_at?: string
          created_via?: string | null
          curriculum_hours_snapshot?: number
          end_date?: string | null
          enrolled_count?: number
          event_time?: string | null
          generated?: boolean
          generator_version?: number
          ghl_event_id?: string | null
          id?: string
          locked?: boolean
          max_seats?: number
          organization_id?: string | null
          program_id?: string
          schedule_template_id?: string | null
          schedule_version?: number
          start_date?: string
          status?: string
          template_snapshot?: Json
          updated_at?: string
          variation_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cohorts_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cohorts_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cohorts_schedule_template_id_fkey"
            columns: ["schedule_template_id"]
            isOneToOne: false
            referencedRelation: "schedule_templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cohorts_variation_id_fkey"
            columns: ["variation_id"]
            isOneToOne: false
            referencedRelation: "program_variations"
            referencedColumns: ["id"]
          },
        ]
      }
      community_messages: {
        Row: {
          attachments: Json | null
          content: string | null
          conversation_id: string
          created_at: string
          deleted_at: string | null
          id: string
          is_edited: boolean
          reply_to_id: string | null
          sender_id: string
          type: Database["public"]["Enums"]["message_type"]
          updated_at: string
        }
        Insert: {
          attachments?: Json | null
          content?: string | null
          conversation_id: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          is_edited?: boolean
          reply_to_id?: string | null
          sender_id: string
          type?: Database["public"]["Enums"]["message_type"]
          updated_at?: string
        }
        Update: {
          attachments?: Json | null
          content?: string | null
          conversation_id?: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          is_edited?: boolean
          reply_to_id?: string | null
          sender_id?: string
          type?: Database["public"]["Enums"]["message_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_messages_reply_to_id_fkey"
            columns: ["reply_to_id"]
            isOneToOne: false
            referencedRelation: "community_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      conversation_members: {
        Row: {
          conversation_id: string
          id: string
          is_muted: boolean
          joined_at: string
          last_read_at: string
          notifications_enabled: boolean
          role: Database["public"]["Enums"]["member_role"]
          user_id: string
        }
        Insert: {
          conversation_id: string
          id?: string
          is_muted?: boolean
          joined_at?: string
          last_read_at?: string
          notifications_enabled?: boolean
          role?: Database["public"]["Enums"]["member_role"]
          user_id: string
        }
        Update: {
          conversation_id?: string
          id?: string
          is_muted?: boolean
          joined_at?: string
          last_read_at?: string
          notifications_enabled?: boolean
          role?: Database["public"]["Enums"]["member_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_members_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          avatar_url: string | null
          cohort_id: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_archived: boolean
          name: string | null
          pinned_message_id: string | null
          program_id: string | null
          type: Database["public"]["Enums"]["conversation_type"]
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          cohort_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_archived?: boolean
          name?: string | null
          pinned_message_id?: string | null
          program_id?: string | null
          type: Database["public"]["Enums"]["conversation_type"]
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          cohort_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_archived?: boolean
          name?: string | null
          pinned_message_id?: string | null
          program_id?: string | null
          type?: Database["public"]["Enums"]["conversation_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      course_sections: {
        Row: {
          course_id: string
          created_at: string
          id: string
          sequence_order: number
          title: string
        }
        Insert: {
          course_id: string
          created_at?: string
          id?: string
          sequence_order?: number
          title: string
        }
        Update: {
          course_id?: string
          created_at?: string
          id?: string
          sequence_order?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_sections_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          created_at: string
          description: string | null
          id: string
          organization_id: string | null
          program_id: string
          status: string
          thumbnail_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          organization_id?: string | null
          program_id: string
          status?: string
          thumbnail_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          organization_id?: string | null
          program_id?: string
          status?: string
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "courses_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "courses_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      cta_config: {
        Row: {
          admin_notes: string | null
          created_at: string
          destination_target: string
          destination_type: Database["public"]["Enums"]["cta_destination_type"]
          display_label: string
          flow_id: string | null
          flow_variant: string | null
          headline_template: string | null
          id: string
          internal_name: string
          is_active: boolean
          organization_id: string | null
          page_scope: string[]
          program_scope: string[]
          sort_order: number
          subheadline_template: string | null
          tracking_event_name: string
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string
          destination_target: string
          destination_type: Database["public"]["Enums"]["cta_destination_type"]
          display_label: string
          flow_id?: string | null
          flow_variant?: string | null
          headline_template?: string | null
          id?: string
          internal_name: string
          is_active?: boolean
          organization_id?: string | null
          page_scope?: string[]
          program_scope?: string[]
          sort_order?: number
          subheadline_template?: string | null
          tracking_event_name: string
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          created_at?: string
          destination_target?: string
          destination_type?: Database["public"]["Enums"]["cta_destination_type"]
          display_label?: string
          flow_id?: string | null
          flow_variant?: string | null
          headline_template?: string | null
          id?: string
          internal_name?: string
          is_active?: boolean
          organization_id?: string | null
          page_scope?: string[]
          program_scope?: string[]
          sort_order?: number
          subheadline_template?: string | null
          tracking_event_name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cta_config_flow_id_fkey"
            columns: ["flow_id"]
            isOneToOne: false
            referencedRelation: "flows"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cta_config_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          category: string
          client_id: string | null
          created_at: string
          file_name: string
          file_type: string | null
          file_url: string
          id: string
          organization_id: string | null
          status: string
          updated_at: string
          uploaded_by: string
        }
        Insert: {
          category?: string
          client_id?: string | null
          created_at?: string
          file_name: string
          file_type?: string | null
          file_url: string
          id?: string
          organization_id?: string | null
          status?: string
          updated_at?: string
          uploaded_by: string
        }
        Update: {
          category?: string
          client_id?: string | null
          created_at?: string
          file_name?: string
          file_type?: string | null
          file_url?: string
          id?: string
          organization_id?: string | null
          status?: string
          updated_at?: string
          uploaded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_tenant_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      email_templates: {
        Row: {
          body_html: string
          body_text: string
          created_at: string
          id: string
          is_active: boolean
          name: string
          organization_id: string | null
          subject: string
          updated_at: string
          variables: Json
        }
        Insert: {
          body_html?: string
          body_text?: string
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          organization_id?: string | null
          subject: string
          updated_at?: string
          variables?: Json
        }
        Update: {
          body_html?: string
          body_text?: string
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          organization_id?: string | null
          subject?: string
          updated_at?: string
          variables?: Json
        }
        Relationships: [
          {
            foreignKeyName: "email_templates_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      enrollment_agreements: {
        Row: {
          content_snapshot: Json
          created_at: string
          document_id: string
          enrollment_id: string | null
          id: string
          institution_rep_name: string | null
          institution_rep_signed_at: string | null
          ip_address: string | null
          order_id: string | null
          organization_id: string | null
          pdf_url: string | null
          signed_at: string
          student_name: string
          template_id: string | null
          template_version: string
          user_id: string | null
        }
        Insert: {
          content_snapshot?: Json
          created_at?: string
          document_id: string
          enrollment_id?: string | null
          id?: string
          institution_rep_name?: string | null
          institution_rep_signed_at?: string | null
          ip_address?: string | null
          order_id?: string | null
          organization_id?: string | null
          pdf_url?: string | null
          signed_at?: string
          student_name: string
          template_id?: string | null
          template_version?: string
          user_id?: string | null
        }
        Update: {
          content_snapshot?: Json
          created_at?: string
          document_id?: string
          enrollment_id?: string | null
          id?: string
          institution_rep_name?: string | null
          institution_rep_signed_at?: string | null
          ip_address?: string | null
          order_id?: string | null
          organization_id?: string | null
          pdf_url?: string | null
          signed_at?: string
          student_name?: string
          template_id?: string | null
          template_version?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "enrollment_agreements_enrollment_id_fkey"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "enrollments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollment_agreements_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollment_agreements_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "agreement_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      enrollment_applications: {
        Row: {
          accepted_at: string | null
          applied_at: string | null
          cohort_id: string | null
          created_at: string
          email: string
          enrolled_at: string | null
          first_name: string | null
          id: string
          last_name: string | null
          notes: string | null
          organization_id: string | null
          phone: string | null
          program_id: string
          status: string
          updated_at: string
          user_id: string | null
          variation_id: string | null
        }
        Insert: {
          accepted_at?: string | null
          applied_at?: string | null
          cohort_id?: string | null
          created_at?: string
          email: string
          enrolled_at?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          notes?: string | null
          organization_id?: string | null
          phone?: string | null
          program_id: string
          status?: string
          updated_at?: string
          user_id?: string | null
          variation_id?: string | null
        }
        Update: {
          accepted_at?: string | null
          applied_at?: string | null
          cohort_id?: string | null
          created_at?: string
          email?: string
          enrolled_at?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          notes?: string | null
          organization_id?: string | null
          phone?: string | null
          program_id?: string
          status?: string
          updated_at?: string
          user_id?: string | null
          variation_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "enrollment_applications_cohort_id_fkey"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollment_applications_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollment_applications_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollment_applications_variation_id_fkey"
            columns: ["variation_id"]
            isOneToOne: false
            referencedRelation: "program_variations"
            referencedColumns: ["id"]
          },
        ]
      }
      enrollments: {
        Row: {
          actual_end_date: string | null
          amount_paid: number
          certificate_url: string | null
          certification_status: string
          cohort_id: string | null
          created_at: string
          enrollment_date: string
          expected_end_date: string | null
          id: string
          instructor_name: string | null
          notes: string | null
          organization_id: string | null
          payment_status: string
          program_id: string
          progress_pct: number
          reservation_expires_at: string | null
          reservation_extended: boolean | null
          reserved_at: string | null
          status: string
          subscription_expires_at: string | null
          subscription_started_at: string | null
          subscription_type: string | null
          total_tuition: number
          updated_at: string
          user_id: string
          variant_id: string | null
        }
        Insert: {
          actual_end_date?: string | null
          amount_paid?: number
          certificate_url?: string | null
          certification_status?: string
          cohort_id?: string | null
          created_at?: string
          enrollment_date?: string
          expected_end_date?: string | null
          id?: string
          instructor_name?: string | null
          notes?: string | null
          organization_id?: string | null
          payment_status?: string
          program_id: string
          progress_pct?: number
          reservation_expires_at?: string | null
          reservation_extended?: boolean | null
          reserved_at?: string | null
          status?: string
          subscription_expires_at?: string | null
          subscription_started_at?: string | null
          subscription_type?: string | null
          total_tuition?: number
          updated_at?: string
          user_id: string
          variant_id?: string | null
        }
        Update: {
          actual_end_date?: string | null
          amount_paid?: number
          certificate_url?: string | null
          certification_status?: string
          cohort_id?: string | null
          created_at?: string
          enrollment_date?: string
          expected_end_date?: string | null
          id?: string
          instructor_name?: string | null
          notes?: string | null
          organization_id?: string | null
          payment_status?: string
          program_id?: string
          progress_pct?: number
          reservation_expires_at?: string | null
          reservation_extended?: boolean | null
          reserved_at?: string | null
          status?: string
          subscription_expires_at?: string | null
          subscription_started_at?: string | null
          subscription_type?: string | null
          total_tuition?: number
          updated_at?: string
          user_id?: string
          variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_cohort_id_fkey"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "program_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      flow_conditions: {
        Row: {
          action: string
          created_at: string
          flow_id: string
          id: string
          if_step_id: string
          if_value: string
          redirect_url: string | null
          sort_order: number
          target_step_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          flow_id: string
          id?: string
          if_step_id: string
          if_value: string
          redirect_url?: string | null
          sort_order?: number
          target_step_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          flow_id?: string
          id?: string
          if_step_id?: string
          if_value?: string
          redirect_url?: string | null
          sort_order?: number
          target_step_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "flow_conditions_flow_id_fkey"
            columns: ["flow_id"]
            isOneToOne: false
            referencedRelation: "flows"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flow_conditions_if_step_id_fkey"
            columns: ["if_step_id"]
            isOneToOne: false
            referencedRelation: "flow_steps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flow_conditions_target_step_id_fkey"
            columns: ["target_step_id"]
            isOneToOne: false
            referencedRelation: "flow_steps"
            referencedColumns: ["id"]
          },
        ]
      }
      flow_step_options: {
        Row: {
          created_at: string
          disqualifies: boolean
          id: string
          label: string
          sort_order: number
          step_id: string
          value: string
        }
        Insert: {
          created_at?: string
          disqualifies?: boolean
          id?: string
          label: string
          sort_order?: number
          step_id: string
          value: string
        }
        Update: {
          created_at?: string
          disqualifies?: boolean
          id?: string
          label?: string
          sort_order?: number
          step_id?: string
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "flow_step_options_step_id_fkey"
            columns: ["step_id"]
            isOneToOne: false
            referencedRelation: "flow_steps"
            referencedColumns: ["id"]
          },
        ]
      }
      flow_steps: {
        Row: {
          config: Json
          created_at: string
          flow_id: string
          id: string
          is_required: boolean
          step_order: number
          step_type: string
          subtitle: string | null
          title: string
        }
        Insert: {
          config?: Json
          created_at?: string
          flow_id: string
          id?: string
          is_required?: boolean
          step_order: number
          step_type: string
          subtitle?: string | null
          title: string
        }
        Update: {
          config?: Json
          created_at?: string
          flow_id?: string
          id?: string
          is_required?: boolean
          step_order?: number
          step_type?: string
          subtitle?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "flow_steps_flow_id_fkey"
            columns: ["flow_id"]
            isOneToOne: false
            referencedRelation: "flows"
            referencedColumns: ["id"]
          },
        ]
      }
      flows: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          is_default: boolean
          is_template: boolean
          name: string
          organization_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          is_default?: boolean
          is_template?: boolean
          name: string
          organization_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          is_default?: boolean
          is_template?: boolean
          name?: string
          organization_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "flows_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      funnel_errors: {
        Row: {
          calendar_id: string | null
          created_at: string
          details: Json | null
          error_type: string
          filtered_count: number | null
          id: string
          program_code: string | null
          program_id: string | null
          schedule_filter: string | null
          slot_count: number | null
          start_date_count: number | null
          user_agent: string | null
        }
        Insert: {
          calendar_id?: string | null
          created_at?: string
          details?: Json | null
          error_type: string
          filtered_count?: number | null
          id?: string
          program_code?: string | null
          program_id?: string | null
          schedule_filter?: string | null
          slot_count?: number | null
          start_date_count?: number | null
          user_agent?: string | null
        }
        Update: {
          calendar_id?: string | null
          created_at?: string
          details?: Json | null
          error_type?: string
          filtered_count?: number | null
          id?: string
          program_code?: string | null
          program_id?: string | null
          schedule_filter?: string | null
          slot_count?: number | null
          start_date_count?: number | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "funnel_errors_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      generated_cohorts: {
        Row: {
          committed_cohort_id: string | null
          created_at: string
          end_date: string
          generation_run_id: string | null
          id: string
          organization_id: string
          pattern_id: string
          program_id: string
          rotation_index: number
          scheduled_hours: number
          start_date: string
          status: string
          time_block_end: string
          time_block_start: string
          updated_at: string
        }
        Insert: {
          committed_cohort_id?: string | null
          created_at?: string
          end_date: string
          generation_run_id?: string | null
          id?: string
          organization_id: string
          pattern_id: string
          program_id: string
          rotation_index?: number
          scheduled_hours: number
          start_date: string
          status?: string
          time_block_end: string
          time_block_start: string
          updated_at?: string
        }
        Update: {
          committed_cohort_id?: string | null
          created_at?: string
          end_date?: string
          generation_run_id?: string | null
          id?: string
          organization_id?: string
          pattern_id?: string
          program_id?: string
          rotation_index?: number
          scheduled_hours?: number
          start_date?: string
          status?: string
          time_block_end?: string
          time_block_start?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "generated_cohorts_committed_cohort_id_fkey"
            columns: ["committed_cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "generated_cohorts_generation_run_id_fkey"
            columns: ["generation_run_id"]
            isOneToOne: false
            referencedRelation: "generation_runs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "generated_cohorts_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "generated_cohorts_pattern_id_fkey"
            columns: ["pattern_id"]
            isOneToOne: false
            referencedRelation: "schedule_patterns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "generated_cohorts_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      generation_runs: {
        Row: {
          cohorts_generated: number
          horizon_date: string
          id: string
          input_hash: string
          organization_id: string
          output_hash: string
          pattern_id: string | null
          ran_at: string
          triggered_by: string
        }
        Insert: {
          cohorts_generated?: number
          horizon_date: string
          id?: string
          input_hash: string
          organization_id: string
          output_hash: string
          pattern_id?: string | null
          ran_at?: string
          triggered_by?: string
        }
        Update: {
          cohorts_generated?: number
          horizon_date?: string
          id?: string
          input_hash?: string
          organization_id?: string
          output_hash?: string
          pattern_id?: string | null
          ran_at?: string
          triggered_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_generation_runs_pattern"
            columns: ["pattern_id"]
            isOneToOne: false
            referencedRelation: "schedule_patterns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "generation_runs_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      ghl_calendar_mappings: {
        Row: {
          active: boolean
          cohort_start_days: number[] | null
          created_at: string
          ghl_calendar_id: string
          ghl_calendar_name: string | null
          id: string
          label: string | null
          program_id: string
          schedule_slot: string | null
          updated_at: string
          variation: string | null
        }
        Insert: {
          active?: boolean
          cohort_start_days?: number[] | null
          created_at?: string
          ghl_calendar_id: string
          ghl_calendar_name?: string | null
          id?: string
          label?: string | null
          program_id: string
          schedule_slot?: string | null
          updated_at?: string
          variation?: string | null
        }
        Update: {
          active?: boolean
          cohort_start_days?: number[] | null
          created_at?: string
          ghl_calendar_id?: string
          ghl_calendar_name?: string | null
          id?: string
          label?: string | null
          program_id?: string
          schedule_slot?: string | null
          updated_at?: string
          variation?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ghl_calendar_mappings_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      ghl_connections: {
        Row: {
          access_token: string | null
          connected_at: string | null
          created_at: string
          id: string
          location_id: string | null
          organization_id: string
          refresh_token: string | null
          status: string
          updated_at: string
        }
        Insert: {
          access_token?: string | null
          connected_at?: string | null
          created_at?: string
          id?: string
          location_id?: string | null
          organization_id: string
          refresh_token?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          access_token?: string | null
          connected_at?: string | null
          created_at?: string
          id?: string
          location_id?: string | null
          organization_id?: string
          refresh_token?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ghl_connections_tenant_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      holiday_calendars: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          organization_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          organization_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          organization_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "holiday_calendars_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      holidays: {
        Row: {
          created_at: string
          date: string
          id: string
          name: string
          organization_id: string | null
          recurring: boolean
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          name: string
          organization_id?: string | null
          recurring?: boolean
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          name?: string
          organization_id?: string | null
          recurring?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "holidays_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      instructor_assignments: {
        Row: {
          cohort_id: string | null
          created_at: string
          id: string
          program_id: string
          user_id: string
        }
        Insert: {
          cohort_id?: string | null
          created_at?: string
          id?: string
          program_id: string
          user_id: string
        }
        Update: {
          cohort_id?: string | null
          created_at?: string
          id?: string
          program_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "instructor_assignments_cohort_id_fkey"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "instructor_assignments_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      integration_credentials: {
        Row: {
          api_key_secret_id: string | null
          integration_id: string
          oauth_access_token_secret_id: string | null
          oauth_expires_at: string | null
          oauth_refresh_token_secret_id: string | null
          updated_at: string
        }
        Insert: {
          api_key_secret_id?: string | null
          integration_id: string
          oauth_access_token_secret_id?: string | null
          oauth_expires_at?: string | null
          oauth_refresh_token_secret_id?: string | null
          updated_at?: string
        }
        Update: {
          api_key_secret_id?: string | null
          integration_id?: string
          oauth_access_token_secret_id?: string | null
          oauth_expires_at?: string | null
          oauth_refresh_token_secret_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "integration_credentials_integration_id_fkey"
            columns: ["integration_id"]
            isOneToOne: true
            referencedRelation: "integrations"
            referencedColumns: ["id"]
          },
        ]
      }
      integration_field_mappings: {
        Row: {
          created_at: string
          external_field_id: string
          external_field_name: string | null
          field_kind: string
          ghi_field: string
          integration_id: string
        }
        Insert: {
          created_at?: string
          external_field_id: string
          external_field_name?: string | null
          field_kind?: string
          ghi_field: string
          integration_id: string
        }
        Update: {
          created_at?: string
          external_field_id?: string
          external_field_name?: string | null
          field_kind?: string
          ghi_field?: string
          integration_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "integration_field_mappings_integration_id_fkey"
            columns: ["integration_id"]
            isOneToOne: false
            referencedRelation: "integrations"
            referencedColumns: ["id"]
          },
        ]
      }
      integrations: {
        Row: {
          base_url: string | null
          created_at: string
          enabled: boolean
          id: string
          inbound_webhook_secret: string
          location_id: string | null
          name: string | null
          organization_id: string | null
          provider: string
          updated_at: string
        }
        Insert: {
          base_url?: string | null
          created_at?: string
          enabled?: boolean
          id?: string
          inbound_webhook_secret: string
          location_id?: string | null
          name?: string | null
          organization_id?: string | null
          provider: string
          updated_at?: string
        }
        Update: {
          base_url?: string | null
          created_at?: string
          enabled?: boolean
          id?: string
          inbound_webhook_secret?: string
          location_id?: string | null
          name?: string | null
          organization_id?: string | null
          provider?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "integrations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_applications: {
        Row: {
          appointment_booked_at: string | null
          appointment_id: string | null
          created_at: string
          enrollment_completed_at: string | null
          enrollment_started_at: string | null
          entry_cta_id: string | null
          entry_cta_label: string | null
          entry_cta_name: string | null
          entry_flow_variant: string | null
          entry_page_type: string | null
          entry_page_url: string | null
          entry_program: string | null
          entry_timestamp: string | null
          flow_id: string | null
          id: string
          notes: string | null
          organization_id: string | null
          portal_created_at: string | null
          preview_booked_at: string | null
          program_id: string | null
          referral_code: string | null
          referral_id: string | null
          referrer: string | null
          source: string | null
          status: string
          updated_at: string
          user_id: string
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          appointment_booked_at?: string | null
          appointment_id?: string | null
          created_at?: string
          enrollment_completed_at?: string | null
          enrollment_started_at?: string | null
          entry_cta_id?: string | null
          entry_cta_label?: string | null
          entry_cta_name?: string | null
          entry_flow_variant?: string | null
          entry_page_type?: string | null
          entry_page_url?: string | null
          entry_program?: string | null
          entry_timestamp?: string | null
          flow_id?: string | null
          id?: string
          notes?: string | null
          organization_id?: string | null
          portal_created_at?: string | null
          preview_booked_at?: string | null
          program_id?: string | null
          referral_code?: string | null
          referral_id?: string | null
          referrer?: string | null
          source?: string | null
          status?: string
          updated_at?: string
          user_id: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          appointment_booked_at?: string | null
          appointment_id?: string | null
          created_at?: string
          enrollment_completed_at?: string | null
          enrollment_started_at?: string | null
          entry_cta_id?: string | null
          entry_cta_label?: string | null
          entry_cta_name?: string | null
          entry_flow_variant?: string | null
          entry_page_type?: string | null
          entry_page_url?: string | null
          entry_program?: string | null
          entry_timestamp?: string | null
          flow_id?: string | null
          id?: string
          notes?: string | null
          organization_id?: string | null
          portal_created_at?: string | null
          preview_booked_at?: string | null
          program_id?: string | null
          referral_code?: string | null
          referral_id?: string | null
          referrer?: string | null
          source?: string | null
          status?: string
          updated_at?: string
          user_id?: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_applications_entry_cta_id_fkey"
            columns: ["entry_cta_id"]
            isOneToOne: false
            referencedRelation: "cta_config"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_applications_flow_id_fkey"
            columns: ["flow_id"]
            isOneToOne: false
            referencedRelation: "flows"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_applications_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_applications_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_applications_referral_code_fkey"
            columns: ["referral_code"]
            isOneToOne: false
            referencedRelation: "referral_codes"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "lead_applications_referral_id_fkey"
            columns: ["referral_id"]
            isOneToOne: false
            referencedRelation: "referrals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_applications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          phone: string
          program: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          phone: string
          program: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          phone?: string
          program?: string
        }
        Relationships: []
      }
      lesson_progress: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          lesson_id: string
          quiz_score: number | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          lesson_id: string
          quiz_score?: number | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          lesson_id?: string
          quiz_score?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lesson_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          content_body: string | null
          content_url: string | null
          created_at: string
          duration_minutes: number | null
          id: string
          quiz_template_id: string | null
          section_id: string
          sequence_order: number
          status: string
          title: string
          type: string
        }
        Insert: {
          content_body?: string | null
          content_url?: string | null
          created_at?: string
          duration_minutes?: number | null
          id?: string
          quiz_template_id?: string | null
          section_id: string
          sequence_order?: number
          status?: string
          title: string
          type?: string
        }
        Update: {
          content_body?: string | null
          content_url?: string | null
          created_at?: string
          duration_minutes?: number | null
          id?: string
          quiz_template_id?: string | null
          section_id?: string
          sequence_order?: number
          status?: string
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "lessons_quiz_template_id_fkey"
            columns: ["quiz_template_id"]
            isOneToOne: false
            referencedRelation: "quiz_templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lessons_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "course_sections"
            referencedColumns: ["id"]
          },
        ]
      }
      meetings: {
        Row: {
          appointment_id: string | null
          created_at: string
          ended_at: string | null
          host_id: string
          id: string
          meeting_url: string | null
          organization_id: string | null
          started_at: string | null
          status: string
          updated_at: string
        }
        Insert: {
          appointment_id?: string | null
          created_at?: string
          ended_at?: string | null
          host_id: string
          id?: string
          meeting_url?: string | null
          organization_id?: string | null
          started_at?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          appointment_id?: string | null
          created_at?: string
          ended_at?: string | null
          host_id?: string
          id?: string
          meeting_url?: string | null
          organization_id?: string | null
          started_at?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "meetings_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meetings_tenant_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      memberships: {
        Row: {
          created_at: string
          id: string
          organization_id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          organization_id: string
          role?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          organization_id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tenant_members_tenant_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      message_reactions: {
        Row: {
          created_at: string
          emoji: string
          id: string
          message_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          emoji: string
          id?: string
          message_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          emoji?: string
          id?: string
          message_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_reactions_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "community_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          organization_id: string | null
          read: boolean
          recipient_id: string
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          organization_id?: string | null
          read?: boolean
          recipient_id: string
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          organization_id?: string | null
          read?: boolean
          recipient_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_tenant_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_preferences: {
        Row: {
          announcement_notifications: boolean
          call_notifications: boolean
          dm_notifications: boolean
          email_notifications: boolean
          feed_notifications: boolean
          space_notifications: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          announcement_notifications?: boolean
          call_notifications?: boolean
          dm_notifications?: boolean
          email_notifications?: boolean
          feed_notifications?: boolean
          space_notifications?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          announcement_notifications?: boolean
          call_notifications?: boolean
          dm_notifications?: boolean
          email_notifications?: boolean
          feed_notifications?: boolean
          space_notifications?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      onboarding_steps: {
        Row: {
          completed: boolean
          completed_at: string | null
          created_at: string
          enrollment_id: string
          id: string
          step_key: string
          step_label: string
        }
        Insert: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          enrollment_id: string
          id?: string
          step_key: string
          step_label: string
        }
        Update: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          enrollment_id?: string
          id?: string
          step_key?: string
          step_label?: string
        }
        Relationships: [
          {
            foreignKeyName: "onboarding_steps_enrollment_id_fkey"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "enrollments"
            referencedColumns: ["id"]
          },
        ]
      }
      order_customers: {
        Row: {
          address: string | null
          city: string | null
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          order_id: string
          phone: string
          state: string | null
          zip: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          order_id: string
          phone: string
          state?: string | null
          zip?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          order_id?: string
          phone?: string
          state?: string | null
          zip?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_customers_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          cohort_id: string | null
          created_at: string
          deposit_paid: number
          id: string
          order_status: string
          payment_option: string
          payment_status: string
          program_id: string
          reservation_expires_at: string | null
          reserved_at: string | null
          salesflow_synced: boolean
          start_date_pending: boolean
          total_amount: number
          updated_at: string
          variant_id: string | null
        }
        Insert: {
          cohort_id?: string | null
          created_at?: string
          deposit_paid?: number
          id?: string
          order_status?: string
          payment_option?: string
          payment_status?: string
          program_id: string
          reservation_expires_at?: string | null
          reserved_at?: string | null
          salesflow_synced?: boolean
          start_date_pending?: boolean
          total_amount?: number
          updated_at?: string
          variant_id?: string | null
        }
        Update: {
          cohort_id?: string | null
          created_at?: string
          deposit_paid?: number
          id?: string
          order_status?: string
          payment_option?: string
          payment_status?: string
          program_id?: string
          reservation_expires_at?: string | null
          reserved_at?: string | null
          salesflow_synced?: boolean
          start_date_pending?: boolean
          total_amount?: number
          updated_at?: string
          variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_cohort_id_fkey"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "program_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_invites: {
        Row: {
          accepted_at: string | null
          created_at: string
          email: string
          id: string
          invited_by: string
          organization_id: string
          role: string
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string
          email: string
          id?: string
          invited_by: string
          organization_id: string
          role?: string
        }
        Update: {
          accepted_at?: string | null
          created_at?: string
          email?: string
          id?: string
          invited_by?: string
          organization_id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_invites_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string | null
          id: string
          logo_url: string | null
          max_clients: number
          name: string
          oneid_org_id: string | null
          owner_id: string | null
          platform_flags: Json | null
          primary_color: string | null
          school_name: string | null
          slug: string | null
          status: string
          subscription_tier: string
          support_email: string | null
          timezone: string
          updated_at: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          logo_url?: string | null
          max_clients?: number
          name: string
          oneid_org_id?: string | null
          owner_id?: string | null
          platform_flags?: Json | null
          primary_color?: string | null
          school_name?: string | null
          slug?: string | null
          status?: string
          subscription_tier?: string
          support_email?: string | null
          timezone?: string
          updated_at?: string
        }
        Update: {
          created_at?: string | null
          id?: string
          logo_url?: string | null
          max_clients?: number
          name?: string
          oneid_org_id?: string | null
          owner_id?: string | null
          platform_flags?: Json | null
          primary_color?: string | null
          school_name?: string | null
          slug?: string | null
          status?: string
          subscription_tier?: string
          support_email?: string | null
          timezone?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "organizations_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      outbound_webhook_logs: {
        Row: {
          attempt_count: number
          created_at: string
          id: string
          last_attempt_at: string | null
          order_id: string
          payload_json: Json | null
          status: string
          webhook_type: string
        }
        Insert: {
          attempt_count?: number
          created_at?: string
          id?: string
          last_attempt_at?: string | null
          order_id: string
          payload_json?: Json | null
          status?: string
          webhook_type?: string
        }
        Update: {
          attempt_count?: number
          created_at?: string
          id?: string
          last_attempt_at?: string | null
          order_id?: string
          payload_json?: Json | null
          status?: string
          webhook_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "outbound_webhook_logs_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_logs: {
        Row: {
          amount: number
          created_at: string
          id: string
          order_id: string
          provider: string
          provider_transaction_id: string | null
          raw_response_json: Json | null
          status: string
        }
        Insert: {
          amount?: number
          created_at?: string
          id?: string
          order_id: string
          provider?: string
          provider_transaction_id?: string | null
          raw_response_json?: Json | null
          status?: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          order_id?: string
          provider?: string
          provider_transaction_id?: string | null
          raw_response_json?: Json | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_logs_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_plan_installments: {
        Row: {
          amount: number
          created_at: string
          due_date: string
          enrollment_id: string | null
          failure_reason: string | null
          id: string
          installment_number: number
          order_id: string
          paid_at: string | null
          square_payment_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          amount?: number
          created_at?: string
          due_date: string
          enrollment_id?: string | null
          failure_reason?: string | null
          id?: string
          installment_number: number
          order_id: string
          paid_at?: string | null
          square_payment_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          due_date?: string
          enrollment_id?: string | null
          failure_reason?: string | null
          id?: string
          installment_number?: number
          order_id?: string
          paid_at?: string | null
          square_payment_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_plan_installments_enrollment_id_fkey"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "enrollments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_plan_installments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_plan_templates: {
        Row: {
          active: boolean
          badge: string | null
          created_at: string
          id: string
          installments: Json
          name: string | null
          num_payments: number
          total_amount: number
          variant_id: string
        }
        Insert: {
          active?: boolean
          badge?: string | null
          created_at?: string
          id?: string
          installments?: Json
          name?: string | null
          num_payments: number
          total_amount?: number
          variant_id: string
        }
        Update: {
          active?: boolean
          badge?: string | null
          created_at?: string
          id?: string
          installments?: Json
          name?: string | null
          num_payments?: number
          total_amount?: number
          variant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_plan_templates_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "program_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      payout_settings: {
        Row: {
          created_at: string
          display_name: string | null
          handle: string | null
          id: string
          is_default: boolean
          method: string
          organization_id: string | null
          updated_at: string
          user_id: string
          verified: boolean
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          handle?: string | null
          id?: string
          is_default?: boolean
          method: string
          organization_id?: string | null
          updated_at?: string
          user_id: string
          verified?: boolean
        }
        Update: {
          created_at?: string
          display_name?: string | null
          handle?: string | null
          id?: string
          is_default?: boolean
          method?: string
          organization_id?: string | null
          updated_at?: string
          user_id?: string
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "payout_settings_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payout_settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          arc_level: number
          avatar_url: string | null
          bio: string | null
          city: string | null
          created_at: string
          display_name: string | null
          email: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          external_contact_ids: Json
          first_name: string | null
          handle: string | null
          id: string
          is_active: boolean
          is_searchable: boolean
          last_activity_at: string
          last_name: string | null
          oneaccess_email: string | null
          oneaccess_tier: string
          oneid_subject: string | null
          phone: string | null
          platform_flags: Json | null
          sc_balance: number
          square_customer_id: string | null
          state: string | null
          tier_expires_at: string | null
          updated_at: string
          user_id: string
          user_status: Database["public"]["Enums"]["user_lifecycle_status"]
          username: string | null
          zip: string | null
        }
        Insert: {
          address?: string | null
          arc_level?: number
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          external_contact_ids?: Json
          first_name?: string | null
          handle?: string | null
          id?: string
          is_active?: boolean
          is_searchable?: boolean
          last_activity_at?: string
          last_name?: string | null
          oneaccess_email?: string | null
          oneaccess_tier?: string
          oneid_subject?: string | null
          phone?: string | null
          platform_flags?: Json | null
          sc_balance?: number
          square_customer_id?: string | null
          state?: string | null
          tier_expires_at?: string | null
          updated_at?: string
          user_id: string
          user_status?: Database["public"]["Enums"]["user_lifecycle_status"]
          username?: string | null
          zip?: string | null
        }
        Update: {
          address?: string | null
          arc_level?: number
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          external_contact_ids?: Json
          first_name?: string | null
          handle?: string | null
          id?: string
          is_active?: boolean
          is_searchable?: boolean
          last_activity_at?: string
          last_name?: string | null
          oneaccess_email?: string | null
          oneaccess_tier?: string
          oneid_subject?: string | null
          phone?: string | null
          platform_flags?: Json | null
          sc_balance?: number
          square_customer_id?: string | null
          state?: string | null
          tier_expires_at?: string | null
          updated_at?: string
          user_id?: string
          user_status?: Database["public"]["Enums"]["user_lifecycle_status"]
          username?: string | null
          zip?: string | null
        }
        Relationships: []
      }
      program_agreements: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean
          organization_id: string | null
          program_id: string | null
          template_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean
          organization_id?: string | null
          program_id?: string | null
          template_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean
          organization_id?: string | null
          program_id?: string | null
          template_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "program_agreements_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "program_agreements_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: true
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "program_agreements_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "agreement_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      program_bundles: {
        Row: {
          active: boolean
          bundled_program_id: string
          created_at: string
          id: string
          source_program_id: string
        }
        Insert: {
          active?: boolean
          bundled_program_id: string
          created_at?: string
          id?: string
          source_program_id: string
        }
        Update: {
          active?: boolean
          bundled_program_id?: string
          created_at?: string
          id?: string
          source_program_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "program_bundles_bundled_program_id_fkey"
            columns: ["bundled_program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "program_bundles_source_program_id_fkey"
            columns: ["source_program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      program_curriculum_modules: {
        Row: {
          course_code: string
          created_at: string
          id: string
          lab_hours: number
          name: string
          program_id: string
          sequence_order: number
          theory_hours: number
          updated_at: string
        }
        Insert: {
          course_code: string
          created_at?: string
          id?: string
          lab_hours?: number
          name: string
          program_id: string
          sequence_order?: number
          theory_hours?: number
          updated_at?: string
        }
        Update: {
          course_code?: string
          created_at?: string
          id?: string
          lab_hours?: number
          name?: string
          program_id?: string
          sequence_order?: number
          theory_hours?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "program_curriculum_modules_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      program_line_items: {
        Row: {
          amount: number
          created_at: string
          id: string
          label: string
          program_id: string
          sort_order: number
        }
        Insert: {
          amount?: number
          created_at?: string
          id?: string
          label: string
          program_id: string
          sort_order?: number
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          label?: string
          program_id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "program_line_items_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      program_schedules: {
        Row: {
          active: boolean
          class_days: number[]
          created_at: string
          filter_type: string
          filter_value: string
          hours_per_day: number
          id: string
          label: string
          program_id: string
          sort_order: number
        }
        Insert: {
          active?: boolean
          class_days?: number[]
          created_at?: string
          filter_type?: string
          filter_value: string
          hours_per_day?: number
          id?: string
          label: string
          program_id: string
          sort_order?: number
        }
        Update: {
          active?: boolean
          class_days?: number[]
          created_at?: string
          filter_type?: string
          filter_value?: string
          hours_per_day?: number
          id?: string
          label?: string
          program_id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "program_schedules_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      program_scheduling_rules: {
        Row: {
          allow_reschedule: boolean
          auto_assign_consecutive: boolean
          created_at: string
          id: string
          max_reschedules_per_pass: number
          program_id: string
          require_exam_for_reserve: boolean
          reserve_count: number
          updated_at: string
        }
        Insert: {
          allow_reschedule?: boolean
          auto_assign_consecutive?: boolean
          created_at?: string
          id?: string
          max_reschedules_per_pass?: number
          program_id: string
          require_exam_for_reserve?: boolean
          reserve_count?: number
          updated_at?: string
        }
        Update: {
          allow_reschedule?: boolean
          auto_assign_consecutive?: boolean
          created_at?: string
          id?: string
          max_reschedules_per_pass?: number
          program_id?: string
          require_exam_for_reserve?: boolean
          reserve_count?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "program_scheduling_rules_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: true
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      program_variants: {
        Row: {
          active: boolean | null
          created_at: string
          deposit_amount: number
          duration_label: string | null
          excluded_features: Json | null
          features: Json | null
          id: string
          name: string
          popular: boolean | null
          practice_weeks: number
          price: number
          program_id: string
          sort_order: number | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string
          deposit_amount?: number
          duration_label?: string | null
          excluded_features?: Json | null
          features?: Json | null
          id?: string
          name: string
          popular?: boolean | null
          practice_weeks?: number
          price?: number
          program_id: string
          sort_order?: number | null
        }
        Update: {
          active?: boolean | null
          created_at?: string
          deposit_amount?: number
          duration_label?: string | null
          excluded_features?: Json | null
          features?: Json | null
          id?: string
          name?: string
          popular?: boolean | null
          practice_weeks?: number
          price?: number
          program_id?: string
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "program_variants_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      program_variations: {
        Row: {
          calendar_integration_id: string | null
          calendar_integration_id_secondary: string | null
          created_at: string
          id: string
          is_language_variant: boolean
          language: string
          name: string
          organization_id: string | null
          program_id: string
          sort_order: number
          updated_at: string
          variation_toggle_enabled: boolean
        }
        Insert: {
          calendar_integration_id?: string | null
          calendar_integration_id_secondary?: string | null
          created_at?: string
          id?: string
          is_language_variant?: boolean
          language?: string
          name: string
          organization_id?: string | null
          program_id: string
          sort_order?: number
          updated_at?: string
          variation_toggle_enabled?: boolean
        }
        Update: {
          calendar_integration_id?: string | null
          calendar_integration_id_secondary?: string | null
          created_at?: string
          id?: string
          is_language_variant?: boolean
          language?: string
          name?: string
          organization_id?: string | null
          program_id?: string
          sort_order?: number
          updated_at?: string
          variation_toggle_enabled?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "program_variations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "program_variations_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      programs: {
        Row: {
          active: boolean
          base_price: number
          category: string
          created_at: string
          curriculum: Json
          deposit_amount: number
          description: string | null
          id: string
          language_variations_enabled: boolean
          late_registration_days: number
          learning_mode: Database["public"]["Enums"]["learning_mode"]
          name: string
          organization_id: string | null
          payment_plan_enabled: boolean
          program_code: string
          total_hours: number
          updated_at: string
        }
        Insert: {
          active?: boolean
          base_price?: number
          category?: string
          created_at?: string
          curriculum?: Json
          deposit_amount?: number
          description?: string | null
          id?: string
          language_variations_enabled?: boolean
          late_registration_days?: number
          learning_mode?: Database["public"]["Enums"]["learning_mode"]
          name: string
          organization_id?: string | null
          payment_plan_enabled?: boolean
          program_code: string
          total_hours?: number
          updated_at?: string
        }
        Update: {
          active?: boolean
          base_price?: number
          category?: string
          created_at?: string
          curriculum?: Json
          deposit_amount?: number
          description?: string | null
          id?: string
          language_variations_enabled?: boolean
          late_registration_days?: number
          learning_mode?: Database["public"]["Enums"]["learning_mode"]
          name?: string
          organization_id?: string | null
          payment_plan_enabled?: boolean
          program_code?: string
          total_hours?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "programs_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      puppy_waitlist: {
        Row: {
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          message: string | null
          phone: string | null
          preferred_sex: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          message?: string | null
          phone?: string | null
          preferred_sex?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          message?: string | null
          phone?: string | null
          preferred_sex?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      question_audit_log: {
        Row: {
          audit_type: string
          auto_fixed: boolean
          created_at: string
          error_description: string | null
          field_affected: string | null
          id: string
          new_value: string | null
          organization_id: string | null
          original_value: string | null
          question_id: string
          requires_review: boolean
        }
        Insert: {
          audit_type: string
          auto_fixed?: boolean
          created_at?: string
          error_description?: string | null
          field_affected?: string | null
          id?: string
          new_value?: string | null
          organization_id?: string | null
          original_value?: string | null
          question_id: string
          requires_review?: boolean
        }
        Update: {
          audit_type?: string
          auto_fixed?: boolean
          created_at?: string
          error_description?: string | null
          field_affected?: string | null
          id?: string
          new_value?: string | null
          organization_id?: string | null
          original_value?: string | null
          question_id?: string
          requires_review?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "question_audit_log_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "question_audit_log_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      questions: {
        Row: {
          ai_confidence_score: number | null
          audit_notes: string | null
          audit_status: string
          avg_score: number | null
          bank_only: boolean
          category: string
          correct_answer: string
          created_at: string
          difficulty: string
          discrimination_index: number | null
          duplicate_of: string | null
          explanation: string | null
          failure_rate: number | null
          id: string
          last_audited_at: string | null
          lesson_id: string | null
          options: Json
          organization_id: string | null
          program_id: string | null
          question_text: string
          source: string
          source_reference: string | null
          status: string
          updated_at: string
          usage_count: number
          wrong_answer_explanations: Json | null
        }
        Insert: {
          ai_confidence_score?: number | null
          audit_notes?: string | null
          audit_status?: string
          avg_score?: number | null
          bank_only?: boolean
          category: string
          correct_answer: string
          created_at?: string
          difficulty?: string
          discrimination_index?: number | null
          duplicate_of?: string | null
          explanation?: string | null
          failure_rate?: number | null
          id?: string
          last_audited_at?: string | null
          lesson_id?: string | null
          options: Json
          organization_id?: string | null
          program_id?: string | null
          question_text: string
          source?: string
          source_reference?: string | null
          status?: string
          updated_at?: string
          usage_count?: number
          wrong_answer_explanations?: Json | null
        }
        Update: {
          ai_confidence_score?: number | null
          audit_notes?: string | null
          audit_status?: string
          avg_score?: number | null
          bank_only?: boolean
          category?: string
          correct_answer?: string
          created_at?: string
          difficulty?: string
          discrimination_index?: number | null
          duplicate_of?: string | null
          explanation?: string | null
          failure_rate?: number | null
          id?: string
          last_audited_at?: string | null
          lesson_id?: string | null
          options?: Json
          organization_id?: string | null
          program_id?: string | null
          question_text?: string
          source?: string
          source_reference?: string | null
          status?: string
          updated_at?: string
          usage_count?: number
          wrong_answer_explanations?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "questions_duplicate_of_fkey"
            columns: ["duplicate_of"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "questions_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "questions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "questions_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_attempts: {
        Row: {
          adaptive_mode: boolean
          ai_prompt_used: string | null
          auto_submitted: boolean
          completed_at: string | null
          correct_count: number
          created_at: string
          difficulty: string | null
          id: string
          lesson_id: string | null
          mode: string
          organization_id: string | null
          score: number | null
          started_at: string
          status: string
          template_id: string | null
          time_limit_seconds: number | null
          time_spent_seconds: number | null
          topic: string | null
          total_questions: number
          user_id: string
          warning_shown_at: string | null
        }
        Insert: {
          adaptive_mode?: boolean
          ai_prompt_used?: string | null
          auto_submitted?: boolean
          completed_at?: string | null
          correct_count?: number
          created_at?: string
          difficulty?: string | null
          id?: string
          lesson_id?: string | null
          mode?: string
          organization_id?: string | null
          score?: number | null
          started_at?: string
          status?: string
          template_id?: string | null
          time_limit_seconds?: number | null
          time_spent_seconds?: number | null
          topic?: string | null
          total_questions?: number
          user_id: string
          warning_shown_at?: string | null
        }
        Update: {
          adaptive_mode?: boolean
          ai_prompt_used?: string | null
          auto_submitted?: boolean
          completed_at?: string | null
          correct_count?: number
          created_at?: string
          difficulty?: string | null
          id?: string
          lesson_id?: string | null
          mode?: string
          organization_id?: string | null
          score?: number | null
          started_at?: string
          status?: string
          template_id?: string | null
          time_limit_seconds?: number | null
          time_spent_seconds?: number | null
          topic?: string | null
          total_questions?: number
          user_id?: string
          warning_shown_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_attempts_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_attempts_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_attempts_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "quiz_templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_attempts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_question_assignments: {
        Row: {
          created_at: string
          id: string
          question_id: string
          quiz_template_id: string
          sequence_order: number
        }
        Insert: {
          created_at?: string
          id?: string
          question_id: string
          quiz_template_id: string
          sequence_order?: number
        }
        Update: {
          created_at?: string
          id?: string
          question_id?: string
          quiz_template_id?: string
          sequence_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "quiz_question_assignments_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_question_assignments_quiz_template_id_fkey"
            columns: ["quiz_template_id"]
            isOneToOne: false
            referencedRelation: "quiz_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_questions: {
        Row: {
          correct_answer: string
          id: string
          options: Json | null
          question: string
          quiz_id: string
          sequence_order: number
          type: string
        }
        Insert: {
          correct_answer: string
          id?: string
          options?: Json | null
          question: string
          quiz_id: string
          sequence_order?: number
          type?: string
        }
        Update: {
          correct_answer?: string
          id?: string
          options?: Json | null
          question?: string
          quiz_id?: string
          sequence_order?: number
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_questions_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_templates: {
        Row: {
          configuration: Json
          created_at: string
          description: string | null
          id: string
          mode: string
          organization_id: string | null
          passing_score: number
          program_id: string | null
          quiz_type: string
          randomize_options: boolean
          randomize_questions: boolean
          status: string
          time_limit_minutes: number | null
          title: string
        }
        Insert: {
          configuration?: Json
          created_at?: string
          description?: string | null
          id?: string
          mode?: string
          organization_id?: string | null
          passing_score?: number
          program_id?: string | null
          quiz_type?: string
          randomize_options?: boolean
          randomize_questions?: boolean
          status?: string
          time_limit_minutes?: number | null
          title: string
        }
        Update: {
          configuration?: Json
          created_at?: string
          description?: string | null
          id?: string
          mode?: string
          organization_id?: string | null
          passing_score?: number
          program_id?: string | null
          quiz_type?: string
          randomize_options?: boolean
          randomize_questions?: boolean
          status?: string
          time_limit_minutes?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_templates_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_templates_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      quizzes: {
        Row: {
          created_at: string
          id: string
          lesson_id: string
          passing_score: number
        }
        Insert: {
          created_at?: string
          id?: string
          lesson_id: string
          passing_score?: number
        }
        Update: {
          created_at?: string
          id?: string
          lesson_id?: string
          passing_score?: number
        }
        Relationships: [
          {
            foreignKeyName: "quizzes_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      reconciliation_log: {
        Row: {
          cohorts_checked: number | null
          cohorts_updated: number | null
          errors: Json | null
          id: string
          ran_at: string | null
        }
        Insert: {
          cohorts_checked?: number | null
          cohorts_updated?: number | null
          errors?: Json | null
          id?: string
          ran_at?: string | null
        }
        Update: {
          cohorts_checked?: number | null
          cohorts_updated?: number | null
          errors?: Json | null
          id?: string
          ran_at?: string | null
        }
        Relationships: []
      }
      referral_codes: {
        Row: {
          code: string
          created_at: string
          id: string
          is_active: boolean
          organization_id: string | null
          total_clicks: number
          total_earned_cents: number
          total_qualified: number
          total_referrals: number
          user_id: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          is_active?: boolean
          organization_id?: string | null
          total_clicks?: number
          total_earned_cents?: number
          total_qualified?: number
          total_referrals?: number
          user_id: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          is_active?: boolean
          organization_id?: string | null
          total_clicks?: number
          total_earned_cents?: number
          total_qualified?: number
          total_referrals?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "referral_codes_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referral_codes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      referral_submissions: {
        Row: {
          created_at: string
          id: string
          organization_id: string | null
          referral_code: string | null
          referred_email: string
          referred_first_name: string
          referred_last_name: string
          referred_phone: string | null
          referred_profile_id: string | null
          referred_program_interest: string | null
          referrer_email: string | null
          referrer_name: string | null
          referrer_profile_id: string | null
          status: string
          updated_at: string
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
          webhook_response_code: number | null
          webhook_sent: boolean
          webhook_sent_at: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          organization_id?: string | null
          referral_code?: string | null
          referred_email: string
          referred_first_name: string
          referred_last_name: string
          referred_phone?: string | null
          referred_profile_id?: string | null
          referred_program_interest?: string | null
          referrer_email?: string | null
          referrer_name?: string | null
          referrer_profile_id?: string | null
          status?: string
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          webhook_response_code?: number | null
          webhook_sent?: boolean
          webhook_sent_at?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          organization_id?: string | null
          referral_code?: string | null
          referred_email?: string
          referred_first_name?: string
          referred_last_name?: string
          referred_phone?: string | null
          referred_profile_id?: string | null
          referred_program_interest?: string | null
          referrer_email?: string | null
          referrer_name?: string | null
          referrer_profile_id?: string | null
          status?: string
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          webhook_response_code?: number | null
          webhook_sent?: boolean
          webhook_sent_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referral_submissions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referral_submissions_referred_profile_id_fkey"
            columns: ["referred_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referral_submissions_referrer_profile_id_fkey"
            columns: ["referrer_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      referral_tiers: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          max_referrals: number | null
          min_referrals: number
          name: string
          organization_id: string | null
          perks: Json | null
          reward_cash_cents: number
          reward_credit_cents: number
          tier_number: number
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          max_referrals?: number | null
          min_referrals: number
          name: string
          organization_id?: string | null
          perks?: Json | null
          reward_cash_cents: number
          reward_credit_cents: number
          tier_number: number
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          max_referrals?: number | null
          min_referrals?: number
          name?: string
          organization_id?: string | null
          perks?: Json | null
          reward_cash_cents?: number
          reward_credit_cents?: number
          tier_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "referral_tiers_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      referrals: {
        Row: {
          attribution_expires_at: string | null
          attribution_window_days: number
          clicked_at: string | null
          created_at: string
          enrolled_at: string | null
          fraud_flagged: boolean
          fraud_reason: string | null
          id: string
          ip_address: string | null
          is_self_referral: boolean
          lead_at: string | null
          manual_credit_reason: string | null
          manually_credited: boolean
          manually_credited_at: string | null
          manually_credited_by: string | null
          organization_id: string | null
          paid_at: string | null
          payout_handle: string | null
          payout_method: string | null
          qualified_at: string | null
          referral_code: string | null
          referred_email: string
          referred_user_id: string | null
          referrer_id: string
          reward_amount_cents: number | null
          reward_tier: number | null
          status: string
          updated_at: string
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          attribution_expires_at?: string | null
          attribution_window_days?: number
          clicked_at?: string | null
          created_at?: string
          enrolled_at?: string | null
          fraud_flagged?: boolean
          fraud_reason?: string | null
          id?: string
          ip_address?: string | null
          is_self_referral?: boolean
          lead_at?: string | null
          manual_credit_reason?: string | null
          manually_credited?: boolean
          manually_credited_at?: string | null
          manually_credited_by?: string | null
          organization_id?: string | null
          paid_at?: string | null
          payout_handle?: string | null
          payout_method?: string | null
          qualified_at?: string | null
          referral_code?: string | null
          referred_email: string
          referred_user_id?: string | null
          referrer_id: string
          reward_amount_cents?: number | null
          reward_tier?: number | null
          status?: string
          updated_at?: string
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          attribution_expires_at?: string | null
          attribution_window_days?: number
          clicked_at?: string | null
          created_at?: string
          enrolled_at?: string | null
          fraud_flagged?: boolean
          fraud_reason?: string | null
          id?: string
          ip_address?: string | null
          is_self_referral?: boolean
          lead_at?: string | null
          manual_credit_reason?: string | null
          manually_credited?: boolean
          manually_credited_at?: string | null
          manually_credited_by?: string | null
          organization_id?: string | null
          paid_at?: string | null
          payout_handle?: string | null
          payout_method?: string | null
          qualified_at?: string | null
          referral_code?: string | null
          referred_email?: string
          referred_user_id?: string | null
          referrer_id?: string
          reward_amount_cents?: number | null
          reward_tier?: number | null
          status?: string
          updated_at?: string
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referrals_manually_credited_by_fkey"
            columns: ["manually_credited_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_referral_code_fkey"
            columns: ["referral_code"]
            isOneToOne: false
            referencedRelation: "referral_codes"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "referrals_referred_user_id_fkey"
            columns: ["referred_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          action_taken: string | null
          created_at: string
          details: string | null
          id: string
          reason: string
          report_type: Database["public"]["Enums"]["report_type"]
          reported_user_id: string | null
          reporter_id: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["report_status"]
          target_id: string
        }
        Insert: {
          action_taken?: string | null
          created_at?: string
          details?: string | null
          id?: string
          reason: string
          report_type: Database["public"]["Enums"]["report_type"]
          reported_user_id?: string | null
          reporter_id: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["report_status"]
          target_id: string
        }
        Update: {
          action_taken?: string | null
          created_at?: string
          details?: string | null
          id?: string
          reason?: string
          report_type?: Database["public"]["Enums"]["report_type"]
          reported_user_id?: string | null
          reporter_id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["report_status"]
          target_id?: string
        }
        Relationships: []
      }
      reward_ledger: {
        Row: {
          admin_approved_at: string | null
          admin_approved_by: string | null
          amount_cents: number
          created_at: string
          id: string
          notes: string | null
          organization_id: string | null
          payout_handle: string | null
          payout_method: string | null
          payout_reference: string | null
          referral_id: string | null
          reward_type: string
          status: string
          type: string
          user_id: string
        }
        Insert: {
          admin_approved_at?: string | null
          admin_approved_by?: string | null
          amount_cents: number
          created_at?: string
          id?: string
          notes?: string | null
          organization_id?: string | null
          payout_handle?: string | null
          payout_method?: string | null
          payout_reference?: string | null
          referral_id?: string | null
          reward_type?: string
          status?: string
          type: string
          user_id: string
        }
        Update: {
          admin_approved_at?: string | null
          admin_approved_by?: string | null
          amount_cents?: number
          created_at?: string
          id?: string
          notes?: string | null
          organization_id?: string | null
          payout_handle?: string | null
          payout_method?: string | null
          payout_reference?: string | null
          referral_id?: string | null
          reward_type?: string
          status?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reward_ledger_admin_approved_by_fkey"
            columns: ["admin_approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reward_ledger_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reward_ledger_referral_id_fkey"
            columns: ["referral_id"]
            isOneToOne: false
            referencedRelation: "referrals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reward_ledger_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          id: string
          user_id: string
        }
        Insert: {
          id?: string
          user_id: string
        }
        Update: {
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      salesflow_inbound_logs: {
        Row: {
          action: string
          cohort_id: string | null
          created_at: string
          error: string | null
          id: string
          payload: Json | null
          program_id: string | null
          success: boolean
          user_id: string | null
        }
        Insert: {
          action: string
          cohort_id?: string | null
          created_at?: string
          error?: string | null
          id?: string
          payload?: Json | null
          program_id?: string | null
          success?: boolean
          user_id?: string | null
        }
        Update: {
          action?: string
          cohort_id?: string | null
          created_at?: string
          error?: string | null
          id?: string
          payload?: Json | null
          program_id?: string | null
          success?: boolean
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "salesflow_inbound_logs_cohort_id_fkey"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "salesflow_inbound_logs_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      schedule_exceptions: {
        Row: {
          cancelled: boolean
          created_at: string
          date: string
          id: string
          override_end: string | null
          override_start: string | null
          reason: string | null
          schedule_template_id: string
        }
        Insert: {
          cancelled?: boolean
          created_at?: string
          date: string
          id?: string
          override_end?: string | null
          override_start?: string | null
          reason?: string | null
          schedule_template_id: string
        }
        Update: {
          cancelled?: boolean
          created_at?: string
          date?: string
          id?: string
          override_end?: string | null
          override_start?: string | null
          reason?: string | null
          schedule_template_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "schedule_exceptions_schedule_template_id_fkey"
            columns: ["schedule_template_id"]
            isOneToOne: false
            referencedRelation: "schedule_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      schedule_patterns: {
        Row: {
          active: boolean
          anchor_start_date: string
          created_at: string
          day_pattern: string[]
          gap_behavior: string
          holiday_calendar_id: string | null
          horizon_months: number
          hours_per_day: number
          id: string
          max_seats: number
          name: string
          organization_id: string
          programs: Json
          rotation_type: string
          sync_to_salesflow: boolean
          time_block_end: string
          time_block_start: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          anchor_start_date: string
          created_at?: string
          day_pattern?: string[]
          gap_behavior?: string
          holiday_calendar_id?: string | null
          horizon_months?: number
          hours_per_day?: number
          id?: string
          max_seats?: number
          name: string
          organization_id: string
          programs?: Json
          rotation_type?: string
          sync_to_salesflow?: boolean
          time_block_end: string
          time_block_start: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          anchor_start_date?: string
          created_at?: string
          day_pattern?: string[]
          gap_behavior?: string
          holiday_calendar_id?: string | null
          horizon_months?: number
          hours_per_day?: number
          id?: string
          max_seats?: number
          name?: string
          organization_id?: string
          programs?: Json
          rotation_type?: string
          sync_to_salesflow?: boolean
          time_block_end?: string
          time_block_start?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "schedule_patterns_holiday_calendar_id_fkey"
            columns: ["holiday_calendar_id"]
            isOneToOne: false
            referencedRelation: "holiday_calendars"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedule_patterns_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      schedule_templates: {
        Row: {
          class_days: string[]
          created_at: string
          hours_per_day: number
          id: string
          language: string
          name: string
          organization_id: string | null
          program_id: string
          start_time: string
          updated_at: string
        }
        Insert: {
          class_days?: string[]
          created_at?: string
          hours_per_day: number
          id?: string
          language?: string
          name: string
          organization_id?: string | null
          program_id: string
          start_time: string
          updated_at?: string
        }
        Update: {
          class_days?: string[]
          created_at?: string
          hours_per_day?: number
          id?: string
          language?: string
          name?: string
          organization_id?: string | null
          program_id?: string
          start_time?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "schedule_templates_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedule_templates_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      school_excluded_dates: {
        Row: {
          date: string
          id: string
          organization_id: string | null
          reason: string | null
          type: string
        }
        Insert: {
          date: string
          id?: string
          organization_id?: string | null
          reason?: string | null
          type: string
        }
        Update: {
          date?: string
          id?: string
          organization_id?: string | null
          reason?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "school_excluded_dates_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      signed_agreements: {
        Row: {
          acknowledged_all_terms: boolean
          acknowledged_attendance_policy: boolean
          acknowledged_cancellation_policy: boolean
          acknowledged_career_services: boolean
          acknowledged_refund_policy: boolean
          agreement_html: string | null
          agreement_version: string
          created_at: string
          deposit_amount: number
          enrollment_id: string | null
          id: string
          order_id: string | null
          payment_option: string
          program_code: string
          program_name: string
          signature_text: string
          signature_type: string
          signed_at: string
          start_date: string | null
          student_address: string | null
          student_city: string | null
          student_email: string
          student_name: string
          student_phone: string | null
          student_state: string | null
          student_zip: string | null
          total_cost: number
          user_id: string
          variant_name: string | null
        }
        Insert: {
          acknowledged_all_terms?: boolean
          acknowledged_attendance_policy?: boolean
          acknowledged_cancellation_policy?: boolean
          acknowledged_career_services?: boolean
          acknowledged_refund_policy?: boolean
          agreement_html?: string | null
          agreement_version?: string
          created_at?: string
          deposit_amount?: number
          enrollment_id?: string | null
          id?: string
          order_id?: string | null
          payment_option?: string
          program_code: string
          program_name: string
          signature_text: string
          signature_type?: string
          signed_at?: string
          start_date?: string | null
          student_address?: string | null
          student_city?: string | null
          student_email: string
          student_name: string
          student_phone?: string | null
          student_state?: string | null
          student_zip?: string | null
          total_cost?: number
          user_id: string
          variant_name?: string | null
        }
        Update: {
          acknowledged_all_terms?: boolean
          acknowledged_attendance_policy?: boolean
          acknowledged_cancellation_policy?: boolean
          acknowledged_career_services?: boolean
          acknowledged_refund_policy?: boolean
          agreement_html?: string | null
          agreement_version?: string
          created_at?: string
          deposit_amount?: number
          enrollment_id?: string | null
          id?: string
          order_id?: string | null
          payment_option?: string
          program_code?: string
          program_name?: string
          signature_text?: string
          signature_type?: string
          signed_at?: string
          start_date?: string | null
          student_address?: string | null
          student_city?: string | null
          student_email?: string
          student_name?: string
          student_phone?: string | null
          student_state?: string | null
          student_zip?: string | null
          total_cost?: number
          user_id?: string
          variant_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "signed_agreements_enrollment_id_fkey"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "enrollments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "signed_agreements_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      site_config: {
        Row: {
          key: string
          updated_at: string | null
          value: string
        }
        Insert: {
          key: string
          updated_at?: string | null
          value: string
        }
        Update: {
          key?: string
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
      spouse_links: {
        Row: {
          created_at: string
          id: string
          spouse_id: string
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          spouse_id: string
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          spouse_id?: string
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      stored_cards: {
        Row: {
          card_brand: string | null
          cardholder_name: string | null
          created_at: string
          exp_month: number | null
          exp_year: number | null
          id: string
          is_default: boolean
          last_four: string | null
          square_card_id: string
          square_customer_id: string
          user_id: string
        }
        Insert: {
          card_brand?: string | null
          cardholder_name?: string | null
          created_at?: string
          exp_month?: number | null
          exp_year?: number | null
          id?: string
          is_default?: boolean
          last_four?: string | null
          square_card_id: string
          square_customer_id: string
          user_id: string
        }
        Update: {
          card_brand?: string | null
          cardholder_name?: string | null
          created_at?: string
          exp_month?: number | null
          exp_year?: number | null
          id?: string
          is_default?: boolean
          last_four?: string | null
          square_card_id?: string
          square_customer_id?: string
          user_id?: string
        }
        Relationships: []
      }
      student_documents: {
        Row: {
          created_at: string
          document_type: string
          enrollment_id: string | null
          file_name: string
          file_path: string
          id: string
          reviewed_at: string | null
          reviewed_by: string | null
          reviewer_notes: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          document_type: string
          enrollment_id?: string | null
          file_name: string
          file_path: string
          id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          reviewer_notes?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          document_type?: string
          enrollment_id?: string | null
          file_name?: string
          file_path?: string
          id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          reviewer_notes?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_documents_enrollment_id_fkey"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "enrollments"
            referencedColumns: ["id"]
          },
        ]
      }
      student_exam_submissions: {
        Row: {
          created_at: string
          enrollment_id: string
          exam_date: string
          id: string
          notes: string | null
          submitted_at: string
          verified: boolean
        }
        Insert: {
          created_at?: string
          enrollment_id: string
          exam_date: string
          id?: string
          notes?: string | null
          submitted_at?: string
          verified?: boolean
        }
        Update: {
          created_at?: string
          enrollment_id?: string
          exam_date?: string
          id?: string
          notes?: string | null
          submitted_at?: string
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "student_exam_submissions_enrollment_id_fkey"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "enrollments"
            referencedColumns: ["id"]
          },
        ]
      }
      student_practice_passes: {
        Row: {
          cohort_id: string | null
          created_at: string
          enrollment_id: string
          id: string
          is_reserve: boolean
          pass_number: number
          reschedule_count: number
          scheduled_date: string | null
          status: string
          updated_at: string
          used_at: string | null
        }
        Insert: {
          cohort_id?: string | null
          created_at?: string
          enrollment_id: string
          id?: string
          is_reserve?: boolean
          pass_number: number
          reschedule_count?: number
          scheduled_date?: string | null
          status?: string
          updated_at?: string
          used_at?: string | null
        }
        Update: {
          cohort_id?: string | null
          created_at?: string
          enrollment_id?: string
          id?: string
          is_reserve?: boolean
          pass_number?: number
          reschedule_count?: number
          scheduled_date?: string | null
          status?: string
          updated_at?: string
          used_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_practice_passes_cohort_id_fkey"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_practice_passes_enrollment_id_fkey"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "enrollments"
            referencedColumns: ["id"]
          },
        ]
      }
      student_streaks: {
        Row: {
          current_streak: number
          id: string
          last_practice_date: string | null
          longest_streak: number
          organization_id: string | null
          total_practice_sessions: number
          user_id: string
        }
        Insert: {
          current_streak?: number
          id?: string
          last_practice_date?: string | null
          longest_streak?: number
          organization_id?: string | null
          total_practice_sessions?: number
          user_id: string
        }
        Update: {
          current_streak?: number
          id?: string
          last_practice_date?: string | null
          longest_streak?: number
          organization_id?: string | null
          total_practice_sessions?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_streaks_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_streaks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      student_weak_areas: {
        Row: {
          category: string
          failure_rate: number
          id: string
          last_attempted_at: string | null
          last_streak_date: string | null
          organization_id: string | null
          streak_days: number
          total_attempted: number
          total_correct: number
          user_id: string
          weighted_failure_rate: number | null
        }
        Insert: {
          category: string
          failure_rate?: number
          id?: string
          last_attempted_at?: string | null
          last_streak_date?: string | null
          organization_id?: string | null
          streak_days?: number
          total_attempted?: number
          total_correct?: number
          user_id: string
          weighted_failure_rate?: number | null
        }
        Update: {
          category?: string
          failure_rate?: number
          id?: string
          last_attempted_at?: string | null
          last_streak_date?: string | null
          organization_id?: string | null
          streak_days?: number
          total_attempted?: number
          total_correct?: number
          user_id?: string
          weighted_failure_rate?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "student_weak_areas_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_weak_areas_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      sync_logs: {
        Row: {
          created_at: string
          details: string | null
          id: string
          organization_id: string | null
          status: string
          sync_type: string
        }
        Insert: {
          created_at?: string
          details?: string | null
          id?: string
          organization_id?: string | null
          status?: string
          sync_type: string
        }
        Update: {
          created_at?: string
          details?: string | null
          id?: string
          organization_id?: string | null
          status?: string
          sync_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "sync_logs_tenant_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      sync_outbox: {
        Row: {
          attempts: number
          created_at: string
          entity_id: string | null
          entity_type: string
          event_type: string
          id: string
          integration_id: string | null
          last_error: string | null
          payload: Json
          scheduled_for: string
          sent_at: string | null
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          attempts?: number
          created_at?: string
          entity_id?: string | null
          entity_type: string
          event_type: string
          id?: string
          integration_id?: string | null
          last_error?: string | null
          payload?: Json
          scheduled_for?: string
          sent_at?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          attempts?: number
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          event_type?: string
          id?: string
          integration_id?: string | null
          last_error?: string | null
          payload?: Json
          scheduled_for?: string
          sent_at?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sync_outbox_integration_id_fkey"
            columns: ["integration_id"]
            isOneToOne: false
            referencedRelation: "integrations"
            referencedColumns: ["id"]
          },
        ]
      }
      system_integrity_logs: {
        Row: {
          affected_entity: string
          category: string
          description: string
          detected_at: string
          entity_id: string | null
          error_type: string
          fix_attempted: boolean
          fix_details: string | null
          fix_successful: boolean
          id: string
          organization_id: string | null
          resolved_at: string | null
          resolved_by: string | null
          severity: string
          status: string
        }
        Insert: {
          affected_entity: string
          category: string
          description: string
          detected_at?: string
          entity_id?: string | null
          error_type: string
          fix_attempted?: boolean
          fix_details?: string | null
          fix_successful?: boolean
          id?: string
          organization_id?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: string
          status?: string
        }
        Update: {
          affected_entity?: string
          category?: string
          description?: string
          detected_at?: string
          entity_id?: string | null
          error_type?: string
          fix_attempted?: boolean
          fix_details?: string | null
          fix_successful?: boolean
          id?: string
          organization_id?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "system_integrity_logs_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      timeline_comments: {
        Row: {
          author_id: string
          content: string
          created_at: string
          deleted_at: string | null
          id: string
          post_id: string
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          post_id: string
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "timeline_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "timeline_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      timeline_posts: {
        Row: {
          author_id: string
          cohort_id: string | null
          comments_enabled: boolean
          content: string
          created_at: string
          deleted_at: string | null
          id: string
          is_pinned: boolean
          is_system_generated: boolean
          media_urls: string[] | null
          post_type: Database["public"]["Enums"]["post_type"]
          program_id: string | null
          updated_at: string
          visibility: Database["public"]["Enums"]["post_visibility"]
        }
        Insert: {
          author_id: string
          cohort_id?: string | null
          comments_enabled?: boolean
          content: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          is_pinned?: boolean
          is_system_generated?: boolean
          media_urls?: string[] | null
          post_type?: Database["public"]["Enums"]["post_type"]
          program_id?: string | null
          updated_at?: string
          visibility?: Database["public"]["Enums"]["post_visibility"]
        }
        Update: {
          author_id?: string
          cohort_id?: string | null
          comments_enabled?: boolean
          content?: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          is_pinned?: boolean
          is_system_generated?: boolean
          media_urls?: string[] | null
          post_type?: Database["public"]["Enums"]["post_type"]
          program_id?: string | null
          updated_at?: string
          visibility?: Database["public"]["Enums"]["post_visibility"]
        }
        Relationships: [
          {
            foreignKeyName: "timeline_posts_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      timeline_reactions: {
        Row: {
          created_at: string
          emoji: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          emoji: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          emoji?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "timeline_reactions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "timeline_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      user_blocks: {
        Row: {
          blocked_id: string
          blocker_id: string
          created_at: string
          id: string
        }
        Insert: {
          blocked_id: string
          blocker_id: string
          created_at?: string
          id?: string
        }
        Update: {
          blocked_id?: string
          blocker_id?: string
          created_at?: string
          id?: string
        }
        Relationships: []
      }
      user_connections: {
        Row: {
          created_at: string
          id: string
          recipient_id: string
          requester_id: string
          status: Database["public"]["Enums"]["connection_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          recipient_id: string
          requester_id: string
          status?: Database["public"]["Enums"]["connection_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          recipient_id?: string
          requester_id?: string
          status?: Database["public"]["Enums"]["connection_status"]
          updated_at?: string
        }
        Relationships: []
      }
      user_presence: {
        Row: {
          custom_status: string | null
          last_seen_at: string
          status: Database["public"]["Enums"]["presence_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          custom_status?: string | null
          last_seen_at?: string
          status?: Database["public"]["Enums"]["presence_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          custom_status?: string | null
          last_seen_at?: string
          status?: Database["public"]["Enums"]["presence_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      waitlist: {
        Row: {
          cohort_id: string | null
          created_at: string
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          notified: boolean
          notified_at: string | null
          organization_id: string | null
          phone: string | null
          program_id: string
          user_id: string | null
        }
        Insert: {
          cohort_id?: string | null
          created_at?: string
          email: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          notified?: boolean
          notified_at?: string | null
          organization_id?: string | null
          phone?: string | null
          program_id: string
          user_id?: string | null
        }
        Update: {
          cohort_id?: string | null
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          notified?: boolean
          notified_at?: string | null
          organization_id?: string | null
          phone?: string | null
          program_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "waitlist_cohort_id_fkey"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "waitlist_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "waitlist_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      wws_alumni_posts: {
        Row: {
          approved_at: string | null
          caption: string | null
          created_at: string | null
          id: string
          image_urls: string[] | null
          lead_id: string
          milestone_tag: string | null
          puppy_id: string | null
          status: string | null
          video_url: string | null
        }
        Insert: {
          approved_at?: string | null
          caption?: string | null
          created_at?: string | null
          id?: string
          image_urls?: string[] | null
          lead_id: string
          milestone_tag?: string | null
          puppy_id?: string | null
          status?: string | null
          video_url?: string | null
        }
        Update: {
          approved_at?: string | null
          caption?: string | null
          created_at?: string | null
          id?: string
          image_urls?: string[] | null
          lead_id?: string
          milestone_tag?: string | null
          puppy_id?: string | null
          status?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wws_alumni_posts_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "wws_leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wws_alumni_posts_puppy_id_fkey"
            columns: ["puppy_id"]
            isOneToOne: false
            referencedRelation: "wws_puppies"
            referencedColumns: ["id"]
          },
        ]
      }
      wws_dog_profiles: {
        Row: {
          bio: string | null
          call_name: string
          color_description: string | null
          created_at: string | null
          dob: string | null
          gallery_urls: string[] | null
          health_notes: string | null
          id: string
          lead_id: string
          profile_photo_url: string | null
          puppy_id: string | null
          sex: string | null
          titles_earned: string[] | null
          updated_at: string | null
          weight_lbs: number | null
        }
        Insert: {
          bio?: string | null
          call_name: string
          color_description?: string | null
          created_at?: string | null
          dob?: string | null
          gallery_urls?: string[] | null
          health_notes?: string | null
          id?: string
          lead_id: string
          profile_photo_url?: string | null
          puppy_id?: string | null
          sex?: string | null
          titles_earned?: string[] | null
          updated_at?: string | null
          weight_lbs?: number | null
        }
        Update: {
          bio?: string | null
          call_name?: string
          color_description?: string | null
          created_at?: string | null
          dob?: string | null
          gallery_urls?: string[] | null
          health_notes?: string | null
          id?: string
          lead_id?: string
          profile_photo_url?: string | null
          puppy_id?: string | null
          sex?: string | null
          titles_earned?: string[] | null
          updated_at?: string | null
          weight_lbs?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "wws_dog_profiles_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "wws_leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wws_dog_profiles_puppy_id_fkey"
            columns: ["puppy_id"]
            isOneToOne: false
            referencedRelation: "wws_puppies"
            referencedColumns: ["id"]
          },
        ]
      }
      wws_leads: {
        Row: {
          additional_notes: string | null
          approval_sent_at: string | null
          approval_token: string | null
          children_ages: string | null
          city: string | null
          created_at: string | null
          deposit_link_sent_at: string | null
          email: string | null
          family_size: number | null
          full_name: string | null
          has_fenced_yard: boolean | null
          has_owned_large_dog: boolean | null
          household_type: string | null
          id: string
          internal_notes: string | null
          other_pets: string | null
          phone: string | null
          pickup_date: string | null
          portal_last_seen_at: string | null
          preferred_puppy_id: string | null
          preferred_sex: string | null
          ready_for_deposit: boolean | null
          reason_for_breed: string | null
          referral_code: string | null
          referred_by_lead_id: string | null
          score: number | null
          signature_agreed_at: string | null
          source: string | null
          stage: string | null
          state: string | null
          timeline: string | null
          updated_at: string | null
          utm_campaign: string | null
        }
        Insert: {
          additional_notes?: string | null
          approval_sent_at?: string | null
          approval_token?: string | null
          children_ages?: string | null
          city?: string | null
          created_at?: string | null
          deposit_link_sent_at?: string | null
          email?: string | null
          family_size?: number | null
          full_name?: string | null
          has_fenced_yard?: boolean | null
          has_owned_large_dog?: boolean | null
          household_type?: string | null
          id?: string
          internal_notes?: string | null
          other_pets?: string | null
          phone?: string | null
          pickup_date?: string | null
          portal_last_seen_at?: string | null
          preferred_puppy_id?: string | null
          preferred_sex?: string | null
          ready_for_deposit?: boolean | null
          reason_for_breed?: string | null
          referral_code?: string | null
          referred_by_lead_id?: string | null
          score?: number | null
          signature_agreed_at?: string | null
          source?: string | null
          stage?: string | null
          state?: string | null
          timeline?: string | null
          updated_at?: string | null
          utm_campaign?: string | null
        }
        Update: {
          additional_notes?: string | null
          approval_sent_at?: string | null
          approval_token?: string | null
          children_ages?: string | null
          city?: string | null
          created_at?: string | null
          deposit_link_sent_at?: string | null
          email?: string | null
          family_size?: number | null
          full_name?: string | null
          has_fenced_yard?: boolean | null
          has_owned_large_dog?: boolean | null
          household_type?: string | null
          id?: string
          internal_notes?: string | null
          other_pets?: string | null
          phone?: string | null
          pickup_date?: string | null
          portal_last_seen_at?: string | null
          preferred_puppy_id?: string | null
          preferred_sex?: string | null
          ready_for_deposit?: boolean | null
          reason_for_breed?: string | null
          referral_code?: string | null
          referred_by_lead_id?: string | null
          score?: number | null
          signature_agreed_at?: string | null
          source?: string | null
          stage?: string | null
          state?: string | null
          timeline?: string | null
          updated_at?: string | null
          utm_campaign?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wws_leads_preferred_puppy_id_fkey"
            columns: ["preferred_puppy_id"]
            isOneToOne: false
            referencedRelation: "wws_puppies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wws_leads_referred_by_lead_id_fkey"
            columns: ["referred_by_lead_id"]
            isOneToOne: false
            referencedRelation: "wws_leads"
            referencedColumns: ["id"]
          },
        ]
      }
      wws_messages: {
        Row: {
          body: string
          created_at: string | null
          id: string
          lead_id: string
          read_at: string | null
          sender: string
        }
        Insert: {
          body: string
          created_at?: string | null
          id?: string
          lead_id: string
          read_at?: string | null
          sender: string
        }
        Update: {
          body?: string
          created_at?: string | null
          id?: string
          lead_id?: string
          read_at?: string | null
          sender?: string
        }
        Relationships: [
          {
            foreignKeyName: "wws_messages_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "wws_leads"
            referencedColumns: ["id"]
          },
        ]
      }
      wws_portal_updates: {
        Row: {
          body: string | null
          created_at: string | null
          id: string
          image_urls: string[] | null
          milestone_tag: string | null
          published_at: string | null
          puppy_id: string | null
          title: string | null
          video_url: string | null
          visibility: string | null
        }
        Insert: {
          body?: string | null
          created_at?: string | null
          id?: string
          image_urls?: string[] | null
          milestone_tag?: string | null
          published_at?: string | null
          puppy_id?: string | null
          title?: string | null
          video_url?: string | null
          visibility?: string | null
        }
        Update: {
          body?: string | null
          created_at?: string | null
          id?: string
          image_urls?: string[] | null
          milestone_tag?: string | null
          published_at?: string | null
          puppy_id?: string | null
          title?: string | null
          video_url?: string | null
          visibility?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wws_portal_updates_puppy_id_fkey"
            columns: ["puppy_id"]
            isOneToOne: false
            referencedRelation: "wws_puppies"
            referencedColumns: ["id"]
          },
        ]
      }
      wws_profiles: {
        Row: {
          created_at: string | null
          id: string
          lead_id: string | null
          role: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          lead_id?: string | null
          role?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          lead_id?: string | null
          role?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wws_profiles_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "wws_leads"
            referencedColumns: ["id"]
          },
        ]
      }
      wws_puppies: {
        Row: {
          collar_color: string | null
          created_at: string | null
          deposit_paid_at: string | null
          dob: string | null
          gallery_urls: string[] | null
          id: string
          ideal_home: string | null
          image_url: string | null
          name: string
          personality_bio: string | null
          price: number | null
          priority_order: number | null
          ready_date: string | null
          reserved_by_lead_id: string | null
          sex: string | null
          slug: string
          status: string | null
          stripe_payment_link: string | null
          temperament_tags: string[] | null
          tier: string | null
          video_url: string | null
        }
        Insert: {
          collar_color?: string | null
          created_at?: string | null
          deposit_paid_at?: string | null
          dob?: string | null
          gallery_urls?: string[] | null
          id?: string
          ideal_home?: string | null
          image_url?: string | null
          name: string
          personality_bio?: string | null
          price?: number | null
          priority_order?: number | null
          ready_date?: string | null
          reserved_by_lead_id?: string | null
          sex?: string | null
          slug: string
          status?: string | null
          stripe_payment_link?: string | null
          temperament_tags?: string[] | null
          tier?: string | null
          video_url?: string | null
        }
        Update: {
          collar_color?: string | null
          created_at?: string | null
          deposit_paid_at?: string | null
          dob?: string | null
          gallery_urls?: string[] | null
          id?: string
          ideal_home?: string | null
          image_url?: string | null
          name?: string
          personality_bio?: string | null
          price?: number | null
          priority_order?: number | null
          ready_date?: string | null
          reserved_by_lead_id?: string | null
          sex?: string | null
          slug?: string
          status?: string | null
          stripe_payment_link?: string | null
          temperament_tags?: string[] | null
          tier?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wws_puppies_reserved_by_lead_id_fkey"
            columns: ["reserved_by_lead_id"]
            isOneToOne: false
            referencedRelation: "wws_leads"
            referencedColumns: ["id"]
          },
        ]
      }
      wws_reservations: {
        Row: {
          amount: number | null
          contract_sent_at: string | null
          created_at: string | null
          final_payment_due_at: string | null
          final_payment_paid_at: string | null
          id: string
          lead_id: string | null
          pick_order: number | null
          pickup_date: string | null
          puppy_id: string | null
          stripe_payment_intent_id: string | null
          stripe_session_id: string | null
          tier: string | null
        }
        Insert: {
          amount?: number | null
          contract_sent_at?: string | null
          created_at?: string | null
          final_payment_due_at?: string | null
          final_payment_paid_at?: string | null
          id?: string
          lead_id?: string | null
          pick_order?: number | null
          pickup_date?: string | null
          puppy_id?: string | null
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          tier?: string | null
        }
        Update: {
          amount?: number | null
          contract_sent_at?: string | null
          created_at?: string | null
          final_payment_due_at?: string | null
          final_payment_paid_at?: string | null
          id?: string
          lead_id?: string | null
          pick_order?: number | null
          pickup_date?: string | null
          puppy_id?: string | null
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          tier?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wws_reservations_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "wws_leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wws_reservations_puppy_id_fkey"
            columns: ["puppy_id"]
            isOneToOne: false
            referencedRelation: "wws_puppies"
            referencedColumns: ["id"]
          },
        ]
      }
      wws_resources: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          section: string
          sort_order: number | null
          title: string
          url: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          section: string
          sort_order?: number | null
          title: string
          url?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          section?: string
          sort_order?: number | null
          title?: string
          url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      auto_archive_inactive_leads: { Args: never; Returns: undefined }
      check_enrollment_expiry: { Args: never; Returns: undefined }
      create_cohort_with_sessions: {
        Args: {
          p_ghl_event_id?: string
          p_max_seats?: number
          p_program_id: string
          p_schedule_template_id: string
          p_start_date: string
        }
        Returns: string
      }
      day_name_to_dow: { Args: { day_name: string }; Returns: number }
      dow_int_to_text: { Args: { dow: number }; Returns: string }
      enqueue_sync_event: {
        Args: {
          p_entity_id: string
          p_entity_type: string
          p_event_type: string
          p_organization_id: string
          p_payload: Json
          p_user_id: string
        }
        Returns: number
      }
      ensure_program_space: {
        Args: { p_program_id: string; p_user_id: string }
        Returns: undefined
      }
      generate_cohort_sessions: {
        Args: { p_cohort_id: string; p_force?: boolean }
        Returns: undefined
      }
      generate_sessions: {
        Args: {
          p_curriculum_hours: number
          p_excluded_dates: string[]
          p_start_date: string
          p_template_snapshot: Json
        }
        Returns: {
          duration_hours: number
          session_date: string
          session_number: number
          session_start_time: string
          session_type: string
        }[]
      }
      get_or_create_dm: { Args: { other_user_id: string }; Returns: string }
      get_unread_counts: {
        Args: { p_user_id: string }
        Returns: {
          conversation_id: string
          unread_count: number
        }[]
      }
      get_user_org_id: { Args: { _user_id: string }; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      integration_disconnect: {
        Args: { p_integration_id: string }
        Returns: undefined
      }
      integration_get_api_key: {
        Args: { p_integration_id: string }
        Returns: string
      }
      integration_set_api_key: {
        Args: { p_api_key: string; p_integration_id: string }
        Returns: undefined
      }
      invoke_reconcile_schedules: { Args: never; Returns: undefined }
      is_admin: { Args: never; Returns: boolean }
      is_org_member: { Args: { org_id: string }; Returns: boolean }
      wws_is_admin: { Args: { uid: string }; Returns: boolean }
    }
    Enums: {
      app_role:
        | "admin"
        | "user"
        | "student"
        | "instructor"
        | "super_instructor"
        | "super_admin"
      call_status: "ringing" | "active" | "ended" | "missed" | "declined"
      call_type: "voice" | "video"
      connection_status: "pending" | "accepted" | "blocked"
      conversation_type:
        | "dm"
        | "group_dm"
        | "cohort_channel"
        | "program_space"
        | "staff_channel"
        | "announcement"
      cta_destination_type:
        | "direct_enrollment_flow"
        | "shared_admissions_flow"
        | "preview_calendar"
        | "direct_calendar"
        | "internal_page"
        | "external_url"
      learning_mode: "instructor_led" | "on_demand" | "hybrid"
      member_role: "member" | "admin" | "moderator"
      message_type: "text" | "image" | "file" | "system" | "voice_note"
      post_type:
        | "milestone"
        | "update"
        | "question"
        | "study_group"
        | "shoutout"
        | "tip"
        | "announcement"
        | "job_share"
      post_visibility: "cohort" | "program" | "friends" | "everyone"
      presence_status: "online" | "away" | "studying" | "in_class" | "offline"
      report_status: "pending" | "reviewed" | "actioned" | "dismissed"
      report_type: "message" | "post" | "user" | "comment"
      user_lifecycle_status:
        | "lead"
        | "applicant"
        | "enrolled"
        | "inactive"
        | "archived"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "admin",
        "user",
        "student",
        "instructor",
        "super_instructor",
        "super_admin",
      ],
      call_status: ["ringing", "active", "ended", "missed", "declined"],
      call_type: ["voice", "video"],
      connection_status: ["pending", "accepted", "blocked"],
      conversation_type: [
        "dm",
        "group_dm",
        "cohort_channel",
        "program_space",
        "staff_channel",
        "announcement",
      ],
      cta_destination_type: [
        "direct_enrollment_flow",
        "shared_admissions_flow",
        "preview_calendar",
        "direct_calendar",
        "internal_page",
        "external_url",
      ],
      learning_mode: ["instructor_led", "on_demand", "hybrid"],
      member_role: ["member", "admin", "moderator"],
      message_type: ["text", "image", "file", "system", "voice_note"],
      post_type: [
        "milestone",
        "update",
        "question",
        "study_group",
        "shoutout",
        "tip",
        "announcement",
        "job_share",
      ],
      post_visibility: ["cohort", "program", "friends", "everyone"],
      presence_status: ["online", "away", "studying", "in_class", "offline"],
      report_status: ["pending", "reviewed", "actioned", "dismissed"],
      report_type: ["message", "post", "user", "comment"],
      user_lifecycle_status: [
        "lead",
        "applicant",
        "enrolled",
        "inactive",
        "archived",
      ],
    },
  },
} as const
