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
          order_id: string | null
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
          order_id?: string | null
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
          order_id?: string | null
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
            foreignKeyName: "abandoned_funnels_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "abandoned_funnels_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_enrollment_corrections: {
        Row: {
          after_state: Json
          before_state: Json
          corrected_by: string | null
          correction_type: string
          created_at: string
          enrollment_id: string
          id: string
          reason: string
          related_order_id: string | null
          warnings: string[]
        }
        Insert: {
          after_state?: Json
          before_state?: Json
          corrected_by?: string | null
          correction_type?: string
          created_at?: string
          enrollment_id: string
          id?: string
          reason: string
          related_order_id?: string | null
          warnings?: string[]
        }
        Update: {
          after_state?: Json
          before_state?: Json
          corrected_by?: string | null
          correction_type?: string
          created_at?: string
          enrollment_id?: string
          id?: string
          reason?: string
          related_order_id?: string | null
          warnings?: string[]
        }
        Relationships: [
          {
            foreignKeyName: "admin_enrollment_corrections_enrollment_id_fkey"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "enrollments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_enrollment_corrections_related_order_id_fkey"
            columns: ["related_order_id"]
            isOneToOne: false
            referencedRelation: "orders"
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
      ao_agent_runs: {
        Row: {
          agent_id: string | null
          created_at: string
          created_by: string | null
          ended_at: string | null
          error: string | null
          id: string
          input: Json | null
          org_id: string
          output: Json | null
          started_at: string | null
          status: Database["public"]["Enums"]["ao_run_status"]
        }
        Insert: {
          agent_id?: string | null
          created_at?: string
          created_by?: string | null
          ended_at?: string | null
          error?: string | null
          id?: string
          input?: Json | null
          org_id: string
          output?: Json | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["ao_run_status"]
        }
        Update: {
          agent_id?: string | null
          created_at?: string
          created_by?: string | null
          ended_at?: string | null
          error?: string | null
          id?: string
          input?: Json | null
          org_id?: string
          output?: Json | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["ao_run_status"]
        }
        Relationships: [
          {
            foreignKeyName: "ao_agent_runs_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "ao_agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ao_agent_runs_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "ao_orgs"
            referencedColumns: ["id"]
          },
        ]
      }
      ao_agents: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          model: string
          name: string
          org_id: string
          system_prompt: string
          tools: Json
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          model?: string
          name: string
          org_id: string
          system_prompt?: string
          tools?: Json
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          model?: string
          name?: string
          org_id?: string
          system_prompt?: string
          tools?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ao_agents_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "ao_orgs"
            referencedColumns: ["id"]
          },
        ]
      }
      ao_api_keys: {
        Row: {
          created_at: string
          created_by: string | null
          encrypted_key: string
          id: string
          label: string
          last4: string
          org_id: string
          provider: Database["public"]["Enums"]["ao_provider"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          encrypted_key: string
          id?: string
          label?: string
          last4: string
          org_id: string
          provider: Database["public"]["Enums"]["ao_provider"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          encrypted_key?: string
          id?: string
          label?: string
          last4?: string
          org_id?: string
          provider?: Database["public"]["Enums"]["ao_provider"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ao_api_keys_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "ao_orgs"
            referencedColumns: ["id"]
          },
        ]
      }
      ao_approvals: {
        Row: {
          created_at: string
          decided_at: string | null
          decided_by: string | null
          id: string
          org_id: string
          requested_action: Json
          run_id: string | null
          status: Database["public"]["Enums"]["ao_approval_status"]
        }
        Insert: {
          created_at?: string
          decided_at?: string | null
          decided_by?: string | null
          id?: string
          org_id: string
          requested_action: Json
          run_id?: string | null
          status?: Database["public"]["Enums"]["ao_approval_status"]
        }
        Update: {
          created_at?: string
          decided_at?: string | null
          decided_by?: string | null
          id?: string
          org_id?: string
          requested_action?: Json
          run_id?: string | null
          status?: Database["public"]["Enums"]["ao_approval_status"]
        }
        Relationships: [
          {
            foreignKeyName: "ao_approvals_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "ao_orgs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ao_approvals_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "ao_agent_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      ao_credit_ledger: {
        Row: {
          actor_user_id: string | null
          created_at: string
          delta: number
          id: string
          note: string | null
          org_id: string
          reason: Database["public"]["Enums"]["ao_ledger_reason"]
          ref_id: string | null
        }
        Insert: {
          actor_user_id?: string | null
          created_at?: string
          delta: number
          id?: string
          note?: string | null
          org_id: string
          reason: Database["public"]["Enums"]["ao_ledger_reason"]
          ref_id?: string | null
        }
        Update: {
          actor_user_id?: string | null
          created_at?: string
          delta?: number
          id?: string
          note?: string | null
          org_id?: string
          reason?: Database["public"]["Enums"]["ao_ledger_reason"]
          ref_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ao_credit_ledger_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "ao_orgs"
            referencedColumns: ["id"]
          },
        ]
      }
      ao_integrations: {
        Row: {
          config: Json
          created_at: string
          created_by: string | null
          id: string
          kind: Database["public"]["Enums"]["ao_integration_kind"]
          org_id: string
          status: string
          updated_at: string
        }
        Insert: {
          config?: Json
          created_at?: string
          created_by?: string | null
          id?: string
          kind: Database["public"]["Enums"]["ao_integration_kind"]
          org_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          config?: Json
          created_at?: string
          created_by?: string | null
          id?: string
          kind?: Database["public"]["Enums"]["ao_integration_kind"]
          org_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ao_integrations_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "ao_orgs"
            referencedColumns: ["id"]
          },
        ]
      }
      ao_invites: {
        Row: {
          accepted_at: string | null
          created_at: string
          created_by: string | null
          email: string
          expires_at: string
          id: string
          org_id: string
          role: Database["public"]["Enums"]["ao_org_role"]
          token: string
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string
          created_by?: string | null
          email: string
          expires_at?: string
          id?: string
          org_id: string
          role?: Database["public"]["Enums"]["ao_org_role"]
          token?: string
        }
        Update: {
          accepted_at?: string | null
          created_at?: string
          created_by?: string | null
          email?: string
          expires_at?: string
          id?: string
          org_id?: string
          role?: Database["public"]["Enums"]["ao_org_role"]
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "ao_invites_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "ao_orgs"
            referencedColumns: ["id"]
          },
        ]
      }
      ao_login_email_codes: {
        Row: {
          code_hash: string
          created_at: string
          email: string
          expires_at: string
          id: string
        }
        Insert: {
          code_hash: string
          created_at?: string
          email: string
          expires_at: string
          id?: string
        }
        Update: {
          code_hash?: string
          created_at?: string
          email?: string
          expires_at?: string
          id?: string
        }
        Relationships: []
      }
      ao_messages: {
        Row: {
          content: string
          created_at: string
          credits_used: number
          id: string
          input_tokens: number
          model: string | null
          org_id: string
          output_tokens: number
          role: Database["public"]["Enums"]["ao_message_role"]
          thread_id: string
        }
        Insert: {
          content: string
          created_at?: string
          credits_used?: number
          id?: string
          input_tokens?: number
          model?: string | null
          org_id: string
          output_tokens?: number
          role: Database["public"]["Enums"]["ao_message_role"]
          thread_id: string
        }
        Update: {
          content?: string
          created_at?: string
          credits_used?: number
          id?: string
          input_tokens?: number
          model?: string | null
          org_id?: string
          output_tokens?: number
          role?: Database["public"]["Enums"]["ao_message_role"]
          thread_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ao_messages_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "ao_orgs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ao_messages_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "ao_threads"
            referencedColumns: ["id"]
          },
        ]
      }
      ao_org_members: {
        Row: {
          created_at: string
          org_id: string
          role: Database["public"]["Enums"]["ao_org_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          org_id: string
          role?: Database["public"]["Enums"]["ao_org_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          org_id?: string
          role?: Database["public"]["Enums"]["ao_org_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ao_org_members_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "ao_orgs"
            referencedColumns: ["id"]
          },
        ]
      }
      ao_orgs: {
        Row: {
          created_at: string
          created_by: string | null
          credits_balance: number
          id: string
          name: string
          plan: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          credits_balance?: number
          id?: string
          name: string
          plan?: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          credits_balance?: number
          id?: string
          name?: string
          plan?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      ao_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      ao_space_deployments: {
        Row: {
          created_at: string
          created_by: string | null
          external_id: string | null
          id: string
          org_id: string
          provider: Database["public"]["Enums"]["ao_space_deploy_provider"]
          space_id: string
          status: Database["public"]["Enums"]["ao_space_deploy_status"]
          url: string | null
          version_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          external_id?: string | null
          id?: string
          org_id: string
          provider?: Database["public"]["Enums"]["ao_space_deploy_provider"]
          space_id: string
          status?: Database["public"]["Enums"]["ao_space_deploy_status"]
          url?: string | null
          version_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          external_id?: string | null
          id?: string
          org_id?: string
          provider?: Database["public"]["Enums"]["ao_space_deploy_provider"]
          space_id?: string
          status?: Database["public"]["Enums"]["ao_space_deploy_status"]
          url?: string | null
          version_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ao_space_deployments_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "ao_orgs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ao_space_deployments_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "ao_spaces"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ao_space_deployments_version_id_fkey"
            columns: ["version_id"]
            isOneToOne: false
            referencedRelation: "ao_space_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      ao_space_files: {
        Row: {
          content: string | null
          content_type: string
          id: string
          org_id: string
          path: string
          space_id: string
          storage_key: string | null
          updated_at: string
        }
        Insert: {
          content?: string | null
          content_type?: string
          id?: string
          org_id: string
          path: string
          space_id: string
          storage_key?: string | null
          updated_at?: string
        }
        Update: {
          content?: string | null
          content_type?: string
          id?: string
          org_id?: string
          path?: string
          space_id?: string
          storage_key?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ao_space_files_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "ao_orgs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ao_space_files_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "ao_spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      ao_space_shares: {
        Row: {
          created_at: string
          created_by: string | null
          expires_at: string | null
          id: string
          org_id: string
          space_id: string
          token: string
          version_id: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          expires_at?: string | null
          id?: string
          org_id: string
          space_id: string
          token?: string
          version_id?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          expires_at?: string | null
          id?: string
          org_id?: string
          space_id?: string
          token?: string
          version_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ao_space_shares_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "ao_orgs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ao_space_shares_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "ao_spaces"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ao_space_shares_version_id_fkey"
            columns: ["version_id"]
            isOneToOne: false
            referencedRelation: "ao_space_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      ao_space_versions: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          manifest: Json
          message: string | null
          org_id: string
          space_id: string
          version_number: number
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          manifest?: Json
          message?: string | null
          org_id: string
          space_id: string
          version_number: number
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          manifest?: Json
          message?: string | null
          org_id?: string
          space_id?: string
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "ao_space_versions_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "ao_orgs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ao_space_versions_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "ao_spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      ao_spaces: {
        Row: {
          created_at: string
          created_by: string | null
          entry_path: string
          id: string
          org_id: string
          preview_mode: Database["public"]["Enums"]["ao_space_preview_mode"]
          public_slug: string | null
          published_version_id: string | null
          slug: string
          status: Database["public"]["Enums"]["ao_space_status"]
          thread_id: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          entry_path?: string
          id?: string
          org_id: string
          preview_mode?: Database["public"]["Enums"]["ao_space_preview_mode"]
          public_slug?: string | null
          published_version_id?: string | null
          slug: string
          status?: Database["public"]["Enums"]["ao_space_status"]
          thread_id?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          entry_path?: string
          id?: string
          org_id?: string
          preview_mode?: Database["public"]["Enums"]["ao_space_preview_mode"]
          public_slug?: string | null
          published_version_id?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["ao_space_status"]
          thread_id?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ao_spaces_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "ao_orgs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ao_spaces_published_version_id_fkey"
            columns: ["published_version_id"]
            isOneToOne: false
            referencedRelation: "ao_space_versions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ao_spaces_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "ao_threads"
            referencedColumns: ["id"]
          },
        ]
      }
      ao_threads: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          model: string
          org_id: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          model?: string
          org_id: string
          title?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          model?: string
          org_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ao_threads_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "ao_orgs"
            referencedColumns: ["id"]
          },
        ]
      }
      ao_user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      app_access: {
        Row: {
          app_id: string
          granted_at: string
          id: number
          user_id: string
        }
        Insert: {
          app_id: string
          granted_at?: string
          id?: never
          user_id: string
        }
        Update: {
          app_id?: string
          granted_at?: string
          id?: never
          user_id?: string
        }
        Relationships: []
      }
      app_config: {
        Row: {
          description: string | null
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          description?: string | null
          key: string
          updated_at?: string
          value: Json
        }
        Update: {
          description?: string | null
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      app_users: {
        Row: {
          avatar_url: string | null
          clerk_user_id: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          is_master_admin: boolean
          role: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          clerk_user_id?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id?: string
          is_master_admin?: boolean
          role?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          clerk_user_id?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          is_master_admin?: boolean
          role?: string
          updated_at?: string
        }
        Relationships: []
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
          absence_notification_sent_at: string | null
          check_in_method: string | null
          checked_in_at: string | null
          created_at: string
          enrollment_id: string | null
          hours_attended: number | null
          id: string
          instructor_verified_at: string | null
          instructor_verified_by: string | null
          marked_at: string | null
          marked_by: string | null
          notes: string | null
          organization_id: string | null
          override_by: string | null
          override_reason: string | null
          session_id: string
          status: string
          student_id: string | null
          updated_at: string
        }
        Insert: {
          absence_notification_sent_at?: string | null
          check_in_method?: string | null
          checked_in_at?: string | null
          created_at?: string
          enrollment_id?: string | null
          hours_attended?: number | null
          id?: string
          instructor_verified_at?: string | null
          instructor_verified_by?: string | null
          marked_at?: string | null
          marked_by?: string | null
          notes?: string | null
          organization_id?: string | null
          override_by?: string | null
          override_reason?: string | null
          session_id: string
          status?: string
          student_id?: string | null
          updated_at?: string
        }
        Update: {
          absence_notification_sent_at?: string | null
          check_in_method?: string | null
          checked_in_at?: string | null
          created_at?: string
          enrollment_id?: string | null
          hours_attended?: number | null
          id?: string
          instructor_verified_at?: string | null
          instructor_verified_by?: string | null
          marked_at?: string | null
          marked_by?: string | null
          notes?: string | null
          organization_id?: string | null
          override_by?: string | null
          override_reason?: string | null
          session_id?: string
          status?: string
          student_id?: string | null
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
      attendance_settings: {
        Row: {
          allow_kiosk_pin_backup: boolean
          check_in_window_open_minutes: number
          created_at: string
          id: string
          late_cutoff_minutes: number
          notify_absence_email: boolean
          notify_absence_sms: boolean
          organization_id: string
          qr_refresh_seconds: number
          require_instructor_verification: boolean
          updated_at: string
        }
        Insert: {
          allow_kiosk_pin_backup?: boolean
          check_in_window_open_minutes?: number
          created_at?: string
          id?: string
          late_cutoff_minutes?: number
          notify_absence_email?: boolean
          notify_absence_sms?: boolean
          organization_id: string
          qr_refresh_seconds?: number
          require_instructor_verification?: boolean
          updated_at?: string
        }
        Update: {
          allow_kiosk_pin_backup?: boolean
          check_in_window_open_minutes?: number
          created_at?: string
          id?: string
          late_cutoff_minutes?: number
          notify_absence_email?: boolean
          notify_absence_sms?: boolean
          organization_id?: string
          qr_refresh_seconds?: number
          require_instructor_verification?: boolean
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendance_settings_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: true
            referencedRelation: "organizations"
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
      bundle_components: {
        Row: {
          access_type: Database["public"]["Enums"]["bundle_access_type"]
          auto_enroll: boolean
          bundle_id: string
          component_program_id: string
          created_at: string
          duration_months: number | null
          id: string
          price_override: number | null
          sort_order: number
          updated_at: string
        }
        Insert: {
          access_type?: Database["public"]["Enums"]["bundle_access_type"]
          auto_enroll?: boolean
          bundle_id: string
          component_program_id: string
          created_at?: string
          duration_months?: number | null
          id?: string
          price_override?: number | null
          sort_order?: number
          updated_at?: string
        }
        Update: {
          access_type?: Database["public"]["Enums"]["bundle_access_type"]
          auto_enroll?: boolean
          bundle_id?: string
          component_program_id?: string
          created_at?: string
          duration_months?: number | null
          id?: string
          price_override?: number | null
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bundle_components_bundle_id_fkey"
            columns: ["bundle_id"]
            isOneToOne: false
            referencedRelation: "bundles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bundle_components_component_program_id_fkey"
            columns: ["component_program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      bundles: {
        Row: {
          active: boolean
          consecutive_cohorts: boolean | null
          created_at: string
          default_installment_amount: number
          deposit_amount: number
          description: string | null
          duration_label: string | null
          excluded_features: Json | null
          features: Json | null
          id: string
          interest_fee: number
          legacy_variant_id: string | null
          max_payments: number
          name: string
          organization_id: string | null
          popular: boolean | null
          practice_pass_count: number | null
          practice_reserve_count: number | null
          practice_weeks: number
          price: number
          sort_order: number
          source_program_id: string
          source_variant_id: string | null
          updated_at: string
        }
        Insert: {
          active?: boolean
          consecutive_cohorts?: boolean | null
          created_at?: string
          default_installment_amount?: number
          deposit_amount?: number
          description?: string | null
          duration_label?: string | null
          excluded_features?: Json | null
          features?: Json | null
          id?: string
          interest_fee?: number
          legacy_variant_id?: string | null
          max_payments?: number
          name: string
          organization_id?: string | null
          popular?: boolean | null
          practice_pass_count?: number | null
          practice_reserve_count?: number | null
          practice_weeks?: number
          price?: number
          sort_order?: number
          source_program_id: string
          source_variant_id?: string | null
          updated_at?: string
        }
        Update: {
          active?: boolean
          consecutive_cohorts?: boolean | null
          created_at?: string
          default_installment_amount?: number
          deposit_amount?: number
          description?: string | null
          duration_label?: string | null
          excluded_features?: Json | null
          features?: Json | null
          id?: string
          interest_fee?: number
          legacy_variant_id?: string | null
          max_payments?: number
          name?: string
          organization_id?: string | null
          popular?: boolean | null
          practice_pass_count?: number | null
          practice_reserve_count?: number | null
          practice_weeks?: number
          price?: number
          sort_order?: number
          source_program_id?: string
          source_variant_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bundles_legacy_variant_id_fkey"
            columns: ["legacy_variant_id"]
            isOneToOne: false
            referencedRelation: "program_variants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bundles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bundles_source_program_id_fkey"
            columns: ["source_program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bundles_source_variant_id_fkey"
            columns: ["source_variant_id"]
            isOneToOne: false
            referencedRelation: "program_variants"
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
      chat_messages: {
        Row: {
          attachments: Json
          content: string | null
          created_at: string
          id: string
          metadata: Json
          organization_id: string
          parts: Json
          role: string
          thread_id: string
          user_id: string | null
        }
        Insert: {
          attachments?: Json
          content?: string | null
          created_at?: string
          id?: string
          metadata?: Json
          organization_id: string
          parts?: Json
          role: string
          thread_id: string
          user_id?: string | null
        }
        Update: {
          attachments?: Json
          content?: string | null
          created_at?: string
          id?: string
          metadata?: Json
          organization_id?: string
          parts?: Json
          role?: string
          thread_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_messages_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "chat_threads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_messages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "app_users"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_threads: {
        Row: {
          created_at: string
          id: string
          organization_id: string
          title: string | null
          updated_at: string
          user_id: string | null
          visibility: string
        }
        Insert: {
          created_at?: string
          id?: string
          organization_id: string
          title?: string | null
          updated_at?: string
          user_id?: string | null
          visibility?: string
        }
        Update: {
          created_at?: string
          id?: string
          organization_id?: string
          title?: string | null
          updated_at?: string
          user_id?: string | null
          visibility?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_threads_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_threads_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "app_users"
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
          organization_id: string | null
          program_id: string
          room_id: string | null
          schedule_version: number | null
          session_date: string
          session_type: string
          start_time: string
          status: string
          updated_at: string
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
          organization_id?: string | null
          program_id: string
          room_id?: string | null
          schedule_version?: number | null
          session_date: string
          session_type?: string
          start_time: string
          status?: string
          updated_at?: string
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
          organization_id?: string | null
          program_id?: string
          room_id?: string | null
          schedule_version?: number | null
          session_date?: string
          session_type?: string
          start_time?: string
          status?: string
          updated_at?: string
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
            foreignKeyName: "class_sessions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "class_sessions_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "class_sessions_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      classrooms: {
        Row: {
          active: boolean
          capacity: number
          created_at: string
          description: string | null
          id: string
          location: string | null
          name: string
          organization_id: string | null
          sort_order: number
          updated_at: string
        }
        Insert: {
          active?: boolean
          capacity?: number
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          name: string
          organization_id?: string | null
          sort_order?: number
          updated_at?: string
        }
        Update: {
          active?: boolean
          capacity?: number
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          name?: string
          organization_id?: string | null
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "classrooms_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      clerk_import_queue: {
        Row: {
          attempted_at: string | null
          clerk_user_id: string | null
          email: string
          error: string | null
          first_name: string | null
          http_status: number | null
          last_name: string | null
          status: string
          user_id: string
        }
        Insert: {
          attempted_at?: string | null
          clerk_user_id?: string | null
          email: string
          error?: string | null
          first_name?: string | null
          http_status?: number | null
          last_name?: string | null
          status?: string
          user_id: string
        }
        Update: {
          attempted_at?: string | null
          clerk_user_id?: string | null
          email?: string
          error?: string | null
          first_name?: string | null
          http_status?: number | null
          last_name?: string | null
          status?: string
          user_id?: string
        }
        Relationships: []
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
      client_error_logs: {
        Row: {
          ai_attempted_at: string | null
          ai_diagnosis: string | null
          ai_suggested_fix: string | null
          context: Json | null
          error_type: string
          first_seen_at: string
          id: string
          last_remediation_at: string | null
          last_seen_at: string
          message: string
          occurrence_count: number
          recommended_action: string | null
          remediation_count: number
          resolved_at: string | null
          resolved_by: string | null
          route: string | null
          session_id: string | null
          source: string | null
          stack: string | null
          status: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          ai_attempted_at?: string | null
          ai_diagnosis?: string | null
          ai_suggested_fix?: string | null
          context?: Json | null
          error_type?: string
          first_seen_at?: string
          id?: string
          last_remediation_at?: string | null
          last_seen_at?: string
          message: string
          occurrence_count?: number
          recommended_action?: string | null
          remediation_count?: number
          resolved_at?: string | null
          resolved_by?: string | null
          route?: string | null
          session_id?: string | null
          source?: string | null
          stack?: string | null
          status?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          ai_attempted_at?: string | null
          ai_diagnosis?: string | null
          ai_suggested_fix?: string | null
          context?: Json | null
          error_type?: string
          first_seen_at?: string
          id?: string
          last_remediation_at?: string | null
          last_seen_at?: string
          message?: string
          occurrence_count?: number
          recommended_action?: string | null
          remediation_count?: number
          resolved_at?: string | null
          resolved_by?: string | null
          route?: string | null
          session_id?: string | null
          source?: string | null
          stack?: string | null
          status?: string
          user_agent?: string | null
          user_id?: string | null
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
          classroom_id: string | null
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
          schedule_tag: string | null
          schedule_tag_override: boolean
          schedule_template_id: string | null
          schedule_version: number
          start_date: string
          status: string
          template_snapshot: Json
          updated_at: string
          variation_id: string | null
        }
        Insert: {
          classroom_id?: string | null
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
          schedule_tag?: string | null
          schedule_tag_override?: boolean
          schedule_template_id?: string | null
          schedule_version?: number
          start_date: string
          status?: string
          template_snapshot?: Json
          updated_at?: string
          variation_id?: string | null
        }
        Update: {
          classroom_id?: string | null
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
          schedule_tag?: string | null
          schedule_tag_override?: boolean
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
            foreignKeyName: "cohorts_classroom_id_fkey"
            columns: ["classroom_id"]
            isOneToOne: false
            referencedRelation: "classrooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cohorts_classroom_id_fkey"
            columns: ["classroom_id"]
            isOneToOne: false
            referencedRelation: "v_classroom_load"
            referencedColumns: ["classroom_id"]
          },
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
      components: {
        Row: {
          code: string | null
          compiled_css: string | null
          component_names: Json
          component_slug: string
          created_at: string | null
          demo_code: string | null
          demo_dependencies: Json | null
          demo_direct_registry_dependencies: Json | null
          dependencies: Json | null
          description: string | null
          direct_registry_dependencies: Json | null
          downloads_count: number | null
          global_css_extension: string | null
          id: number
          is_paid: boolean | null
          is_public: boolean | null
          likes_count: number | null
          name: string
          payment_url: string | null
          preview_url: string
          tailwind_config_extension: string | null
          updated_at: string | null
        }
        Insert: {
          code?: string | null
          compiled_css?: string | null
          component_names: Json
          component_slug: string
          created_at?: string | null
          demo_code?: string | null
          demo_dependencies?: Json | null
          demo_direct_registry_dependencies?: Json | null
          dependencies?: Json | null
          description?: string | null
          direct_registry_dependencies?: Json | null
          downloads_count?: number | null
          global_css_extension?: string | null
          id: number
          is_paid?: boolean | null
          is_public?: boolean | null
          likes_count?: number | null
          name: string
          payment_url?: string | null
          preview_url: string
          tailwind_config_extension?: string | null
          updated_at?: string | null
        }
        Update: {
          code?: string | null
          compiled_css?: string | null
          component_names?: Json
          component_slug?: string
          created_at?: string | null
          demo_code?: string | null
          demo_dependencies?: Json | null
          demo_direct_registry_dependencies?: Json | null
          dependencies?: Json | null
          description?: string | null
          direct_registry_dependencies?: Json | null
          downloads_count?: number | null
          global_css_extension?: string | null
          id?: number
          is_paid?: boolean | null
          is_public?: boolean | null
          likes_count?: number | null
          name?: string
          payment_url?: string | null
          preview_url?: string
          tailwind_config_extension?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      connected_accounts: {
        Row: {
          created_at: string
          external_user_id: string | null
          id: string
          metadata: Json
          organization_id: string
          provider: string
          provider_account_id: string | null
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          external_user_id?: string | null
          id?: string
          metadata?: Json
          organization_id: string
          provider: string
          provider_account_id?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          external_user_id?: string | null
          id?: string
          metadata?: Json
          organization_id?: string
          provider?: string
          provider_account_id?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "connected_accounts_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "connected_accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "app_users"
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
      discount_codes: {
        Row: {
          active: boolean
          amount_off: number | null
          approved_by: string | null
          code: string
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          percent_off: number | null
        }
        Insert: {
          active?: boolean
          amount_off?: number | null
          approved_by?: string | null
          code: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          percent_off?: number | null
        }
        Update: {
          active?: boolean
          amount_off?: number | null
          approved_by?: string | null
          code?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          percent_off?: number | null
        }
        Relationships: []
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
      enrollment_keys: {
        Row: {
          code: string
          created_at: string
          expires_at: string
          id: string
          issued_at: string
          notes: string | null
          organization_id: string | null
          owner_user_id: string
          program_id: string
          redeemed_at: string | null
          redeemed_cohort_id: string | null
          redeemed_enrollment_id: string | null
          revoked_at: string | null
          revoked_reason: string | null
          source: Database["public"]["Enums"]["enrollment_key_source"]
          source_enrollment_id: string | null
          source_order_id: string | null
          status: Database["public"]["Enums"]["enrollment_key_status"]
          updated_at: string
          value_cents: number
          variant_id: string | null
        }
        Insert: {
          code: string
          created_at?: string
          expires_at?: string
          id?: string
          issued_at?: string
          notes?: string | null
          organization_id?: string | null
          owner_user_id: string
          program_id: string
          redeemed_at?: string | null
          redeemed_cohort_id?: string | null
          redeemed_enrollment_id?: string | null
          revoked_at?: string | null
          revoked_reason?: string | null
          source: Database["public"]["Enums"]["enrollment_key_source"]
          source_enrollment_id?: string | null
          source_order_id?: string | null
          status?: Database["public"]["Enums"]["enrollment_key_status"]
          updated_at?: string
          value_cents?: number
          variant_id?: string | null
        }
        Update: {
          code?: string
          created_at?: string
          expires_at?: string
          id?: string
          issued_at?: string
          notes?: string | null
          organization_id?: string | null
          owner_user_id?: string
          program_id?: string
          redeemed_at?: string | null
          redeemed_cohort_id?: string | null
          redeemed_enrollment_id?: string | null
          revoked_at?: string | null
          revoked_reason?: string | null
          source?: Database["public"]["Enums"]["enrollment_key_source"]
          source_enrollment_id?: string | null
          source_order_id?: string | null
          status?: Database["public"]["Enums"]["enrollment_key_status"]
          updated_at?: string
          value_cents?: number
          variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "enrollment_keys_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollment_keys_redeemed_cohort_id_fkey"
            columns: ["redeemed_cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollment_keys_redeemed_enrollment_id_fkey"
            columns: ["redeemed_enrollment_id"]
            isOneToOne: false
            referencedRelation: "enrollments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollment_keys_source_enrollment_id_fkey"
            columns: ["source_enrollment_id"]
            isOneToOne: false
            referencedRelation: "enrollments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollment_keys_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "program_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      enrollments: {
        Row: {
          actual_end_date: string | null
          amount_paid: number
          bundle_id: string | null
          certificate_url: string | null
          certification_status: string
          cohort_id: string | null
          created_at: string
          discount_amount: number
          enrollment_date: string
          enrollment_kind: string
          eventbrite_attendee_id: string | null
          expected_end_date: string | null
          id: string
          import_batch_id: string | null
          instructor_name: string | null
          list_price: number
          notes: string | null
          organization_id: string | null
          parent_enrollment_id: string | null
          pass_number: number | null
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
          suspended: boolean
          suspended_at: string | null
          suspended_by: string | null
          suspended_reason: string | null
          total_tuition: number
          updated_at: string
          user_id: string
          variant_id: string | null
        }
        Insert: {
          actual_end_date?: string | null
          amount_paid?: number
          bundle_id?: string | null
          certificate_url?: string | null
          certification_status?: string
          cohort_id?: string | null
          created_at?: string
          discount_amount?: number
          enrollment_date?: string
          enrollment_kind?: string
          eventbrite_attendee_id?: string | null
          expected_end_date?: string | null
          id?: string
          import_batch_id?: string | null
          instructor_name?: string | null
          list_price?: number
          notes?: string | null
          organization_id?: string | null
          parent_enrollment_id?: string | null
          pass_number?: number | null
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
          suspended?: boolean
          suspended_at?: string | null
          suspended_by?: string | null
          suspended_reason?: string | null
          total_tuition?: number
          updated_at?: string
          user_id: string
          variant_id?: string | null
        }
        Update: {
          actual_end_date?: string | null
          amount_paid?: number
          bundle_id?: string | null
          certificate_url?: string | null
          certification_status?: string
          cohort_id?: string | null
          created_at?: string
          discount_amount?: number
          enrollment_date?: string
          enrollment_kind?: string
          eventbrite_attendee_id?: string | null
          expected_end_date?: string | null
          id?: string
          import_batch_id?: string | null
          instructor_name?: string | null
          list_price?: number
          notes?: string | null
          organization_id?: string | null
          parent_enrollment_id?: string | null
          pass_number?: number | null
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
          suspended?: boolean
          suspended_at?: string | null
          suspended_by?: string | null
          suspended_reason?: string | null
          total_tuition?: number
          updated_at?: string
          user_id?: string
          variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_bundle_id_fkey"
            columns: ["bundle_id"]
            isOneToOne: false
            referencedRelation: "bundles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_cohort_id_fkey"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_import_batch_id_fkey"
            columns: ["import_batch_id"]
            isOneToOne: false
            referencedRelation: "import_batches"
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
            foreignKeyName: "enrollments_parent_enrollment_id_fkey"
            columns: ["parent_enrollment_id"]
            isOneToOne: false
            referencedRelation: "enrollments"
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
      error_alert_config: {
        Row: {
          baseline_hours: number
          cooldown_minutes: number
          created_at: string
          email_recipients: string[]
          enabled: boolean
          generic_webhook_url: string | null
          id: string
          last_alert_at: string | null
          slack_webhook_url: string | null
          spike_multiplier: number
          threshold_count: number
          updated_at: string
          window_minutes: number
        }
        Insert: {
          baseline_hours?: number
          cooldown_minutes?: number
          created_at?: string
          email_recipients?: string[]
          enabled?: boolean
          generic_webhook_url?: string | null
          id?: string
          last_alert_at?: string | null
          slack_webhook_url?: string | null
          spike_multiplier?: number
          threshold_count?: number
          updated_at?: string
          window_minutes?: number
        }
        Update: {
          baseline_hours?: number
          cooldown_minutes?: number
          created_at?: string
          email_recipients?: string[]
          enabled?: boolean
          generic_webhook_url?: string | null
          id?: string
          last_alert_at?: string | null
          slack_webhook_url?: string | null
          spike_multiplier?: number
          threshold_count?: number
          updated_at?: string
          window_minutes?: number
        }
        Relationships: []
      }
      error_alert_events: {
        Row: {
          alert_type: string
          baseline_avg: number | null
          channel_results: Json
          channels_notified: string[]
          error_count: number
          id: string
          notes: string | null
          sample_errors: Json
          triggered_at: string
          window_minutes: number
        }
        Insert: {
          alert_type: string
          baseline_avg?: number | null
          channel_results?: Json
          channels_notified?: string[]
          error_count: number
          id?: string
          notes?: string | null
          sample_errors?: Json
          triggered_at?: string
          window_minutes: number
        }
        Update: {
          alert_type?: string
          baseline_avg?: number | null
          channel_results?: Json
          channels_notified?: string[]
          error_count?: number
          id?: string
          notes?: string | null
          sample_errors?: Json
          triggered_at?: string
          window_minutes?: number
        }
        Relationships: []
      }
      flow_completion_events: {
        Row: {
          attribution: Json | null
          created_at: string
          flow_id: string
          flow_name: string | null
          flow_variant: string | null
          id: string
          last_step_id: string | null
          last_step_index: number | null
          last_step_type: string | null
          metadata: Json
          organization_id: string | null
          outcome: string
          reason: string | null
          redirect_url: string | null
          session_id: string | null
          total_steps: number | null
          user_id: string | null
          user_status: string | null
        }
        Insert: {
          attribution?: Json | null
          created_at?: string
          flow_id: string
          flow_name?: string | null
          flow_variant?: string | null
          id?: string
          last_step_id?: string | null
          last_step_index?: number | null
          last_step_type?: string | null
          metadata?: Json
          organization_id?: string | null
          outcome: string
          reason?: string | null
          redirect_url?: string | null
          session_id?: string | null
          total_steps?: number | null
          user_id?: string | null
          user_status?: string | null
        }
        Update: {
          attribution?: Json | null
          created_at?: string
          flow_id?: string
          flow_name?: string | null
          flow_variant?: string | null
          id?: string
          last_step_id?: string | null
          last_step_index?: number | null
          last_step_type?: string | null
          metadata?: Json
          organization_id?: string | null
          outcome?: string
          reason?: string | null
          redirect_url?: string | null
          session_id?: string | null
          total_steps?: number | null
          user_id?: string | null
          user_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "flow_completion_events_flow_id_fkey"
            columns: ["flow_id"]
            isOneToOne: false
            referencedRelation: "flows"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flow_completion_events_last_step_id_fkey"
            columns: ["last_step_id"]
            isOneToOne: false
            referencedRelation: "flow_steps"
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
      flow_signatures: {
        Row: {
          acknowledgments: Json
          agreement_template_id: string | null
          created_at: string
          flow_id: string | null
          id: string
          ip_address: string | null
          signature_text: string
          signed_at: string
          step_id: string | null
          template_version: number | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          acknowledgments?: Json
          agreement_template_id?: string | null
          created_at?: string
          flow_id?: string | null
          id?: string
          ip_address?: string | null
          signature_text: string
          signed_at?: string
          step_id?: string | null
          template_version?: number | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          acknowledgments?: Json
          agreement_template_id?: string | null
          created_at?: string
          flow_id?: string | null
          id?: string
          ip_address?: string | null
          signature_text?: string
          signed_at?: string
          step_id?: string | null
          template_version?: number | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "flow_signatures_agreement_template_id_fkey"
            columns: ["agreement_template_id"]
            isOneToOne: false
            referencedRelation: "agreement_templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flow_signatures_flow_id_fkey"
            columns: ["flow_id"]
            isOneToOne: false
            referencedRelation: "flows"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flow_signatures_step_id_fkey"
            columns: ["step_id"]
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
          completion_redirect_url: string | null
          created_at: string
          description: string | null
          flow_type: string
          id: string
          is_active: boolean
          is_default: boolean
          is_template: boolean
          name: string
          organization_id: string | null
          slug: string | null
          updated_at: string
        }
        Insert: {
          completion_redirect_url?: string | null
          created_at?: string
          description?: string | null
          flow_type?: string
          id?: string
          is_active?: boolean
          is_default?: boolean
          is_template?: boolean
          name: string
          organization_id?: string | null
          slug?: string | null
          updated_at?: string
        }
        Update: {
          completion_redirect_url?: string | null
          created_at?: string
          description?: string | null
          flow_type?: string
          id?: string
          is_active?: boolean
          is_default?: boolean
          is_template?: boolean
          name?: string
          organization_id?: string | null
          slug?: string | null
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
          cohort_frequency_anchor_date: string | null
          cohort_frequency_weeks: number
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
          cohort_frequency_anchor_date?: string | null
          cohort_frequency_weeks?: number
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
          cohort_frequency_anchor_date?: string | null
          cohort_frequency_weeks?: number
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
      import_batch_rows: {
        Row: {
          account_created: boolean
          batch_id: string
          created_at: string
          email: string | null
          enrollment_id: string | null
          error_message: string | null
          eventbrite_attendee_id: string | null
          first_name: string | null
          id: string
          input: Json
          last_name: string | null
          outcome: Database["public"]["Enums"]["import_row_outcome"]
          phone: string | null
          row_index: number
          updated_at: string
          user_id: string | null
          welcome_email_sent: boolean
        }
        Insert: {
          account_created?: boolean
          batch_id: string
          created_at?: string
          email?: string | null
          enrollment_id?: string | null
          error_message?: string | null
          eventbrite_attendee_id?: string | null
          first_name?: string | null
          id?: string
          input?: Json
          last_name?: string | null
          outcome?: Database["public"]["Enums"]["import_row_outcome"]
          phone?: string | null
          row_index: number
          updated_at?: string
          user_id?: string | null
          welcome_email_sent?: boolean
        }
        Update: {
          account_created?: boolean
          batch_id?: string
          created_at?: string
          email?: string | null
          enrollment_id?: string | null
          error_message?: string | null
          eventbrite_attendee_id?: string | null
          first_name?: string | null
          id?: string
          input?: Json
          last_name?: string | null
          outcome?: Database["public"]["Enums"]["import_row_outcome"]
          phone?: string | null
          row_index?: number
          updated_at?: string
          user_id?: string | null
          welcome_email_sent?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "import_batch_rows_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "import_batches"
            referencedColumns: ["id"]
          },
        ]
      }
      import_batches: {
        Row: {
          cohort_id: string
          completed_at: string | null
          created_at: string
          error_message: string | null
          failed_count: number
          id: string
          imported_by: string
          options: Json
          organization_id: string | null
          program_id: string
          rolled_back_at: string | null
          skipped_count: number
          source: Database["public"]["Enums"]["import_batch_source"]
          source_ref: string | null
          started_at: string | null
          status: Database["public"]["Enums"]["import_batch_status"]
          succeeded_count: number
          total_rows: number
          updated_at: string
        }
        Insert: {
          cohort_id: string
          completed_at?: string | null
          created_at?: string
          error_message?: string | null
          failed_count?: number
          id?: string
          imported_by: string
          options?: Json
          organization_id?: string | null
          program_id: string
          rolled_back_at?: string | null
          skipped_count?: number
          source: Database["public"]["Enums"]["import_batch_source"]
          source_ref?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["import_batch_status"]
          succeeded_count?: number
          total_rows?: number
          updated_at?: string
        }
        Update: {
          cohort_id?: string
          completed_at?: string | null
          created_at?: string
          error_message?: string | null
          failed_count?: number
          id?: string
          imported_by?: string
          options?: Json
          organization_id?: string | null
          program_id?: string
          rolled_back_at?: string | null
          skipped_count?: number
          source?: Database["public"]["Enums"]["import_batch_source"]
          source_ref?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["import_batch_status"]
          succeeded_count?: number
          total_rows?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "import_batches_cohort_id_fkey"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
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
          api_token_secret_id: string | null
          integration_id: string
          oauth_access_token_secret_id: string | null
          oauth_expires_at: string | null
          oauth_refresh_token_secret_id: string | null
          updated_at: string
        }
        Insert: {
          api_key_secret_id?: string | null
          api_token_secret_id?: string | null
          integration_id: string
          oauth_access_token_secret_id?: string | null
          oauth_expires_at?: string | null
          oauth_refresh_token_secret_id?: string | null
          updated_at?: string
        }
        Update: {
          api_key_secret_id?: string | null
          api_token_secret_id?: string | null
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
          booking_timezone: string
          calendar_sync_enabled: boolean
          contact_app_base_url: string
          contact_default_source: string
          created_at: string
          default_calendar_id: string | null
          enabled: boolean
          enrollment_pipeline_id: string | null
          enrollment_stage_id: string | null
          id: string
          inbound_webhook_secret: string
          invoice_sync_enabled: boolean
          location_id: string | null
          name: string | null
          organization_id: string | null
          outbound_webhook_enabled: boolean
          outbound_webhook_url: string | null
          payment_sync_enabled: boolean
          provider: string
          updated_at: string
        }
        Insert: {
          base_url?: string | null
          booking_timezone?: string
          calendar_sync_enabled?: boolean
          contact_app_base_url?: string
          contact_default_source?: string
          created_at?: string
          default_calendar_id?: string | null
          enabled?: boolean
          enrollment_pipeline_id?: string | null
          enrollment_stage_id?: string | null
          id?: string
          inbound_webhook_secret: string
          invoice_sync_enabled?: boolean
          location_id?: string | null
          name?: string | null
          organization_id?: string | null
          outbound_webhook_enabled?: boolean
          outbound_webhook_url?: string | null
          payment_sync_enabled?: boolean
          provider: string
          updated_at?: string
        }
        Update: {
          base_url?: string | null
          booking_timezone?: string
          calendar_sync_enabled?: boolean
          contact_app_base_url?: string
          contact_default_source?: string
          created_at?: string
          default_calendar_id?: string | null
          enabled?: boolean
          enrollment_pipeline_id?: string | null
          enrollment_stage_id?: string | null
          id?: string
          inbound_webhook_secret?: string
          invoice_sync_enabled?: boolean
          location_id?: string | null
          name?: string | null
          organization_id?: string | null
          outbound_webhook_enabled?: boolean
          outbound_webhook_url?: string | null
          payment_sync_enabled?: boolean
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
      invoice_links: {
        Row: {
          amount_paid_synced: number
          amount_total: number
          created_at: string
          ghl_contact_id: string | null
          ghl_invoice_id: string
          id: string
          integration_id: string
          last_error: string | null
          last_inbound_at: string | null
          last_outbound_at: string | null
          order_id: string
          status: string
          updated_at: string
        }
        Insert: {
          amount_paid_synced?: number
          amount_total?: number
          created_at?: string
          ghl_contact_id?: string | null
          ghl_invoice_id: string
          id?: string
          integration_id: string
          last_error?: string | null
          last_inbound_at?: string | null
          last_outbound_at?: string | null
          order_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          amount_paid_synced?: number
          amount_total?: number
          created_at?: string
          ghl_contact_id?: string | null
          ghl_invoice_id?: string
          id?: string
          integration_id?: string
          last_error?: string | null
          last_inbound_at?: string | null
          last_outbound_at?: string | null
          order_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoice_links_integration_id_fkey"
            columns: ["integration_id"]
            isOneToOne: false
            referencedRelation: "integrations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_links_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: true
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_payment_links: {
        Row: {
          amount: number
          created_at: string
          direction: string
          ghl_invoice_id: string
          ghl_payment_id: string | null
          id: string
          installment_id: string | null
          integration_id: string
          order_id: string
          our_payment_log_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          direction: string
          ghl_invoice_id: string
          ghl_payment_id?: string | null
          id?: string
          installment_id?: string | null
          integration_id: string
          order_id: string
          our_payment_log_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          direction?: string
          ghl_invoice_id?: string
          ghl_payment_id?: string | null
          id?: string
          installment_id?: string | null
          integration_id?: string
          order_id?: string
          our_payment_log_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoice_payment_links_installment_id_fkey"
            columns: ["installment_id"]
            isOneToOne: false
            referencedRelation: "payment_plan_installments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_payment_links_integration_id_fkey"
            columns: ["integration_id"]
            isOneToOne: false
            referencedRelation: "integrations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_payment_links_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_payment_links_our_payment_log_id_fkey"
            columns: ["our_payment_log_id"]
            isOneToOne: false
            referencedRelation: "payment_logs"
            referencedColumns: ["id"]
          },
        ]
      }
      kiosk_assignments: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          kiosk_user_id: string
          location_name: string | null
          organization_id: string
          room_id: string | null
          room_name: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          kiosk_user_id: string
          location_name?: string | null
          organization_id: string
          room_id?: string | null
          room_name?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          kiosk_user_id?: string
          location_name?: string | null
          organization_id?: string
          room_id?: string | null
          room_name?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "kiosk_assignments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kiosk_assignments_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
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
      lead_assignments: {
        Row: {
          assignee_user_id: string | null
          created_at: string
          first_contacted_at: string | null
          id: string
          notes: string | null
          organization_id: string | null
          profile_id: string
          updated_at: string
        }
        Insert: {
          assignee_user_id?: string | null
          created_at?: string
          first_contacted_at?: string | null
          id?: string
          notes?: string | null
          organization_id?: string | null
          profile_id: string
          updated_at?: string
        }
        Update: {
          assignee_user_id?: string | null
          created_at?: string
          first_contacted_at?: string | null
          id?: string
          notes?: string | null
          organization_id?: string | null
          profile_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      lead_center_saved_views: {
        Row: {
          created_at: string
          filters: Json
          id: string
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          filters?: Json
          id?: string
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          filters?: Json
          id?: string
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          alt_emails: string[]
          alt_phones: string[]
          created_at: string
          email: string
          id: string
          name: string
          phone: string
          program: string
        }
        Insert: {
          alt_emails?: string[]
          alt_phones?: string[]
          created_at?: string
          email: string
          id?: string
          name: string
          phone: string
          program: string
        }
        Update: {
          alt_emails?: string[]
          alt_phones?: string[]
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
      oneos_events: {
        Row: {
          created_at: string
          id: string
          kind: string
          payload: Json
          related_project_id: string | null
          related_task_id: string | null
          thread_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          kind: string
          payload?: Json
          related_project_id?: string | null
          related_task_id?: string | null
          thread_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          kind?: string
          payload?: Json
          related_project_id?: string | null
          related_task_id?: string | null
          thread_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "oneos_events_related_project_id_fkey"
            columns: ["related_project_id"]
            isOneToOne: false
            referencedRelation: "oneos_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "oneos_events_related_task_id_fkey"
            columns: ["related_task_id"]
            isOneToOne: false
            referencedRelation: "oneos_tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "oneos_events_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "oneos_threads"
            referencedColumns: ["id"]
          },
        ]
      }
      oneos_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          parts: Json
          role: string
          thread_id: string
          user_id: string
        }
        Insert: {
          content?: string
          created_at?: string
          id?: string
          parts?: Json
          role: string
          thread_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          parts?: Json
          role?: string
          thread_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "oneos_messages_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "oneos_threads"
            referencedColumns: ["id"]
          },
        ]
      }
      oneos_projects: {
        Row: {
          ai_summary: string | null
          category: string | null
          created_at: string
          id: string
          notes: string | null
          priority: number
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_summary?: string | null
          category?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          priority?: number
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_summary?: string | null
          category?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          priority?: number
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      oneos_tasks: {
        Row: {
          category: string
          completed_at: string | null
          created_at: string
          due_date: string | null
          id: string
          notes: string | null
          priority: number
          project_id: string | null
          source_message_id: string | null
          status: string
          tags: string[]
          thread_id: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: string
          completed_at?: string | null
          created_at?: string
          due_date?: string | null
          id?: string
          notes?: string | null
          priority?: number
          project_id?: string | null
          source_message_id?: string | null
          status?: string
          tags?: string[]
          thread_id?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          completed_at?: string | null
          created_at?: string
          due_date?: string | null
          id?: string
          notes?: string | null
          priority?: number
          project_id?: string | null
          source_message_id?: string | null
          status?: string
          tags?: string[]
          thread_id?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "oneos_tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "oneos_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "oneos_tasks_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "oneos_threads"
            referencedColumns: ["id"]
          },
        ]
      }
      oneos_threads: {
        Row: {
          created_at: string
          id: string
          last_message_at: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_message_at?: string
          title?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          last_message_at?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
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
          auto_charge_enabled: boolean
          bundle_id: string | null
          cohort_id: string | null
          created_at: string
          deposit_paid: number
          discount_amount: number
          id: string
          line_items: Json
          list_price: number
          order_status: string
          payment_option: string
          payment_status: string
          program_id: string
          reservation_expires_at: string | null
          reserved_at: string | null
          salesflow_invoice_id: string | null
          salesflow_synced: boolean
          square_card_id: string | null
          square_customer_id: string | null
          start_date_pending: boolean
          total_amount: number
          updated_at: string
          user_id: string | null
          variant_id: string | null
        }
        Insert: {
          auto_charge_enabled?: boolean
          bundle_id?: string | null
          cohort_id?: string | null
          created_at?: string
          deposit_paid?: number
          discount_amount?: number
          id?: string
          line_items?: Json
          list_price?: number
          order_status?: string
          payment_option?: string
          payment_status?: string
          program_id: string
          reservation_expires_at?: string | null
          reserved_at?: string | null
          salesflow_invoice_id?: string | null
          salesflow_synced?: boolean
          square_card_id?: string | null
          square_customer_id?: string | null
          start_date_pending?: boolean
          total_amount?: number
          updated_at?: string
          user_id?: string | null
          variant_id?: string | null
        }
        Update: {
          auto_charge_enabled?: boolean
          bundle_id?: string | null
          cohort_id?: string | null
          created_at?: string
          deposit_paid?: number
          discount_amount?: number
          id?: string
          line_items?: Json
          list_price?: number
          order_status?: string
          payment_option?: string
          payment_status?: string
          program_id?: string
          reservation_expires_at?: string | null
          reserved_at?: string | null
          salesflow_invoice_id?: string | null
          salesflow_synced?: boolean
          square_card_id?: string | null
          square_customer_id?: string | null
          start_date_pending?: boolean
          total_amount?: number
          updated_at?: string
          user_id?: string | null
          variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_bundle_id_fkey"
            columns: ["bundle_id"]
            isOneToOne: false
            referencedRelation: "bundles"
            referencedColumns: ["id"]
          },
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
      organization_members: {
        Row: {
          clerk_org_id: string
          clerk_user_id: string | null
          created_at: string
          id: string
          organization_id: string
          role: string
          updated_at: string
          user_id: string
        }
        Insert: {
          clerk_org_id: string
          clerk_user_id?: string | null
          created_at?: string
          id?: string
          organization_id: string
          role?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          clerk_org_id?: string
          clerk_user_id?: string | null
          created_at?: string
          id?: string
          organization_id?: string
          role?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_members_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          clerk_org_id: string | null
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
          clerk_org_id?: string | null
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
          clerk_org_id?: string | null
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
          external_payment_id: string | null
          id: string
          installment_id: string | null
          match_confidence: string | null
          match_status: string
          matched_at: string | null
          matched_by: string | null
          order_id: string | null
          provider: string
          provider_transaction_id: string | null
          raw_response_json: Json | null
          source: string
          square_customer_id: string | null
          status: string
          student_match_confidence: string | null
          student_match_details: Json
          student_match_status: string
          student_matched_at: string | null
          user_id: string | null
        }
        Insert: {
          amount?: number
          created_at?: string
          external_payment_id?: string | null
          id?: string
          installment_id?: string | null
          match_confidence?: string | null
          match_status?: string
          matched_at?: string | null
          matched_by?: string | null
          order_id?: string | null
          provider?: string
          provider_transaction_id?: string | null
          raw_response_json?: Json | null
          source?: string
          square_customer_id?: string | null
          status?: string
          student_match_confidence?: string | null
          student_match_details?: Json
          student_match_status?: string
          student_matched_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          external_payment_id?: string | null
          id?: string
          installment_id?: string | null
          match_confidence?: string | null
          match_status?: string
          matched_at?: string | null
          matched_by?: string | null
          order_id?: string | null
          provider?: string
          provider_transaction_id?: string | null
          raw_response_json?: Json | null
          source?: string
          square_customer_id?: string | null
          status?: string
          student_match_confidence?: string | null
          student_match_details?: Json
          student_match_status?: string
          student_matched_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_logs_installment_id_fkey"
            columns: ["installment_id"]
            isOneToOne: false
            referencedRelation: "payment_plan_installments"
            referencedColumns: ["id"]
          },
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
          amount_paid: number
          created_at: string
          due_date: string
          enrollment_id: string | null
          failure_reason: string | null
          flagged_for_review: boolean
          ghl_schedule_id: string | null
          id: string
          installment_number: number
          last_attempt_at: string | null
          next_retry_at: string | null
          order_id: string
          paid_at: string | null
          resolved_at: string | null
          resolved_by: string | null
          retry_count: number
          square_payment_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          amount?: number
          amount_paid?: number
          created_at?: string
          due_date: string
          enrollment_id?: string | null
          failure_reason?: string | null
          flagged_for_review?: boolean
          ghl_schedule_id?: string | null
          id?: string
          installment_number: number
          last_attempt_at?: string | null
          next_retry_at?: string | null
          order_id: string
          paid_at?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          retry_count?: number
          square_payment_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          amount_paid?: number
          created_at?: string
          due_date?: string
          enrollment_id?: string | null
          failure_reason?: string | null
          flagged_for_review?: boolean
          ghl_schedule_id?: string | null
          id?: string
          installment_number?: number
          last_attempt_at?: string | null
          next_retry_at?: string | null
          order_id?: string
          paid_at?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          retry_count?: number
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
      payment_reconciliation_log: {
        Row: {
          details: Json
          enrollment_amount_paid: number | null
          expected_paid: number | null
          id: string
          order_deposit_paid: number | null
          order_id: string | null
          ran_at: string
          status: string
          user_id: string | null
        }
        Insert: {
          details?: Json
          enrollment_amount_paid?: number | null
          expected_paid?: number | null
          id?: string
          order_deposit_paid?: number | null
          order_id?: string | null
          ran_at?: string
          status?: string
          user_id?: string | null
        }
        Update: {
          details?: Json
          enrollment_amount_paid?: number | null
          expected_paid?: number | null
          id?: string
          order_deposit_paid?: number | null
          order_id?: string | null
          ran_at?: string
          status?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_reconciliation_log_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_reminders: {
        Row: {
          id: string
          installment_id: string
          reminder_kind: string
          sent_at: string
          sent_to: string | null
        }
        Insert: {
          id?: string
          installment_id: string
          reminder_kind: string
          sent_at?: string
          sent_to?: string | null
        }
        Update: {
          id?: string
          installment_id?: string
          reminder_kind?: string
          sent_at?: string
          sent_to?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_reminders_installment_id_fkey"
            columns: ["installment_id"]
            isOneToOne: false
            referencedRelation: "payment_plan_installments"
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
      pending_lead_followups: {
        Row: {
          attempt_count: number
          cancelled_reason: string | null
          created_at: string
          dispatched_at: string | null
          error_message: string | null
          id: string
          last_attempt_at: string | null
          lead_application_id: string
          profile_id: string | null
          request_id: number | null
          response_status: number | null
          scheduled_at: string
          status: string
          updated_at: string
        }
        Insert: {
          attempt_count?: number
          cancelled_reason?: string | null
          created_at?: string
          dispatched_at?: string | null
          error_message?: string | null
          id?: string
          last_attempt_at?: string | null
          lead_application_id: string
          profile_id?: string | null
          request_id?: number | null
          response_status?: number | null
          scheduled_at: string
          status?: string
          updated_at?: string
        }
        Update: {
          attempt_count?: number
          cancelled_reason?: string | null
          created_at?: string
          dispatched_at?: string | null
          error_message?: string | null
          id?: string
          last_attempt_at?: string | null
          lead_application_id?: string
          profile_id?: string | null
          request_id?: number | null
          response_status?: number | null
          scheduled_at?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pending_lead_followups_lead_application_id_fkey"
            columns: ["lead_application_id"]
            isOneToOne: true
            referencedRelation: "lead_applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pending_lead_followups_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          alt_emails: string[]
          alt_phones: string[]
          arc_level: number
          avatar_url: string | null
          bio: string | null
          city: string | null
          clerk_user_id: string | null
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
          alt_emails?: string[]
          alt_phones?: string[]
          arc_level?: number
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          clerk_user_id?: string | null
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
          alt_emails?: string[]
          alt_phones?: string[]
          arc_level?: number
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          clerk_user_id?: string | null
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
          consecutive_cohorts: boolean
          created_at: string
          id: string
          max_reschedules_per_pass: number
          practice_weeks_enabled: boolean
          program_id: string
          require_exam_for_reserve: boolean
          reserve_count: number
          updated_at: string
        }
        Insert: {
          allow_reschedule?: boolean
          auto_assign_consecutive?: boolean
          consecutive_cohorts?: boolean
          created_at?: string
          id?: string
          max_reschedules_per_pass?: number
          practice_weeks_enabled?: boolean
          program_id: string
          require_exam_for_reserve?: boolean
          reserve_count?: number
          updated_at?: string
        }
        Update: {
          allow_reschedule?: boolean
          auto_assign_consecutive?: boolean
          consecutive_cohorts?: boolean
          created_at?: string
          id?: string
          max_reschedules_per_pass?: number
          practice_weeks_enabled?: boolean
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
          classroom_id: string | null
          created_at: string
          deposit_amount: number
          duration_label: string | null
          excluded_features: Json | null
          features: Json | null
          id: string
          keys_per_purchase: number | null
          name: string
          payment_plans: Json
          popular: boolean | null
          practice_weeks: number
          price: number
          program_id: string
          sort_order: number | null
        }
        Insert: {
          active?: boolean | null
          classroom_id?: string | null
          created_at?: string
          deposit_amount?: number
          duration_label?: string | null
          excluded_features?: Json | null
          features?: Json | null
          id?: string
          keys_per_purchase?: number | null
          name: string
          payment_plans?: Json
          popular?: boolean | null
          practice_weeks?: number
          price?: number
          program_id: string
          sort_order?: number | null
        }
        Update: {
          active?: boolean | null
          classroom_id?: string | null
          created_at?: string
          deposit_amount?: number
          duration_label?: string | null
          excluded_features?: Json | null
          features?: Json | null
          id?: string
          keys_per_purchase?: number | null
          name?: string
          payment_plans?: Json
          popular?: boolean | null
          practice_weeks?: number
          price?: number
          program_id?: string
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "program_variants_classroom_id_fkey"
            columns: ["classroom_id"]
            isOneToOne: false
            referencedRelation: "classrooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "program_variants_classroom_id_fkey"
            columns: ["classroom_id"]
            isOneToOne: false
            referencedRelation: "v_classroom_load"
            referencedColumns: ["classroom_id"]
          },
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
          classroom_id: string | null
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
          classroom_id?: string | null
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
          classroom_id?: string | null
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
            foreignKeyName: "program_variations_classroom_id_fkey"
            columns: ["classroom_id"]
            isOneToOne: false
            referencedRelation: "classrooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "program_variations_classroom_id_fkey"
            columns: ["classroom_id"]
            isOneToOne: false
            referencedRelation: "v_classroom_load"
            referencedColumns: ["classroom_id"]
          },
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
          classroom_id: string | null
          created_at: string
          curriculum: Json
          default_keys_per_purchase: number
          deposit_amount: number
          description: string | null
          eligible_for_keys: boolean
          id: string
          key_min_withdrawal_days: number
          key_price_cents: number
          key_validity_months: number
          language_variations_enabled: boolean
          late_registration_days: number
          learning_mode: Database["public"]["Enums"]["learning_mode"]
          name: string
          organization_id: string | null
          payment_plan_enabled: boolean
          payment_plans: Json
          program_code: string
          total_hours: number
          updated_at: string
        }
        Insert: {
          active?: boolean
          base_price?: number
          category?: string
          classroom_id?: string | null
          created_at?: string
          curriculum?: Json
          default_keys_per_purchase?: number
          deposit_amount?: number
          description?: string | null
          eligible_for_keys?: boolean
          id?: string
          key_min_withdrawal_days?: number
          key_price_cents?: number
          key_validity_months?: number
          language_variations_enabled?: boolean
          late_registration_days?: number
          learning_mode?: Database["public"]["Enums"]["learning_mode"]
          name: string
          organization_id?: string | null
          payment_plan_enabled?: boolean
          payment_plans?: Json
          program_code: string
          total_hours?: number
          updated_at?: string
        }
        Update: {
          active?: boolean
          base_price?: number
          category?: string
          classroom_id?: string | null
          created_at?: string
          curriculum?: Json
          default_keys_per_purchase?: number
          deposit_amount?: number
          description?: string | null
          eligible_for_keys?: boolean
          id?: string
          key_min_withdrawal_days?: number
          key_price_cents?: number
          key_validity_months?: number
          language_variations_enabled?: boolean
          late_registration_days?: number
          learning_mode?: Database["public"]["Enums"]["learning_mode"]
          name?: string
          organization_id?: string | null
          payment_plan_enabled?: boolean
          payment_plans?: Json
          program_code?: string
          total_hours?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "programs_classroom_id_fkey"
            columns: ["classroom_id"]
            isOneToOne: false
            referencedRelation: "classrooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "programs_classroom_id_fkey"
            columns: ["classroom_id"]
            isOneToOne: false
            referencedRelation: "v_classroom_load"
            referencedColumns: ["classroom_id"]
          },
          {
            foreignKeyName: "programs_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      project: {
        Row: {
          container_id: string | null
          created_at: string | null
          custom_domain: string | null
          custom_domain_status: string | null
          custom_domain_verified_at: string | null
          custom_hostname_id: string | null
          deployment_status: string | null
          git_branch: string | null
          git_url: string | null
          id: string
          initial_message: string | null
          is_active: boolean
          knowledge: string | null
          message_history: string
          name: string
          organization_id: string
          ownership_verification: string | null
          preview_image_url: string | null
          production_deploy_url: string | null
          ssl_status: string | null
          template_type: string
          updated_at: string
          url: string | null
          user_id: string
          visibility: string | null
          workflow_id: string | null
        }
        Insert: {
          container_id?: string | null
          created_at?: string | null
          custom_domain?: string | null
          custom_domain_status?: string | null
          custom_domain_verified_at?: string | null
          custom_hostname_id?: string | null
          deployment_status?: string | null
          git_branch?: string | null
          git_url?: string | null
          id: string
          initial_message?: string | null
          is_active?: boolean
          knowledge?: string | null
          message_history?: string
          name: string
          organization_id: string
          ownership_verification?: string | null
          preview_image_url?: string | null
          production_deploy_url?: string | null
          ssl_status?: string | null
          template_type: string
          updated_at?: string
          url?: string | null
          user_id: string
          visibility?: string | null
          workflow_id?: string | null
        }
        Update: {
          container_id?: string | null
          created_at?: string | null
          custom_domain?: string | null
          custom_domain_status?: string | null
          custom_domain_verified_at?: string | null
          custom_hostname_id?: string | null
          deployment_status?: string | null
          git_branch?: string | null
          git_url?: string | null
          id?: string
          initial_message?: string | null
          is_active?: boolean
          knowledge?: string | null
          message_history?: string
          name?: string
          organization_id?: string
          ownership_verification?: string | null
          preview_image_url?: string | null
          production_deploy_url?: string | null
          ssl_status?: string | null
          template_type?: string
          updated_at?: string
          url?: string | null
          user_id?: string
          visibility?: string | null
          workflow_id?: string | null
        }
        Relationships: []
      }
      project_ai_usage: {
        Row: {
          created_at: string | null
          id: string
          last_used_at: string | null
          organization_id: string
          project_id: string
          total_ai_message_count: number
          updated_at: string
        }
        Insert: {
          created_at?: string | null
          id: string
          last_used_at?: string | null
          organization_id: string
          project_id: string
          total_ai_message_count?: number
          updated_at?: string
        }
        Update: {
          created_at?: string | null
          id?: string
          last_used_at?: string | null
          organization_id?: string
          project_id?: string
          total_ai_message_count?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_ai_usage_project_id_project_id_fk"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project"
            referencedColumns: ["id"]
          },
        ]
      }
      project_asset: {
        Row: {
          attachment_key: string
          created_at: string | null
          id: string
          organization_id: string
          plan_id: string
          project_id: string
          updated_at: string
        }
        Insert: {
          attachment_key: string
          created_at?: string | null
          id: string
          organization_id: string
          plan_id: string
          project_id: string
          updated_at?: string
        }
        Update: {
          attachment_key?: string
          created_at?: string | null
          id?: string
          organization_id?: string
          plan_id?: string
          project_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_asset_project_id_project_id_fk"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project"
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
      qr_tokens: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          kiosk_assignment_id: string | null
          organization_id: string
          session_id: string | null
          token: string
        }
        Insert: {
          created_at?: string
          expires_at: string
          id?: string
          kiosk_assignment_id?: string | null
          organization_id: string
          session_id?: string | null
          token?: string
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          kiosk_assignment_id?: string | null
          organization_id?: string
          session_id?: string | null
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "qr_tokens_kiosk_assignment_id_fkey"
            columns: ["kiosk_assignment_id"]
            isOneToOne: false
            referencedRelation: "kiosk_assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qr_tokens_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qr_tokens_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "class_sessions"
            referencedColumns: ["id"]
          },
        ]
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
      remediation_attempts: {
        Row: {
          action_key: string
          after_state: Json | null
          attempted_at: string
          before_state: Json | null
          error_id: string | null
          error_message: string | null
          id: string
          notes: string | null
          status: string
          triggered_by: string
          triggered_by_user: string | null
        }
        Insert: {
          action_key: string
          after_state?: Json | null
          attempted_at?: string
          before_state?: Json | null
          error_id?: string | null
          error_message?: string | null
          id?: string
          notes?: string | null
          status: string
          triggered_by?: string
          triggered_by_user?: string | null
        }
        Update: {
          action_key?: string
          after_state?: Json | null
          attempted_at?: string
          before_state?: Json | null
          error_id?: string | null
          error_message?: string | null
          id?: string
          notes?: string | null
          status?: string
          triggered_by?: string
          triggered_by_user?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "remediation_attempts_error_id_fkey"
            columns: ["error_id"]
            isOneToOne: false
            referencedRelation: "client_error_logs"
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
      rooms: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          location: string | null
          name: string
          organization_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          location?: string | null
          name: string
          organization_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          location?: string | null
          name?: string
          organization_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "rooms_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
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
          active: boolean
          class_days: string[]
          classroom_id: string | null
          cohort_recurrence_anchor_date: string | null
          cohort_recurrence_weeks: number
          created_at: string
          hours_per_day: number
          id: string
          language: string
          name: string
          organization_id: string | null
          program_id: string
          schedule_tag: string | null
          session_layout: string
          sort_order: number
          start_time: string
          updated_at: string
          variant_id: string | null
          variation_id: string | null
        }
        Insert: {
          active?: boolean
          class_days?: string[]
          classroom_id?: string | null
          cohort_recurrence_anchor_date?: string | null
          cohort_recurrence_weeks?: number
          created_at?: string
          hours_per_day: number
          id?: string
          language?: string
          name: string
          organization_id?: string | null
          program_id: string
          schedule_tag?: string | null
          session_layout?: string
          sort_order?: number
          start_time: string
          updated_at?: string
          variant_id?: string | null
          variation_id?: string | null
        }
        Update: {
          active?: boolean
          class_days?: string[]
          classroom_id?: string | null
          cohort_recurrence_anchor_date?: string | null
          cohort_recurrence_weeks?: number
          created_at?: string
          hours_per_day?: number
          id?: string
          language?: string
          name?: string
          organization_id?: string | null
          program_id?: string
          schedule_tag?: string | null
          session_layout?: string
          sort_order?: number
          start_time?: string
          updated_at?: string
          variant_id?: string | null
          variation_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "schedule_templates_classroom_id_fkey"
            columns: ["classroom_id"]
            isOneToOne: false
            referencedRelation: "classrooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedule_templates_classroom_id_fkey"
            columns: ["classroom_id"]
            isOneToOne: false
            referencedRelation: "v_classroom_load"
            referencedColumns: ["classroom_id"]
          },
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
          {
            foreignKeyName: "schedule_templates_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "program_variants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedule_templates_variation_id_fkey"
            columns: ["variation_id"]
            isOneToOne: false
            referencedRelation: "program_variations"
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
      so_activity_logs: {
        Row: {
          action: string
          clerk_org_id: string
          clerk_user_id: string | null
          created_at: string
          entity_id: string | null
          entity_type: string | null
          id: string
          metadata: Json
        }
        Insert: {
          action: string
          clerk_org_id: string
          clerk_user_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          metadata?: Json
        }
        Update: {
          action?: string
          clerk_org_id?: string
          clerk_user_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          metadata?: Json
        }
        Relationships: [
          {
            foreignKeyName: "so_activity_logs_clerk_org_id_fkey"
            columns: ["clerk_org_id"]
            isOneToOne: false
            referencedRelation: "so_organizations"
            referencedColumns: ["clerk_org_id"]
          },
          {
            foreignKeyName: "so_activity_logs_clerk_user_id_fkey"
            columns: ["clerk_user_id"]
            isOneToOne: false
            referencedRelation: "so_profiles"
            referencedColumns: ["clerk_user_id"]
          },
        ]
      }
      so_analytics_events: {
        Row: {
          clerk_org_id: string
          created_at: string
          event_type: Database["public"]["Enums"]["so_analytics_event_type"]
          id: string
          ip_address: string | null
          metadata: Json
          offer_id: string | null
          referrer: string | null
          user_agent: string | null
        }
        Insert: {
          clerk_org_id: string
          created_at?: string
          event_type: Database["public"]["Enums"]["so_analytics_event_type"]
          id?: string
          ip_address?: string | null
          metadata?: Json
          offer_id?: string | null
          referrer?: string | null
          user_agent?: string | null
        }
        Update: {
          clerk_org_id?: string
          created_at?: string
          event_type?: Database["public"]["Enums"]["so_analytics_event_type"]
          id?: string
          ip_address?: string | null
          metadata?: Json
          offer_id?: string | null
          referrer?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "so_analytics_events_clerk_org_id_fkey"
            columns: ["clerk_org_id"]
            isOneToOne: false
            referencedRelation: "so_organizations"
            referencedColumns: ["clerk_org_id"]
          },
          {
            foreignKeyName: "so_analytics_events_offer_id_fkey"
            columns: ["offer_id"]
            isOneToOne: false
            referencedRelation: "so_offers"
            referencedColumns: ["id"]
          },
        ]
      }
      so_api_keys: {
        Row: {
          clerk_org_id: string
          created_at: string
          created_by: string
          id: string
          key_hash: string
          key_prefix: string
          last_used_at: string | null
          name: string
          revoked_at: string | null
        }
        Insert: {
          clerk_org_id: string
          created_at?: string
          created_by: string
          id?: string
          key_hash: string
          key_prefix: string
          last_used_at?: string | null
          name: string
          revoked_at?: string | null
        }
        Update: {
          clerk_org_id?: string
          created_at?: string
          created_by?: string
          id?: string
          key_hash?: string
          key_prefix?: string
          last_used_at?: string | null
          name?: string
          revoked_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "so_api_keys_clerk_org_id_fkey"
            columns: ["clerk_org_id"]
            isOneToOne: false
            referencedRelation: "so_organizations"
            referencedColumns: ["clerk_org_id"]
          },
          {
            foreignKeyName: "so_api_keys_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "so_profiles"
            referencedColumns: ["clerk_user_id"]
          },
        ]
      }
      so_offer_revisions: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          offer_id: string
          snapshot: Json
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          offer_id: string
          snapshot: Json
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          offer_id?: string
          snapshot?: Json
        }
        Relationships: [
          {
            foreignKeyName: "so_offer_revisions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "so_profiles"
            referencedColumns: ["clerk_user_id"]
          },
          {
            foreignKeyName: "so_offer_revisions_offer_id_fkey"
            columns: ["offer_id"]
            isOneToOne: false
            referencedRelation: "so_offers"
            referencedColumns: ["id"]
          },
        ]
      }
      so_offers: {
        Row: {
          clerk_org_id: string
          created_at: string
          created_by: string
          expires_at: string | null
          first_viewed_at: string | null
          id: string
          last_viewed_at: string | null
          offer_data: Json
          property_address: string | null
          property_city: string | null
          property_state: string | null
          property_type: string | null
          property_zip: string | null
          public_slug: string
          seller_email: string | null
          seller_name: string | null
          seller_phone: string | null
          sent_at: string | null
          status: Database["public"]["Enums"]["so_offer_status"]
          template_id: string | null
          title: string
          updated_at: string
          view_count: number
        }
        Insert: {
          clerk_org_id: string
          created_at?: string
          created_by: string
          expires_at?: string | null
          first_viewed_at?: string | null
          id?: string
          last_viewed_at?: string | null
          offer_data?: Json
          property_address?: string | null
          property_city?: string | null
          property_state?: string | null
          property_type?: string | null
          property_zip?: string | null
          public_slug: string
          seller_email?: string | null
          seller_name?: string | null
          seller_phone?: string | null
          sent_at?: string | null
          status?: Database["public"]["Enums"]["so_offer_status"]
          template_id?: string | null
          title: string
          updated_at?: string
          view_count?: number
        }
        Update: {
          clerk_org_id?: string
          created_at?: string
          created_by?: string
          expires_at?: string | null
          first_viewed_at?: string | null
          id?: string
          last_viewed_at?: string | null
          offer_data?: Json
          property_address?: string | null
          property_city?: string | null
          property_state?: string | null
          property_type?: string | null
          property_zip?: string | null
          public_slug?: string
          seller_email?: string | null
          seller_name?: string | null
          seller_phone?: string | null
          sent_at?: string | null
          status?: Database["public"]["Enums"]["so_offer_status"]
          template_id?: string | null
          title?: string
          updated_at?: string
          view_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "so_offers_clerk_org_id_fkey"
            columns: ["clerk_org_id"]
            isOneToOne: false
            referencedRelation: "so_organizations"
            referencedColumns: ["clerk_org_id"]
          },
          {
            foreignKeyName: "so_offers_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "so_profiles"
            referencedColumns: ["clerk_user_id"]
          },
          {
            foreignKeyName: "so_offers_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "so_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      so_organizations: {
        Row: {
          address: string | null
          brand_color: string | null
          clerk_org_id: string
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          footer_text: string | null
          logo_url: string | null
          name: string
          slug: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          address?: string | null
          brand_color?: string | null
          clerk_org_id: string
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          footer_text?: string | null
          logo_url?: string | null
          name: string
          slug?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          address?: string | null
          brand_color?: string | null
          clerk_org_id?: string
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          footer_text?: string | null
          logo_url?: string | null
          name?: string
          slug?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      so_profiles: {
        Row: {
          avatar_url: string | null
          clerk_user_id: string
          created_at: string
          email: string | null
          full_name: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          clerk_user_id: string
          created_at?: string
          email?: string | null
          full_name?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          clerk_user_id?: string
          created_at?: string
          email?: string | null
          full_name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      so_templates: {
        Row: {
          body: Json
          clerk_org_id: string
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_default: boolean
          name: string
          updated_at: string
        }
        Insert: {
          body?: Json
          clerk_org_id: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_default?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          body?: Json
          clerk_org_id?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_default?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "so_templates_clerk_org_id_fkey"
            columns: ["clerk_org_id"]
            isOneToOne: false
            referencedRelation: "so_organizations"
            referencedColumns: ["clerk_org_id"]
          },
          {
            foreignKeyName: "so_templates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "so_profiles"
            referencedColumns: ["clerk_user_id"]
          },
        ]
      }
      so_webhook_endpoints: {
        Row: {
          clerk_org_id: string
          created_at: string
          created_by: string | null
          enabled: boolean
          events: string[]
          id: string
          secret: string
          updated_at: string
          url: string
        }
        Insert: {
          clerk_org_id: string
          created_at?: string
          created_by?: string | null
          enabled?: boolean
          events?: string[]
          id?: string
          secret: string
          updated_at?: string
          url: string
        }
        Update: {
          clerk_org_id?: string
          created_at?: string
          created_by?: string | null
          enabled?: boolean
          events?: string[]
          id?: string
          secret?: string
          updated_at?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "so_webhook_endpoints_clerk_org_id_fkey"
            columns: ["clerk_org_id"]
            isOneToOne: false
            referencedRelation: "so_organizations"
            referencedColumns: ["clerk_org_id"]
          },
          {
            foreignKeyName: "so_webhook_endpoints_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "so_profiles"
            referencedColumns: ["clerk_user_id"]
          },
        ]
      }
      so_webhook_logs: {
        Row: {
          attempts: number
          clerk_org_id: string
          created_at: string
          endpoint_id: string | null
          event: string
          id: string
          payload: Json
          response_body: string | null
          response_status: number | null
          succeeded: boolean
        }
        Insert: {
          attempts?: number
          clerk_org_id: string
          created_at?: string
          endpoint_id?: string | null
          event: string
          id?: string
          payload?: Json
          response_body?: string | null
          response_status?: number | null
          succeeded?: boolean
        }
        Update: {
          attempts?: number
          clerk_org_id?: string
          created_at?: string
          endpoint_id?: string | null
          event?: string
          id?: string
          payload?: Json
          response_body?: string | null
          response_status?: number | null
          succeeded?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "so_webhook_logs_clerk_org_id_fkey"
            columns: ["clerk_org_id"]
            isOneToOne: false
            referencedRelation: "so_organizations"
            referencedColumns: ["clerk_org_id"]
          },
          {
            foreignKeyName: "so_webhook_logs_endpoint_id_fkey"
            columns: ["endpoint_id"]
            isOneToOne: false
            referencedRelation: "so_webhook_endpoints"
            referencedColumns: ["id"]
          },
        ]
      }
      sp_agencies: {
        Row: {
          created_at: string
          id: string
          name: string
          owner_id: string | null
          slug: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          owner_id?: string | null
          slug: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          owner_id?: string | null
          slug?: string
        }
        Relationships: []
      }
      sp_ai_chat_history: {
        Row: {
          content: string
          created_at: string
          id: string
          organization_id: string | null
          poll_id: string | null
          role: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          organization_id?: string | null
          poll_id?: string | null
          role: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          organization_id?: string | null
          poll_id?: string | null
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sp_ai_chat_history_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sp_ai_chat_history_poll_id_fkey"
            columns: ["poll_id"]
            isOneToOne: false
            referencedRelation: "sp_polls"
            referencedColumns: ["id"]
          },
        ]
      }
      sp_contacts: {
        Row: {
          created_at: string
          created_by: string | null
          email: string | null
          id: string
          metadata: Json
          name: string | null
          organization_id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          email?: string | null
          id?: string
          metadata?: Json
          name?: string | null
          organization_id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          email?: string | null
          id?: string
          metadata?: Json
          name?: string | null
          organization_id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sp_contacts_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      sp_direct_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          organization_id: string | null
          poll_id: string | null
          read_at: string | null
          recipient_id: string
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          organization_id?: string | null
          poll_id?: string | null
          read_at?: string | null
          recipient_id: string
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          organization_id?: string | null
          poll_id?: string | null
          read_at?: string | null
          recipient_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sp_direct_messages_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sp_direct_messages_poll_id_fkey"
            columns: ["poll_id"]
            isOneToOne: false
            referencedRelation: "sp_polls"
            referencedColumns: ["id"]
          },
        ]
      }
      sp_external_calendar_events: {
        Row: {
          connection_id: string
          ends_at: string
          id: string
          is_all_day: boolean
          organization_id: string | null
          provider_event_id: string
          raw_data: Json | null
          starts_at: string
          synced_at: string
          title: string | null
        }
        Insert: {
          connection_id: string
          ends_at: string
          id?: string
          is_all_day?: boolean
          organization_id?: string | null
          provider_event_id: string
          raw_data?: Json | null
          starts_at: string
          synced_at?: string
          title?: string | null
        }
        Update: {
          connection_id?: string
          ends_at?: string
          id?: string
          is_all_day?: boolean
          organization_id?: string | null
          provider_event_id?: string
          raw_data?: Json | null
          starts_at?: string
          synced_at?: string
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sp_external_calendar_events_connection_id_fkey"
            columns: ["connection_id"]
            isOneToOne: false
            referencedRelation: "sp_user_calendar_connections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sp_external_calendar_events_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      sp_feature_definitions: {
        Row: {
          created_at: string
          description: string | null
          id: string
          key: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          key: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          key?: string
        }
        Relationships: []
      }
      sp_guest_accounts: {
        Row: {
          created_at: string
          email: string | null
          id: string
          name: string | null
          poll_id: string | null
          token: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          poll_id?: string | null
          token?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          poll_id?: string | null
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "sp_guest_accounts_poll_id_fkey"
            columns: ["poll_id"]
            isOneToOne: false
            referencedRelation: "sp_polls"
            referencedColumns: ["id"]
          },
        ]
      }
      sp_meeting_bookings: {
        Row: {
          created_at: string
          ends_at: string
          guest_email: string | null
          guest_user_id: string | null
          host_user_id: string
          id: string
          notes: string | null
          organization_id: string | null
          poll_id: string | null
          starts_at: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          ends_at: string
          guest_email?: string | null
          guest_user_id?: string | null
          host_user_id: string
          id?: string
          notes?: string | null
          organization_id?: string | null
          poll_id?: string | null
          starts_at: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          ends_at?: string
          guest_email?: string | null
          guest_user_id?: string | null
          host_user_id?: string
          id?: string
          notes?: string | null
          organization_id?: string | null
          poll_id?: string | null
          starts_at?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sp_meeting_bookings_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sp_meeting_bookings_poll_id_fkey"
            columns: ["poll_id"]
            isOneToOne: false
            referencedRelation: "sp_polls"
            referencedColumns: ["id"]
          },
        ]
      }
      sp_meeting_summaries: {
        Row: {
          booking_id: string
          content: string
          created_at: string
          generated_by: string
          id: string
        }
        Insert: {
          booking_id: string
          content: string
          created_at?: string
          generated_by?: string
          id?: string
        }
        Update: {
          booking_id?: string
          content?: string
          created_at?: string
          generated_by?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sp_meeting_summaries_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: true
            referencedRelation: "sp_meeting_bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      sp_notifications: {
        Row: {
          body: string | null
          created_at: string
          data: Json
          id: string
          organization_id: string | null
          read_at: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          data?: Json
          id?: string
          organization_id?: string | null
          read_at?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string
          data?: Json
          id?: string
          organization_id?: string | null
          read_at?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sp_notifications_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      sp_organization_invites: {
        Row: {
          accepted_at: string | null
          created_at: string
          email: string
          expires_at: string
          id: string
          invited_by: string | null
          organization_id: string
          role: string
          token: string
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string
          email: string
          expires_at?: string
          id?: string
          invited_by?: string | null
          organization_id: string
          role?: string
          token?: string
        }
        Update: {
          accepted_at?: string | null
          created_at?: string
          email?: string
          expires_at?: string
          id?: string
          invited_by?: string | null
          organization_id?: string
          role?: string
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "sp_organization_invites_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      sp_organization_settings: {
        Row: {
          billing_period_start: string
          created_at: string
          id: string
          max_polls_per_month: number
          max_responses_per_poll: number
          organization_id: string
          polls_created_this_month: number
          updated_at: string
        }
        Insert: {
          billing_period_start?: string
          created_at?: string
          id?: string
          max_polls_per_month?: number
          max_responses_per_poll?: number
          organization_id: string
          polls_created_this_month?: number
          updated_at?: string
        }
        Update: {
          billing_period_start?: string
          created_at?: string
          id?: string
          max_polls_per_month?: number
          max_responses_per_poll?: number
          organization_id?: string
          polls_created_this_month?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sp_organization_settings_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: true
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      sp_plan_audit_log: {
        Row: {
          changed_by: string | null
          created_at: string
          id: string
          new_plan_id: string | null
          old_plan_id: string | null
          organization_id: string
          reason: string | null
        }
        Insert: {
          changed_by?: string | null
          created_at?: string
          id?: string
          new_plan_id?: string | null
          old_plan_id?: string | null
          organization_id: string
          reason?: string | null
        }
        Update: {
          changed_by?: string | null
          created_at?: string
          id?: string
          new_plan_id?: string | null
          old_plan_id?: string | null
          organization_id?: string
          reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sp_plan_audit_log_new_plan_id_fkey"
            columns: ["new_plan_id"]
            isOneToOne: false
            referencedRelation: "sp_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sp_plan_audit_log_old_plan_id_fkey"
            columns: ["old_plan_id"]
            isOneToOne: false
            referencedRelation: "sp_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sp_plan_audit_log_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      sp_plan_features: {
        Row: {
          feature_id: string
          id: string
          plan_id: string
        }
        Insert: {
          feature_id: string
          id?: string
          plan_id: string
        }
        Update: {
          feature_id?: string
          id?: string
          plan_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sp_plan_features_feature_id_fkey"
            columns: ["feature_id"]
            isOneToOne: false
            referencedRelation: "sp_feature_definitions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sp_plan_features_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "sp_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      sp_plans: {
        Row: {
          billing_interval: string
          created_at: string
          id: string
          max_polls_per_month: number
          max_responses_per_poll: number
          name: string
          price_cents: number
        }
        Insert: {
          billing_interval?: string
          created_at?: string
          id?: string
          max_polls_per_month?: number
          max_responses_per_poll?: number
          name: string
          price_cents?: number
        }
        Update: {
          billing_interval?: string
          created_at?: string
          id?: string
          max_polls_per_month?: number
          max_responses_per_poll?: number
          name?: string
          price_cents?: number
        }
        Relationships: []
      }
      sp_poll_assignments: {
        Row: {
          assigned_by: string | null
          assigned_to: string
          created_at: string
          id: string
          organization_id: string | null
          poll_id: string
        }
        Insert: {
          assigned_by?: string | null
          assigned_to: string
          created_at?: string
          id?: string
          organization_id?: string | null
          poll_id: string
        }
        Update: {
          assigned_by?: string | null
          assigned_to?: string
          created_at?: string
          id?: string
          organization_id?: string | null
          poll_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sp_poll_assignments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sp_poll_assignments_poll_id_fkey"
            columns: ["poll_id"]
            isOneToOne: false
            referencedRelation: "sp_polls"
            referencedColumns: ["id"]
          },
        ]
      }
      sp_poll_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          organization_id: string | null
          parent_id: string | null
          poll_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          organization_id?: string | null
          parent_id?: string | null
          poll_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          organization_id?: string | null
          parent_id?: string | null
          poll_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sp_poll_comments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sp_poll_comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "sp_poll_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sp_poll_comments_poll_id_fkey"
            columns: ["poll_id"]
            isOneToOne: false
            referencedRelation: "sp_polls"
            referencedColumns: ["id"]
          },
        ]
      }
      sp_poll_message_reactions: {
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
            foreignKeyName: "sp_poll_message_reactions_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "sp_poll_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      sp_poll_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          organization_id: string | null
          poll_id: string
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          organization_id?: string | null
          poll_id: string
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          organization_id?: string | null
          poll_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sp_poll_messages_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sp_poll_messages_poll_id_fkey"
            columns: ["poll_id"]
            isOneToOne: false
            referencedRelation: "sp_polls"
            referencedColumns: ["id"]
          },
        ]
      }
      sp_poll_participants: {
        Row: {
          email: string | null
          guest_token: string | null
          id: string
          invited_at: string
          name: string | null
          organization_id: string | null
          poll_id: string
          responded_at: string | null
          user_id: string | null
        }
        Insert: {
          email?: string | null
          guest_token?: string | null
          id?: string
          invited_at?: string
          name?: string | null
          organization_id?: string | null
          poll_id: string
          responded_at?: string | null
          user_id?: string | null
        }
        Update: {
          email?: string | null
          guest_token?: string | null
          id?: string
          invited_at?: string
          name?: string | null
          organization_id?: string | null
          poll_id?: string
          responded_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sp_poll_participants_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sp_poll_participants_poll_id_fkey"
            columns: ["poll_id"]
            isOneToOne: false
            referencedRelation: "sp_polls"
            referencedColumns: ["id"]
          },
        ]
      }
      sp_poll_reminder_logs: {
        Row: {
          created_at: string
          error: string | null
          id: string
          poll_id: string
          recipient_id: string | null
          reminder_id: string
          status: string
        }
        Insert: {
          created_at?: string
          error?: string | null
          id?: string
          poll_id: string
          recipient_id?: string | null
          reminder_id: string
          status?: string
        }
        Update: {
          created_at?: string
          error?: string | null
          id?: string
          poll_id?: string
          recipient_id?: string | null
          reminder_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "sp_poll_reminder_logs_poll_id_fkey"
            columns: ["poll_id"]
            isOneToOne: false
            referencedRelation: "sp_polls"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sp_poll_reminder_logs_reminder_id_fkey"
            columns: ["reminder_id"]
            isOneToOne: false
            referencedRelation: "sp_poll_reminders"
            referencedColumns: ["id"]
          },
        ]
      }
      sp_poll_reminders: {
        Row: {
          channel: string
          created_at: string
          id: string
          organization_id: string | null
          poll_id: string
          send_at: string
          sent_at: string | null
        }
        Insert: {
          channel?: string
          created_at?: string
          id?: string
          organization_id?: string | null
          poll_id: string
          send_at: string
          sent_at?: string | null
        }
        Update: {
          channel?: string
          created_at?: string
          id?: string
          organization_id?: string | null
          poll_id?: string
          send_at?: string
          sent_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sp_poll_reminders_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sp_poll_reminders_poll_id_fkey"
            columns: ["poll_id"]
            isOneToOne: false
            referencedRelation: "sp_polls"
            referencedColumns: ["id"]
          },
        ]
      }
      sp_poll_responses: {
        Row: {
          created_at: string
          id: string
          note: string | null
          organization_id: string | null
          participant_id: string
          poll_id: string
          selected_times: Json
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          note?: string | null
          organization_id?: string | null
          participant_id: string
          poll_id: string
          selected_times?: Json
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          note?: string | null
          organization_id?: string | null
          participant_id?: string
          poll_id?: string
          selected_times?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sp_poll_responses_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sp_poll_responses_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: true
            referencedRelation: "sp_poll_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sp_poll_responses_poll_id_fkey"
            columns: ["poll_id"]
            isOneToOne: false
            referencedRelation: "sp_polls"
            referencedColumns: ["id"]
          },
        ]
      }
      sp_polls: {
        Row: {
          allow_guest: boolean
          created_at: string
          creator_id: string
          deadline: string | null
          description: string | null
          id: string
          is_public: boolean
          organization_id: string
          status: Database["public"]["Enums"]["sp_poll_status"]
          title: string
          updated_at: string
        }
        Insert: {
          allow_guest?: boolean
          created_at?: string
          creator_id: string
          deadline?: string | null
          description?: string | null
          id?: string
          is_public?: boolean
          organization_id: string
          status?: Database["public"]["Enums"]["sp_poll_status"]
          title: string
          updated_at?: string
        }
        Update: {
          allow_guest?: boolean
          created_at?: string
          creator_id?: string
          deadline?: string | null
          description?: string | null
          id?: string
          is_public?: boolean
          organization_id?: string
          status?: Database["public"]["Enums"]["sp_poll_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sp_polls_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      sp_user_availability_settings: {
        Row: {
          booking_slug: string | null
          buffer_after: number
          buffer_before: number
          created_at: string
          id: string
          organization_id: string | null
          timezone: string
          updated_at: string
          user_id: string
        }
        Insert: {
          booking_slug?: string | null
          buffer_after?: number
          buffer_before?: number
          created_at?: string
          id?: string
          organization_id?: string | null
          timezone?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          booking_slug?: string | null
          buffer_after?: number
          buffer_before?: number
          created_at?: string
          id?: string
          organization_id?: string | null
          timezone?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sp_user_availability_settings_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      sp_user_blocked_dates: {
        Row: {
          blocked_date: string
          created_at: string
          id: string
          organization_id: string | null
          reason: string | null
          user_id: string
        }
        Insert: {
          blocked_date: string
          created_at?: string
          id?: string
          organization_id?: string | null
          reason?: string | null
          user_id: string
        }
        Update: {
          blocked_date?: string
          created_at?: string
          id?: string
          organization_id?: string | null
          reason?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sp_user_blocked_dates_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      sp_user_calendar_connections: {
        Row: {
          access_token: string | null
          calendar_id: string | null
          created_at: string
          expires_at: string | null
          id: string
          is_primary: boolean
          organization_id: string | null
          provider: string
          refresh_token: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          access_token?: string | null
          calendar_id?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          is_primary?: boolean
          organization_id?: string | null
          provider: string
          refresh_token?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          access_token?: string | null
          calendar_id?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          is_primary?: boolean
          organization_id?: string | null
          provider?: string
          refresh_token?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sp_user_calendar_connections_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      sp_user_integrations: {
        Row: {
          access_token: string | null
          created_at: string
          expires_at: string | null
          id: string
          metadata: Json
          organization_id: string | null
          provider: string
          refresh_token: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          access_token?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          metadata?: Json
          organization_id?: string | null
          provider: string
          refresh_token?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          access_token?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          metadata?: Json
          organization_id?: string | null
          provider?: string
          refresh_token?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sp_user_integrations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      sp_user_notification_preferences: {
        Row: {
          channel: string
          created_at: string
          enabled: boolean
          event_type: string
          id: string
          organization_id: string | null
          user_id: string
        }
        Insert: {
          channel?: string
          created_at?: string
          enabled?: boolean
          event_type: string
          id?: string
          organization_id?: string | null
          user_id: string
        }
        Update: {
          channel?: string
          created_at?: string
          enabled?: boolean
          event_type?: string
          id?: string
          organization_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sp_user_notification_preferences_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      sp_user_weekly_hours: {
        Row: {
          created_at: string
          day_of_week: number
          end_time: string
          id: string
          is_available: boolean
          organization_id: string | null
          start_time: string
          user_id: string
        }
        Insert: {
          created_at?: string
          day_of_week: number
          end_time?: string
          id?: string
          is_available?: boolean
          organization_id?: string | null
          start_time?: string
          user_id: string
        }
        Update: {
          created_at?: string
          day_of_week?: number
          end_time?: string
          id?: string
          is_available?: boolean
          organization_id?: string | null
          start_time?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sp_user_weekly_hours_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      space_deployments: {
        Row: {
          created_at: string
          external_id: string | null
          id: string
          metadata: Json
          organization_id: string
          provider: string
          space_id: string
          status: string
          url: string | null
          version_id: string | null
        }
        Insert: {
          created_at?: string
          external_id?: string | null
          id?: string
          metadata?: Json
          organization_id: string
          provider?: string
          space_id: string
          status?: string
          url?: string | null
          version_id?: string | null
        }
        Update: {
          created_at?: string
          external_id?: string | null
          id?: string
          metadata?: Json
          organization_id?: string
          provider?: string
          space_id?: string
          status?: string
          url?: string | null
          version_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "space_deployments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "space_deployments_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "space_deployments_version_id_fkey"
            columns: ["version_id"]
            isOneToOne: false
            referencedRelation: "space_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      space_files: {
        Row: {
          byte_size: number
          content: string | null
          id: string
          mime_type: string
          organization_id: string
          path: string
          space_id: string
          storage_path: string | null
          updated_at: string
        }
        Insert: {
          byte_size?: number
          content?: string | null
          id?: string
          mime_type?: string
          organization_id: string
          path: string
          space_id: string
          storage_path?: string | null
          updated_at?: string
        }
        Update: {
          byte_size?: number
          content?: string | null
          id?: string
          mime_type?: string
          organization_id?: string
          path?: string
          space_id?: string
          storage_path?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "space_files_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "space_files_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      space_share_links: {
        Row: {
          created_at: string
          created_by: string | null
          expires_at: string | null
          id: string
          organization_id: string
          space_id: string
          token: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          expires_at?: string | null
          id?: string
          organization_id: string
          space_id: string
          token: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          expires_at?: string | null
          id?: string
          organization_id?: string
          space_id?: string
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "space_share_links_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "app_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "space_share_links_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "space_share_links_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      space_versions: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          message_id: string | null
          organization_id: string
          snapshot: Json
          space_id: string
          version_number: number
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          message_id?: string | null
          organization_id: string
          snapshot?: Json
          space_id: string
          version_number: number
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          message_id?: string | null
          organization_id?: string
          snapshot?: Json
          space_id?: string
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "space_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "app_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "space_versions_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "chat_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "space_versions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "space_versions_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      spaces: {
        Row: {
          chat_thread_id: string | null
          created_at: string
          created_by: string | null
          id: string
          metadata: Json
          organization_id: string
          preview_kind: string
          slug: string
          status: string
          title: string
          updated_at: string
          visibility: string
        }
        Insert: {
          chat_thread_id?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          metadata?: Json
          organization_id: string
          preview_kind?: string
          slug: string
          status?: string
          title: string
          updated_at?: string
          visibility?: string
        }
        Update: {
          chat_thread_id?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          metadata?: Json
          organization_id?: string
          preview_kind?: string
          slug?: string
          status?: string
          title?: string
          updated_at?: string
          visibility?: string
        }
        Relationships: [
          {
            foreignKeyName: "spaces_chat_thread_id_fkey"
            columns: ["chat_thread_id"]
            isOneToOne: false
            referencedRelation: "chat_threads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "spaces_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "app_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "spaces_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
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
        ]
      }
      submission_saved_views: {
        Row: {
          created_at: string
          filters: Json
          id: string
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          filters?: Json
          id?: string
          name: string
          user_id: string
        }
        Update: {
          created_at?: string
          filters?: Json
          id?: string
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      subscription_limit: {
        Row: {
          ai_nums: number
          billing_interval: string | null
          created_at: string | null
          deploy_limit: number
          enhance_nums: number
          id: string
          is_active: boolean
          last_quota_refresh: string | null
          organization_id: string
          period_end: string
          period_start: string
          plan_id: string
          plan_name: string
          project_nums: number
          seats: number
          stripe_customer_id: string | null
          updated_at: string
          upload_limit: number
        }
        Insert: {
          ai_nums: number
          billing_interval?: string | null
          created_at?: string | null
          deploy_limit: number
          enhance_nums: number
          id: string
          is_active?: boolean
          last_quota_refresh?: string | null
          organization_id: string
          period_end: string
          period_start: string
          plan_id: string
          plan_name: string
          project_nums?: number
          seats?: number
          stripe_customer_id?: string | null
          updated_at?: string
          upload_limit: number
        }
        Update: {
          ai_nums?: number
          billing_interval?: string | null
          created_at?: string | null
          deploy_limit?: number
          enhance_nums?: number
          id?: string
          is_active?: boolean
          last_quota_refresh?: string | null
          organization_id?: string
          period_end?: string
          period_start?: string
          plan_id?: string
          plan_name?: string
          project_nums?: number
          seats?: number
          stripe_customer_id?: string | null
          updated_at?: string
          upload_limit?: number
        }
        Relationships: []
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
      usage_events: {
        Row: {
          cost_usd: number
          created_at: string
          event_type: string
          id: string
          input_tokens: number
          metadata: Json
          model: string | null
          organization_id: string
          output_tokens: number
          user_id: string | null
        }
        Insert: {
          cost_usd?: number
          created_at?: string
          event_type: string
          id?: string
          input_tokens?: number
          metadata?: Json
          model?: string | null
          organization_id: string
          output_tokens?: number
          user_id?: string | null
        }
        Update: {
          cost_usd?: number
          created_at?: string
          event_type?: string
          id?: string
          input_tokens?: number
          metadata?: Json
          model?: string | null
          organization_id?: string
          output_tokens?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "usage_events_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usage_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "app_users"
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
      wws_litters: {
        Row: {
          born_date: string | null
          cover_image_url: string | null
          created_at: string
          dam_name: string | null
          description: string | null
          expected_count: number | null
          id: string
          name: string
          priority_order: number
          ready_date: string | null
          sire_name: string | null
          slug: string
          status: string
          updated_at: string
        }
        Insert: {
          born_date?: string | null
          cover_image_url?: string | null
          created_at?: string
          dam_name?: string | null
          description?: string | null
          expected_count?: number | null
          id?: string
          name: string
          priority_order?: number
          ready_date?: string | null
          sire_name?: string | null
          slug: string
          status?: string
          updated_at?: string
        }
        Update: {
          born_date?: string | null
          cover_image_url?: string | null
          created_at?: string
          dam_name?: string | null
          description?: string | null
          expected_count?: number | null
          id?: string
          name?: string
          priority_order?: number
          ready_date?: string | null
          sire_name?: string | null
          slug?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
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
          litter_id: string | null
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
          litter_id?: string | null
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
          litter_id?: string | null
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
            foreignKeyName: "wws_puppies_litter_id_fkey"
            columns: ["litter_id"]
            isOneToOne: false
            referencedRelation: "wws_litters"
            referencedColumns: ["id"]
          },
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
      unified_content_stem: {
        Row: {
          board_domain: string | null
          category: string | null
          chapter: string | null
          difficulty: string | null
          grounding_source:
            | "approved_bank"
            | "textbook_rag"
            | "curriculum_blueprint"
            | "model_knowledge"
            | null
          id: string | null
          is_live: boolean | null
          organization_id: string | null
          redacted_payload: Json | null
          review_status: "pending" | "approved" | "rejected" | null
          stem: string | null
          subject: string | null
          type: "question" | "activity" | "card" | null
        }
        Insert: {
          board_domain?: string | null
          category?: string | null
          chapter?: string | null
          difficulty?: string | null
          grounding_source?:
            | "approved_bank"
            | "textbook_rag"
            | "curriculum_blueprint"
            | "model_knowledge"
            | null
          id?: string | null
          is_live?: boolean | null
          organization_id?: string | null
          redacted_payload?: never
          review_status?: "pending" | "approved" | "rejected" | null
          stem?: string | null
          subject?: string | null
          type?: "question" | "activity" | "card" | null
        }
        Update: {
          board_domain?: string | null
          category?: string | null
          chapter?: string | null
          difficulty?: string | null
          grounding_source?:
            | "approved_bank"
            | "textbook_rag"
            | "curriculum_blueprint"
            | "model_knowledge"
            | null
          id?: string | null
          is_live?: boolean | null
          organization_id?: string | null
          redacted_payload?: never
          review_status?: "pending" | "approved" | "rejected" | null
          stem?: string | null
          subject?: string | null
          type?: "question" | "activity" | "card" | null
        }
        Relationships: []
      }
      unified_questions: {
        Row: {
          ai_confidence_score: number | null
          category: string | null
          content_item_id: string | null
          correct_answer: string | null
          created_at: string | null
          difficulty: string | null
          explanation: string | null
          failure_rate: number | null
          grounding_source:
            | "approved_bank"
            | "textbook_rag"
            | "curriculum_blueprint"
            | "model_knowledge"
            | null
          id: string | null
          is_live: boolean | null
          legacy_question_id: string | null
          legacy_status: string | null
          lesson_id: string | null
          options: Json | null
          organization_id: string | null
          program_id: string | null
          question_text: string | null
          review_status: "pending" | "approved" | "rejected" | null
          source: string | null
          source_citation: string | null
          source_reference: string | null
          updated_at: string | null
          usage_count: number | null
          wrong_answer_explanations: Json | null
        }
        Relationships: []
      }
      v_classroom_load: {
        Row: {
          capacity: number | null
          classroom_id: string | null
          classroom_name: string | null
          seats_in_use_now: number | null
          upcoming_cohorts: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      admin_cancel_enrollment: {
        Args: { p_enrollment_id: string; p_reason?: string }
        Returns: Json
      }
      admin_correct_enrollment: {
        Args: {
          p_amount_paid?: number
          p_change_cohort?: boolean
          p_enrollment_id: string
          p_new_cohort_id?: string
          p_payment_status?: string
          p_reason?: string
          p_total_tuition?: number
          p_update_related_order?: boolean
        }
        Returns: Json
      }
      admin_delete_payment: {
        Args: { p_payment_log_id: string }
        Returns: Json
      }
      admin_recalc_order_payments: {
        Args: { p_order_id: string }
        Returns: Json
      }
      admin_record_payment: {
        Args: {
          p_amount: number
          p_note?: string
          p_order_id: string
          p_paid_at?: string
          p_provider?: string
          p_transaction_id?: string
        }
        Returns: string
      }
      admin_refund_payment: {
        Args: { p_amount: number; p_payment_log_id: string; p_reason?: string }
        Returns: string
      }
      admin_suspend_enrollment: {
        Args: { p_enrollment_id: string; p_reason: string; p_suspend?: boolean }
        Returns: Json
      }
      admin_update_payment: {
        Args: {
          p_amount: number
          p_note?: string
          p_paid_at?: string
          p_payment_log_id: string
          p_transaction_id?: string
        }
        Returns: Json
      }
      admin_user_directory: {
        Args: {
          p_filter_appt?: string
          p_filter_cta?: string
          p_filter_enroll_started?: string
          p_filter_path?: string
          p_filter_portal?: string
          p_filter_program?: string
          p_limit?: number
          p_offset?: number
          p_role?: string
          p_search?: string
          p_sort_asc?: boolean
          p_sort_field?: string
          p_status?: string
          p_tab?: string
        }
        Returns: Json
      }
      admin_user_directory_counts: { Args: never; Returns: Json }
      agentops_ensure_default_org: {
        Args: { p_app_user_id: string; p_secret: string }
        Returns: {
          clerk_org_id: string | null
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
        SetofOptions: {
          from: "*"
          to: "organizations"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      agentops_get_chat_by_id:
        | {
            Args: {
              p_auth_user_id: string
              p_chat_id: string
              p_secret: string
            }
            Returns: {
              created_at: string
              id: string
              organization_id: string
              title: string | null
              updated_at: string
              user_id: string | null
              visibility: string
            }
            SetofOptions: {
              from: "*"
              to: "chat_threads"
              isOneToOne: true
              isSetofReturn: false
            }
          }
        | {
            Args: {
              p_chat_id: string
              p_clerk_user_id: string
              p_secret: string
            }
            Returns: {
              created_at: string
              id: string
              organization_id: string
              title: string | null
              updated_at: string
              user_id: string | null
              visibility: string
            }
            SetofOptions: {
              from: "*"
              to: "chat_threads"
              isOneToOne: true
              isSetofReturn: false
            }
          }
      agentops_get_chats_by_user: {
        Args: {
          p_app_user_id: string
          p_organization_id: string
          p_secret: string
        }
        Returns: {
          created_at: string
          id: string
          organization_id: string
          title: string | null
          updated_at: string
          user_id: string | null
          visibility: string
        }[]
        SetofOptions: {
          from: "*"
          to: "chat_threads"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      agentops_get_messages_by_chat:
        | {
            Args: {
              p_auth_user_id: string
              p_chat_id: string
              p_secret: string
            }
            Returns: {
              attachments: Json
              content: string | null
              created_at: string
              id: string
              metadata: Json
              organization_id: string
              parts: Json
              role: string
              thread_id: string
              user_id: string | null
            }[]
            SetofOptions: {
              from: "*"
              to: "chat_messages"
              isOneToOne: false
              isSetofReturn: true
            }
          }
        | {
            Args: {
              p_chat_id: string
              p_clerk_user_id: string
              p_secret: string
            }
            Returns: {
              attachments: Json
              content: string | null
              created_at: string
              id: string
              metadata: Json
              organization_id: string
              parts: Json
              role: string
              thread_id: string
              user_id: string | null
            }[]
            SetofOptions: {
              from: "*"
              to: "chat_messages"
              isOneToOne: false
              isSetofReturn: true
            }
          }
      agentops_get_org_if_member: {
        Args: {
          p_app_user_id: string
          p_is_master_admin: boolean
          p_org_id: string
          p_secret: string
        }
        Returns: {
          clerk_org_id: string | null
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
        SetofOptions: {
          from: "*"
          to: "organizations"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      agentops_persist_secret_ok: {
        Args: { p_secret: string }
        Returns: boolean
      }
      agentops_save_chat: {
        Args: {
          p_app_user_id: string
          p_id: string
          p_organization_id: string
          p_secret: string
          p_title: string
        }
        Returns: undefined
      }
      agentops_save_messages: {
        Args: {
          p_app_user_id: string
          p_messages: Json
          p_organization_id: string
          p_secret: string
        }
        Returns: undefined
      }
      agentops_sync_clerk_org: {
        Args: {
          p_app_user_id: string
          p_clerk_org_id: string
          p_clerk_org_name: string
          p_clerk_role: string
          p_clerk_user_id: string
          p_secret: string
        }
        Returns: {
          clerk_org_id: string | null
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
        SetofOptions: {
          from: "*"
          to: "organizations"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      agentops_upsert_app_user:
        | {
            Args: {
              p_auth_user_id: string
              p_avatar_url?: string
              p_email: string
              p_full_name?: string
              p_secret: string
            }
            Returns: {
              avatar_url: string | null
              clerk_user_id: string | null
              created_at: string
              email: string
              full_name: string | null
              id: string
              is_master_admin: boolean
              role: string
              updated_at: string
            }
            SetofOptions: {
              from: "*"
              to: "app_users"
              isOneToOne: true
              isSetofReturn: false
            }
          }
        | {
            Args: {
              p_avatar_url: string
              p_clerk_user_id: string
              p_email: string
              p_full_name: string
              p_secret: string
            }
            Returns: {
              avatar_url: string | null
              clerk_user_id: string | null
              created_at: string
              email: string
              full_name: string | null
              id: string
              is_master_admin: boolean
              role: string
              updated_at: string
            }
            SetofOptions: {
              from: "*"
              to: "app_users"
              isOneToOne: true
              isSetofReturn: false
            }
          }
      ao_can_admin_org: {
        Args: { _org: string; _user: string }
        Returns: boolean
      }
      ao_consume_credits: {
        Args: { _amount: number; _org: string; _ref: string }
        Returns: number
      }
      ao_dec_api_key: {
        Args: { _cipher: string; _secret: string }
        Returns: string
      }
      ao_enc_api_key: {
        Args: { _plain: string; _secret: string }
        Returns: string
      }
      ao_grant_credits: {
        Args: { _actor: string; _amount: number; _note: string; _org: string }
        Returns: number
      }
      ao_has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      ao_is_org_member: {
        Args: { _org: string; _user: string }
        Returns: boolean
      }
      ao_org_role: {
        Args: { _org: string; _user: string }
        Returns: Database["public"]["Enums"]["ao_org_role"]
      }
      apply_admin_bundle_schedule: {
        Args: {
          p_component_cohorts?: Json
          p_issue_reserve_key?: boolean
          p_parent_enrollment_id: string
          p_practice_cohorts?: Json
        }
        Returns: Json
      }
      apply_clerk_import_links: { Args: never; Returns: number }
      auto_archive_inactive_leads: { Args: never; Returns: undefined }
      bootstrap_master_admin: { Args: { p_email?: string }; Returns: undefined }
      build_template_snapshot: {
        Args: { p_template_id: string }
        Returns: Json
      }
      cancel_off_cycle_weekend_cohorts: { Args: never; Returns: number }
      check_enrollment_expiry: { Args: never; Returns: undefined }
      check_import_history_token: {
        Args: { p_token: string }
        Returns: boolean
      }
      classroom_conflicts: {
        Args: {
          p_classroom_id: string
          p_duration_hours?: number
          p_end_date: string
          p_exclude_cohort_id?: string
          p_start_date: string
          p_start_time: string
        }
        Returns: {
          cohort_id: string
          duration_hours: number
          end_date: string
          enrolled_count: number
          event_time: string
          max_seats: number
          program_name: string
          start_date: string
        }[]
      }
      clawdeploy_create_instance: {
        Args: {
          p_fly_app_name: string
          p_idempotency_key?: string
          p_image: string
          p_org_id: string
          p_region: string
          p_subscription_id?: string
          p_user_id: string
        }
        Returns: Json
      }
      clawdeploy_delete_channel: {
        Args: { p_channel_id: string; p_org_id: string }
        Returns: boolean
      }
      clawdeploy_delete_connector: {
        Args: { p_connector_id: string; p_org_id: string }
        Returns: boolean
      }
      clawdeploy_get_instance_config_bundle: {
        Args: { p_instance_id: string; p_org_id: string }
        Returns: Json
      }
      clawdeploy_get_instance_runtime: {
        Args: { p_instance_id: string; p_org_id: string }
        Returns: Json
      }
      clawdeploy_get_org_id_by_clerk: {
        Args: { p_clerk_org_id: string }
        Returns: string
      }
      clawdeploy_get_stripe_customer_id: {
        Args: { p_org_id: string }
        Returns: string
      }
      clawdeploy_get_subscription: { Args: { p_org_id: string }; Returns: Json }
      clawdeploy_get_user_org_id: {
        Args: { p_user_id: string }
        Returns: string
      }
      clawdeploy_list_active_instances: {
        Args: { p_org_id: string }
        Returns: Json
      }
      clawdeploy_list_channels: { Args: { p_org_id: string }; Returns: Json }
      clawdeploy_list_connectors: { Args: { p_org_id: string }; Returns: Json }
      clawdeploy_list_events: {
        Args: { p_instance_id?: string; p_limit?: number; p_org_id: string }
        Returns: Json
      }
      clawdeploy_list_instances: { Args: { p_org_id: string }; Returns: Json }
      clawdeploy_list_instances_for_stripe_subscription: {
        Args: { p_stripe_subscription_id: string }
        Returns: Json
      }
      clawdeploy_mark_instance_deployed: {
        Args: {
          p_fly_machine_id: string
          p_fly_volume_id?: string
          p_instance_id: string
          p_metadata?: Json
          p_org_id: string
          p_status: string
          p_token_hash?: string
          p_url?: string
        }
        Returns: Json
      }
      clawdeploy_mark_subscription_instances_destroyed: {
        Args: { p_metadata?: Json; p_stripe_subscription_id: string }
        Returns: Json
      }
      clawdeploy_provision_org_for_checkout: {
        Args: {
          p_cancel_at_period_end: boolean
          p_current_period_end: string
          p_idempotency_key: string
          p_plan_tier: string
          p_status: string
          p_stripe_customer_id: string
          p_stripe_price_id: string
          p_stripe_subscription_id: string
          p_user_email: string
          p_user_id: string
        }
        Returns: string
      }
      clawdeploy_set_instance_secrets: {
        Args: {
          p_api_keys?: Json
          p_gateway_token: string
          p_instance_id: string
          p_mcp_url?: string
          p_org_id: string
        }
        Returns: boolean
      }
      clawdeploy_set_instance_status: {
        Args: { p_instance_id: string; p_org_id: string; p_status: string }
        Returns: boolean
      }
      clawdeploy_sync_subscription_from_stripe: {
        Args: {
          p_cancel_at_period_end?: boolean
          p_current_period_end?: string
          p_plan_tier?: string
          p_status: string
          p_stripe_price_id?: string
          p_stripe_subscription_id: string
        }
        Returns: Json
      }
      clawdeploy_update_instance_api_keys: {
        Args: { p_api_keys: Json; p_instance_id: string; p_org_id: string }
        Returns: boolean
      }
      clawdeploy_upsert_channel: {
        Args: {
          p_config?: Json
          p_instance_id: string
          p_kind: string
          p_org_id: string
        }
        Returns: boolean
      }
      clawdeploy_upsert_clerk_org_member: {
        Args: {
          p_clerk_org_id: string
          p_clerk_user_id: string
          p_organization_id: string
          p_role: string
          p_user_id: string
        }
        Returns: undefined
      }
      clawdeploy_upsert_clerk_organization: {
        Args: {
          p_clerk_org_id: string
          p_name: string
          p_owner_profile_id: string
          p_slug: string
        }
        Returns: {
          clerk_org_id: string | null
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
        SetofOptions: {
          from: "*"
          to: "organizations"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      clawdeploy_upsert_clerk_profile: {
        Args: {
          p_avatar_url: string
          p_clerk_user_id: string
          p_display_name: string
          p_email: string
          p_first_name: string
          p_last_name: string
        }
        Returns: {
          address: string | null
          alt_emails: string[]
          alt_phones: string[]
          arc_level: number
          avatar_url: string | null
          bio: string | null
          city: string | null
          clerk_user_id: string | null
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
        SetofOptions: {
          from: "*"
          to: "profiles"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      clawdeploy_upsert_connector: {
        Args: {
          p_account_handle?: string
          p_instance_id: string
          p_kind: string
          p_label: string
          p_org_id: string
        }
        Returns: boolean
      }
      clerk_internal_org_id: { Args: never; Returns: string }
      clerk_internal_user_id: { Args: never; Returns: string }
      clerk_org_id_from_jwt: { Args: never; Returns: string }
      clerk_user_id: { Args: never; Returns: string }
      clerk_user_id_from_jwt: { Args: never; Returns: string }
      cna_exam_prep_target_template: {
        Args: { p_schedule_template_id: string; p_variation_id: string }
        Returns: string
      }
      compute_schedule_tag: {
        Args: { p_event_time: string; p_start_date: string }
        Returns: string
      }
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
      create_content_item: {
        Args: {
          p_category?: string
          p_difficulty?: string
          p_organization_id: string
          p_payload: Json
          p_stem: string
          p_subject?: string
          p_type: "question" | "activity" | "card"
        }
        Returns: string
      }
      create_manual_question: {
        Args: {
          p_category?: string
          p_correct_answer: string
          p_difficulty?: string
          p_explanation?: string
          p_lesson_id?: string
          p_options: Json
          p_organization_id: string
          p_program_id?: string
          p_question_text: string
          p_status?: string
          p_wrong_answer_explanations?: Json
        }
        Returns: string
      }
      current_app_user_id: { Args: never; Returns: string }
      current_organization_id: { Args: never; Returns: string }
      current_user_has_role: {
        Args: { _role: Database["public"]["Enums"]["app_role"] }
        Returns: boolean
      }
      day_name_to_dow: { Args: { day_name: string }; Returns: number }
      delete_cohort_cascade: {
        Args: { p_cohort_id: string }
        Returns: undefined
      }
      delete_cohort_sessions: { Args: { p_cohort_id: string }; Returns: number }
      dow_int_to_text: { Args: { dow: number }; Returns: string }
      enqueue_salesflow_invoice_sync: {
        Args: { p_order_id: string }
        Returns: string
      }
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
      expire_old_enrollment_keys: { Args: never; Returns: number }
      extend_enrollment_key: {
        Args: { p_extra_days?: number; p_key_id: string }
        Returns: undefined
      }
      fetch_study_flashcards: {
        Args: { p_organization_id: string }
        Returns: {
          back: string
          category: string
          chapter: string
          front: string
          id: string
          subject: string
        }[]
      }
      find_active_order: {
        Args: { p_program_id: string; p_user_id: string }
        Returns: string
      }
      find_duplicate_payment: {
        Args: { p_amount: number; p_email: string; p_paid_at: string }
        Returns: string
      }
      find_profile_by_contact: {
        Args: { p_email: string; p_phone?: string }
        Returns: {
          email: string
          profile_id: string
          user_id: string
        }[]
      }
      generate_cohort_sessions: {
        Args: { p_cohort_id: string; p_force?: boolean }
        Returns: undefined
      }
      generate_cohort_sessions_internal: {
        Args: { p_cohort_id: string }
        Returns: undefined
      }
      generate_cohorts_for_template:
        | {
            Args: {
              p_count?: number
              p_end_date?: string
              p_max_seats?: number
              p_program_id: string
              p_schedule_template_id: string
              p_start_date: string
            }
            Returns: Json
          }
        | {
            Args: {
              p_count?: number
              p_end_date?: string
              p_interval_weeks?: number
              p_max_seats?: number
              p_program_id: string
              p_schedule_template_id: string
              p_start_date: string
            }
            Returns: Json
          }
      generate_enrollment_key_code: {
        Args: { p_program_id: string }
        Returns: string
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
      get_admin_submissions: {
        Args: {
          _flow_id?: string
          _from?: string
          _kinds?: string[]
          _limit?: number
          _offset?: number
          _program_id?: string
          _search?: string
          _source?: string
          _status?: string
          _to?: string
        }
        Returns: {
          attribution: Json
          created_at: string
          email: string
          flow_id: string
          flow_name: string
          id: string
          is_complete: boolean
          kind: string
          kind_label: string
          last_step_index: number
          metadata: Json
          name: string
          outcome: string
          phone: string
          program_id: string
          program_name: string
          ref_id: string
          source: string
          status: string
          total_count: number
          total_steps: number
          user_id: string
          utm_campaign: string
          utm_source: string
        }[]
      }
      get_kiosk_room_id: { Args: { _user_id: string }; Returns: string }
      get_live_display_item: {
        Args: { p_item_id?: string; p_session_id: string }
        Returns: {
          id: string
          redacted_payload: Json
          revealed: boolean
          stem: string
          type: "question" | "activity" | "card"
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
      import_square_payments_page: {
        Args: {
          p_begin_time: string
          p_cursor?: string
          p_end_time?: string
          p_limit?: number
        }
        Returns: Json
      }
      integration_disconnect: {
        Args: { p_integration_id: string }
        Returns: undefined
      }
      integration_get_api_key: {
        Args: { p_integration_id: string }
        Returns: string
      }
      integration_get_api_token: {
        Args: { p_integration_id: string }
        Returns: string
      }
      integration_set_api_key: {
        Args: { p_api_key: string; p_integration_id: string }
        Returns: undefined
      }
      integration_set_api_token: {
        Args: { p_integration_id: string; p_token: string }
        Returns: undefined
      }
      invoke_reconcile_schedules: { Args: never; Returns: undefined }
      is_admin: { Args: never; Returns: boolean }
      is_clerk_org_member: {
        Args: { p_clerk_org_id?: string }
        Returns: boolean
      }
      is_org_member:
        | { Args: { _org_id: string; _user_id: string }; Returns: boolean }
        | { Args: { org_id: string }; Returns: boolean }
      issue_enrollment_key: {
        Args: {
          p_expires_at?: string
          p_notes?: string
          p_owner_user_id: string
          p_program_id: string
          p_source: Database["public"]["Enums"]["enrollment_key_source"]
          p_source_enrollment_id?: string
          p_source_order_id?: string
          p_value_cents?: number
          p_variant_id?: string
        }
        Returns: string
      }
      keys_count_for_purchase: {
        Args: { p_program_id: string; p_variant_id: string }
        Returns: number
      }
      link_clerk_user: {
        Args: {
          p_clerk_user_id: string
          p_email?: string
          p_first_name?: string
          p_last_name?: string
          p_supabase_user_id: string
        }
        Returns: string
      }
      link_payment_to_order: {
        Args: { p_order_id: string; p_payment_log_id: string }
        Returns: undefined
      }
      list_textbook_chapters: {
        Args: { p_textbook_id: string }
        Returns: {
          chapter_title: string
          chunk_count: number
        }[]
      }
      merge_profile_contact: {
        Args: {
          p_email?: string
          p_first_name?: string
          p_last_name?: string
          p_phone?: string
          p_user_id: string
        }
        Returns: undefined
      }
      move_enrollment_to_cohort: {
        Args: { p_enrollment_id: string; p_new_cohort_id: string }
        Returns: Json
      }
      normalize_payment_phone: { Args: { p_phone: string }; Returns: string }
      normalize_phone: { Args: { p: string }; Returns: string }
      payment_log_buyer_email: { Args: { p_raw: Json }; Returns: string }
      payment_log_buyer_name: { Args: { p_raw: Json }; Returns: string }
      payment_log_buyer_phone: { Args: { p_raw: Json }; Returns: string }
      payment_log_square_customer_id: { Args: { p_raw: Json }; Returns: string }
      preview_sessions: {
        Args: {
          p_max_count?: number
          p_start_date: string
          p_template_id: string
        }
        Returns: {
          duration_hours: number
          session_date: string
          session_number: number
          session_start_time: string
          session_type: string
        }[]
      }
      process_clerk_import: { Args: { batch_size?: number }; Returns: Json }
      rate_content_item: {
        Args: {
          p_comment?: string
          p_content_item_id: string
          p_organization_id: string
          p_rating: number
        }
        Returns: undefined
      }
      rebalance_installments: {
        Args: { p_order_id: string }
        Returns: undefined
      }
      recalculate_cohort_enrolled_count: {
        Args: { p_cohort_id: string }
        Returns: undefined
      }
      recompute_all_schedule_tags: { Args: never; Returns: number }
      record_corpus_practice_session: {
        Args: {
          p_correct_count: number
          p_items: Json
          p_mode: string
          p_organization_id: string
          p_score: number
          p_subject: string
          p_total_items: number
          p_user_id: string
        }
        Returns: string
      }
      redeem_enrollment_key: {
        Args: { p_code: string; p_cohort_id: string }
        Returns: string
      }
      refresh_cohort_template_snapshot: {
        Args: { p_cohort_id: string }
        Returns: boolean
      }
      regenerate_cohort_sessions_for_template: {
        Args: { p_include_enrolled?: boolean; p_template_id: string }
        Returns: Json
      }
      resolve_payment_log_student: {
        Args: { p_payment_log_id: string }
        Returns: Json
      }
      review_question: {
        Args: { p_question_id: string; p_status: string }
        Returns: undefined
      }
      revoke_enrollment_key: {
        Args: { p_key_id: string; p_reason?: string }
        Returns: undefined
      }
      search_textbook_chunks:
        | {
            Args: {
              p_limit?: number
              p_organization_id: string
              p_query_embedding: string
            }
            Returns: {
              chapter_title: string
              chunk_id: string
              content: string
              similarity: number
              textbook_id: string
            }[]
          }
        | {
            Args: {
              p_chapter_titles?: string[]
              p_limit?: number
              p_organization_id: string
              p_query_embedding: string
              p_textbook_id?: string
            }
            Returns: {
              chapter_title: string
              chunk_id: string
              content: string
              similarity: number
              textbook_id: string
            }[]
          }
      search_unmatched_payments: {
        Args: {
          p_amount?: number
          p_days?: number
          p_email?: string
          p_search?: string
          p_user_id?: string
        }
        Returns: {
          amount: number
          buyer_email: string
          buyer_name: string
          created_at: string
          id: string
          provider: string
          provider_transaction_id: string
          receipt_number: string
          status: string
          student_match_status: string
          user_id: string
        }[]
      }
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
      so_has_role: {
        Args: {
          _org: string
          _roles: Database["public"]["Enums"]["so_role"][]
          _uid: string
        }
        Returns: boolean
      }
      submit_checkin: {
        Args: { p_identifier: string; p_method?: string; p_token: string }
        Returns: Json
      }
      sync_order_payments_from_logs: {
        Args: { p_order_id: string }
        Returns: Json
      }
      upsert_lead: {
        Args: {
          p_email: string
          p_name: string
          p_phone: string
          p_program: string
        }
        Returns: string
      }
      user_belongs_to_org: {
        Args: { _org_id: string; _user_id: string }
        Returns: boolean
      }
      validate_checkin_token: { Args: { p_token: string }; Returns: Json }
      wws_is_admin: { Args: { uid: string }; Returns: boolean }
    }
    Enums: {
      ao_approval_status: "pending" | "approved" | "rejected"
      ao_integration_kind:
        | "pipedream"
        | "composio"
        | "github"
        | "mcp"
        | "resend"
      ao_ledger_reason: "chat" | "grant" | "adjustment" | "signup_bonus"
      ao_message_role: "system" | "user" | "assistant" | "tool"
      ao_org_role: "owner" | "admin" | "member"
      ao_provider: "openai" | "anthropic"
      ao_run_status:
        | "pending"
        | "running"
        | "succeeded"
        | "failed"
        | "cancelled"
      ao_space_deploy_provider: "static" | "vercel" | "coolify"
      ao_space_deploy_status: "pending" | "live" | "failed"
      ao_space_preview_mode: "static_html"
      ao_space_status: "draft" | "published" | "archived"
      app_role:
        | "admin"
        | "user"
        | "student"
        | "instructor"
        | "super_instructor"
        | "super_admin"
        | "kiosk"
      bundle_access_type: "lifetime" | "months" | "until_exam"
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
      enrollment_key_source: "withdrawal" | "admin_issued" | "prepaid_purchase"
      enrollment_key_status: "active" | "redeemed" | "expired" | "revoked"
      import_batch_source: "excel" | "eventbrite"
      import_batch_status:
        | "preview"
        | "running"
        | "completed"
        | "failed"
        | "rolled_back"
      import_row_outcome:
        | "pending"
        | "created"
        | "existing_linked"
        | "duplicate_in_cohort"
        | "waitlisted"
        | "failed"
        | "skipped"
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
      so_analytics_event_type:
        | "view"
        | "accept"
        | "decline"
        | "share"
        | "download"
        | "contact_click"
        | "expired"
      so_event_type:
        | "offer_viewed"
        | "offer_opened"
        | "cta_clicked"
        | "option_selected"
        | "change_requested"
        | "accepted"
        | "declined"
        | "pdf_downloaded"
        | "link_shared"
        | "custom"
      so_offer_status:
        | "draft"
        | "sent"
        | "viewed"
        | "accepted"
        | "declined"
        | "expired"
        | "archived"
      so_offer_type:
        | "cash"
        | "subject_to"
        | "seller_financing"
        | "lease_option"
        | "novation"
        | "comparison"
        | "appointment"
        | "follow_up"
        | "custom"
      so_role: "owner" | "admin" | "member" | "viewer"
      sp_member_role: "admin" | "member"
      sp_poll_status: "draft" | "active" | "closed" | "archived"
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
      ao_approval_status: ["pending", "approved", "rejected"],
      ao_integration_kind: ["pipedream", "composio", "github", "mcp", "resend"],
      ao_ledger_reason: ["chat", "grant", "adjustment", "signup_bonus"],
      ao_message_role: ["system", "user", "assistant", "tool"],
      ao_org_role: ["owner", "admin", "member"],
      ao_provider: ["openai", "anthropic"],
      ao_run_status: ["pending", "running", "succeeded", "failed", "cancelled"],
      ao_space_deploy_provider: ["static", "vercel", "coolify"],
      ao_space_deploy_status: ["pending", "live", "failed"],
      ao_space_preview_mode: ["static_html"],
      ao_space_status: ["draft", "published", "archived"],
      app_role: [
        "admin",
        "user",
        "student",
        "instructor",
        "super_instructor",
        "super_admin",
        "kiosk",
      ],
      bundle_access_type: ["lifetime", "months", "until_exam"],
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
      enrollment_key_source: ["withdrawal", "admin_issued", "prepaid_purchase"],
      enrollment_key_status: ["active", "redeemed", "expired", "revoked"],
      import_batch_source: ["excel", "eventbrite"],
      import_batch_status: [
        "preview",
        "running",
        "completed",
        "failed",
        "rolled_back",
      ],
      import_row_outcome: [
        "pending",
        "created",
        "existing_linked",
        "duplicate_in_cohort",
        "waitlisted",
        "failed",
        "skipped",
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
      so_analytics_event_type: [
        "view",
        "accept",
        "decline",
        "share",
        "download",
        "contact_click",
        "expired",
      ],
      so_event_type: [
        "offer_viewed",
        "offer_opened",
        "cta_clicked",
        "option_selected",
        "change_requested",
        "accepted",
        "declined",
        "pdf_downloaded",
        "link_shared",
        "custom",
      ],
      so_offer_status: [
        "draft",
        "sent",
        "viewed",
        "accepted",
        "declined",
        "expired",
        "archived",
      ],
      so_offer_type: [
        "cash",
        "subject_to",
        "seller_financing",
        "lease_option",
        "novation",
        "comparison",
        "appointment",
        "follow_up",
        "custom",
      ],
      so_role: ["owner", "admin", "member", "viewer"],
      sp_member_role: ["admin", "member"],
      sp_poll_status: ["draft", "active", "closed", "archived"],
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
