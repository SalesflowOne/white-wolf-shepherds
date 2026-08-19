export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1";
  };
  public: {
    Tables: {
      abandoned_funnels: {
        Row: {
          address: string | null;
          city: string | null;
          created_at: string;
          email: string | null;
          first_name: string | null;
          id: string;
          last_name: string | null;
          last_step: number;
          last_step_label: string;
          order_id: string | null;
          payment_option: string | null;
          phone: string | null;
          program_code: string;
          program_id: string | null;
          recovered: boolean;
          resume_token: string | null;
          selected_date_id: string | null;
          selected_ghl_slot: string | null;
          selected_variant_id: string | null;
          session_id: string;
          state: string | null;
          updated_at: string;
          user_id: string | null;
          zip: string | null;
        };
        Insert: {
          address?: string | null;
          city?: string | null;
          created_at?: string;
          email?: string | null;
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
          last_step?: number;
          last_step_label?: string;
          order_id?: string | null;
          payment_option?: string | null;
          phone?: string | null;
          program_code: string;
          program_id?: string | null;
          recovered?: boolean;
          resume_token?: string | null;
          selected_date_id?: string | null;
          selected_ghl_slot?: string | null;
          selected_variant_id?: string | null;
          session_id: string;
          state?: string | null;
          updated_at?: string;
          user_id?: string | null;
          zip?: string | null;
        };
        Update: {
          address?: string | null;
          city?: string | null;
          created_at?: string;
          email?: string | null;
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
          last_step?: number;
          last_step_label?: string;
          order_id?: string | null;
          payment_option?: string | null;
          phone?: string | null;
          program_code?: string;
          program_id?: string | null;
          recovered?: boolean;
          resume_token?: string | null;
          selected_date_id?: string | null;
          selected_ghl_slot?: string | null;
          selected_variant_id?: string | null;
          session_id?: string;
          state?: string | null;
          updated_at?: string;
          user_id?: string | null;
          zip?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "abandoned_funnels_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "abandoned_funnels_program_id_fkey";
            columns: ["program_id"];
            isOneToOne: false;
            referencedRelation: "programs";
            referencedColumns: ["id"];
          },
        ];
      };
      admin_chat_messages: {
        Row: {
          content: string;
          created_at: string;
          id: string;
          metadata: Json;
          role: string;
          thread_id: string;
        };
        Insert: {
          content?: string;
          created_at?: string;
          id?: string;
          metadata?: Json;
          role: string;
          thread_id: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: string;
          metadata?: Json;
          role?: string;
          thread_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "admin_chat_messages_thread_id_fkey";
            columns: ["thread_id"];
            isOneToOne: false;
            referencedRelation: "admin_chat_threads";
            referencedColumns: ["id"];
          },
        ];
      };
      admin_chat_threads: {
        Row: {
          created_at: string;
          id: string;
          title: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          title?: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          title?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "admin_chat_threads_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      admin_enrollment_corrections: {
        Row: {
          after_state: Json;
          before_state: Json;
          corrected_by: string | null;
          correction_type: string;
          created_at: string;
          enrollment_id: string;
          id: string;
          reason: string;
          related_order_id: string | null;
          warnings: string[];
        };
        Insert: {
          after_state?: Json;
          before_state?: Json;
          corrected_by?: string | null;
          correction_type?: string;
          created_at?: string;
          enrollment_id: string;
          id?: string;
          reason: string;
          related_order_id?: string | null;
          warnings?: string[];
        };
        Update: {
          after_state?: Json;
          before_state?: Json;
          corrected_by?: string | null;
          correction_type?: string;
          created_at?: string;
          enrollment_id?: string;
          id?: string;
          reason?: string;
          related_order_id?: string | null;
          warnings?: string[];
        };
        Relationships: [
          {
            foreignKeyName: "admin_enrollment_corrections_corrected_by_fkey";
            columns: ["corrected_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "admin_enrollment_corrections_enrollment_id_fkey";
            columns: ["enrollment_id"];
            isOneToOne: false;
            referencedRelation: "enrollments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "admin_enrollment_corrections_related_order_id_fkey";
            columns: ["related_order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
        ];
      };
      agreement_templates: {
        Row: {
          content_json: Json;
          created_at: string | null;
          created_by: string | null;
          description: string | null;
          id: string;
          is_active: boolean;
          is_default: boolean;
          is_system_default: boolean;
          name: string;
          organization_id: string | null;
          updated_at: string | null;
          version: number;
        };
        Insert: {
          content_json?: Json;
          created_at?: string | null;
          created_by?: string | null;
          description?: string | null;
          id?: string;
          is_active?: boolean;
          is_default?: boolean;
          is_system_default?: boolean;
          name: string;
          organization_id?: string | null;
          updated_at?: string | null;
          version?: number;
        };
        Update: {
          content_json?: Json;
          created_at?: string | null;
          created_by?: string | null;
          description?: string | null;
          id?: string;
          is_active?: boolean;
          is_default?: boolean;
          is_system_default?: boolean;
          name?: string;
          organization_id?: string | null;
          updated_at?: string | null;
          version?: number;
        };
        Relationships: [
          {
            foreignKeyName: "agreement_templates_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "agreement_templates_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      ambassador_profiles: {
        Row: {
          id: string;
          joined_at: string;
          organization_id: string | null;
          residual_rate_cents: number;
          status: string;
          tier: string;
          total_lifetime_earned_cents: number;
          total_lifetime_referrals: number;
          user_id: string;
        };
        Insert: {
          id?: string;
          joined_at?: string;
          organization_id?: string | null;
          residual_rate_cents?: number;
          status?: string;
          tier?: string;
          total_lifetime_earned_cents?: number;
          total_lifetime_referrals?: number;
          user_id: string;
        };
        Update: {
          id?: string;
          joined_at?: string;
          organization_id?: string | null;
          residual_rate_cents?: number;
          status?: string;
          tier?: string;
          total_lifetime_earned_cents?: number;
          total_lifetime_referrals?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ambassador_profiles_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ambassador_profiles_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      anonymous_chat_logs: {
        Row: {
          created_at: string;
          id: string;
          ip_address: string;
          v0_chat_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          ip_address: string;
          v0_chat_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          ip_address?: string;
          v0_chat_id?: string;
        };
        Relationships: [];
      };
      ao_ad_conversion_queue: {
        Row: {
          attempts: number;
          conversion_type: string | null;
          created_at: string;
          event_name: string;
          id: string;
          last_error: string | null;
          payload: Json;
          sent_at: string | null;
          status: string;
          user_id: string | null;
        };
        Insert: {
          attempts?: number;
          conversion_type?: string | null;
          created_at?: string;
          event_name: string;
          id?: string;
          last_error?: string | null;
          payload?: Json;
          sent_at?: string | null;
          status?: string;
          user_id?: string | null;
        };
        Update: {
          attempts?: number;
          conversion_type?: string | null;
          created_at?: string;
          event_name?: string;
          id?: string;
          last_error?: string | null;
          payload?: Json;
          sent_at?: string | null;
          status?: string;
          user_id?: string | null;
        };
        Relationships: [];
      };
      ao_admin_audit_log: {
        Row: {
          action: string;
          actor_user_id: string;
          after_value: Json | null;
          before_value: Json | null;
          created_at: string;
          entity_id: string | null;
          entity_type: string;
          id: string;
          ip_address: string | null;
          reason: string | null;
          session_metadata: Json;
        };
        Insert: {
          action: string;
          actor_user_id: string;
          after_value?: Json | null;
          before_value?: Json | null;
          created_at?: string;
          entity_id?: string | null;
          entity_type: string;
          id?: string;
          ip_address?: string | null;
          reason?: string | null;
          session_metadata?: Json;
        };
        Update: {
          action?: string;
          actor_user_id?: string;
          after_value?: Json | null;
          before_value?: Json | null;
          created_at?: string;
          entity_id?: string | null;
          entity_type?: string;
          id?: string;
          ip_address?: string | null;
          reason?: string | null;
          session_metadata?: Json;
        };
        Relationships: [];
      };
      ao_agenda_prefs: {
        Row: {
          auto_export_blocks: boolean;
          break_minutes: number;
          calendar_mode: Database["public"]["Enums"]["ao_agenda_calendar_mode"];
          created_at: string;
          focus_block_minutes: number;
          id: string;
          location_label: string | null;
          lunch_end: string | null;
          lunch_start: string | null;
          org_id: string;
          planning_horizon_days: number;
          timezone: string;
          timezone_confirmed_at: string | null;
          timezone_source: string | null;
          updated_at: string;
          user_id: string;
          workday_end: string;
          workday_start: string;
          workdays: number[];
        };
        Insert: {
          auto_export_blocks?: boolean;
          break_minutes?: number;
          calendar_mode?: Database["public"]["Enums"]["ao_agenda_calendar_mode"];
          created_at?: string;
          focus_block_minutes?: number;
          id?: string;
          location_label?: string | null;
          lunch_end?: string | null;
          lunch_start?: string | null;
          org_id: string;
          planning_horizon_days?: number;
          timezone?: string;
          timezone_confirmed_at?: string | null;
          timezone_source?: string | null;
          updated_at?: string;
          user_id: string;
          workday_end?: string;
          workday_start?: string;
          workdays?: number[];
        };
        Update: {
          auto_export_blocks?: boolean;
          break_minutes?: number;
          calendar_mode?: Database["public"]["Enums"]["ao_agenda_calendar_mode"];
          created_at?: string;
          focus_block_minutes?: number;
          id?: string;
          location_label?: string | null;
          lunch_end?: string | null;
          lunch_start?: string | null;
          org_id?: string;
          planning_horizon_days?: number;
          timezone?: string;
          timezone_confirmed_at?: string | null;
          timezone_source?: string | null;
          updated_at?: string;
          user_id?: string;
          workday_end?: string;
          workday_start?: string;
          workdays?: number[];
        };
        Relationships: [
          {
            foreignKeyName: "ao_agenda_prefs_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_agenda_prefs_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_agent_config_versions: {
        Row: {
          agent_id: string;
          change_summary: string | null;
          config: Json;
          id: string;
          org_id: string;
          published_at: string;
          published_by: string | null;
          version: number;
        };
        Insert: {
          agent_id: string;
          change_summary?: string | null;
          config: Json;
          id?: string;
          org_id: string;
          published_at?: string;
          published_by?: string | null;
          version: number;
        };
        Update: {
          agent_id?: string;
          change_summary?: string | null;
          config?: Json;
          id?: string;
          org_id?: string;
          published_at?: string;
          published_by?: string | null;
          version?: number;
        };
        Relationships: [
          {
            foreignKeyName: "ao_agent_config_versions_agent_id_fkey";
            columns: ["agent_id"];
            isOneToOne: false;
            referencedRelation: "ao_agents";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_agent_config_versions_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_agent_error_audit: {
        Row: {
          agent_run_id: string | null;
          created_at: string;
          cursor_fix_status: string;
          cursor_fix_triggered_at: string | null;
          error_code: string | null;
          error_name: string | null;
          fingerprint: string;
          id: string;
          kind: string;
          message: string;
          metadata: Json;
          model_id: string | null;
          org_id: string;
          phase: string | null;
          route: string | null;
          thread_id: string | null;
          tool_name: string | null;
          user_id: string | null;
        };
        Insert: {
          agent_run_id?: string | null;
          created_at?: string;
          cursor_fix_status?: string;
          cursor_fix_triggered_at?: string | null;
          error_code?: string | null;
          error_name?: string | null;
          fingerprint: string;
          id?: string;
          kind?: string;
          message: string;
          metadata?: Json;
          model_id?: string | null;
          org_id: string;
          phase?: string | null;
          route?: string | null;
          thread_id?: string | null;
          tool_name?: string | null;
          user_id?: string | null;
        };
        Update: {
          agent_run_id?: string | null;
          created_at?: string;
          cursor_fix_status?: string;
          cursor_fix_triggered_at?: string | null;
          error_code?: string | null;
          error_name?: string | null;
          fingerprint?: string;
          id?: string;
          kind?: string;
          message?: string;
          metadata?: Json;
          model_id?: string | null;
          org_id?: string;
          phase?: string | null;
          route?: string | null;
          thread_id?: string | null;
          tool_name?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ao_agent_error_audit_agent_run_id_fkey";
            columns: ["agent_run_id"];
            isOneToOne: false;
            referencedRelation: "ao_agent_runs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_agent_error_audit_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_agent_error_audit_thread_id_fkey";
            columns: ["thread_id"];
            isOneToOne: false;
            referencedRelation: "ao_threads";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_agent_error_audit_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_agent_integration_grants: {
        Row: {
          account_constraints: Json;
          agent_id: string;
          approval_mode: string;
          created_at: string;
          created_by: string | null;
          id: string;
          integration_id: string;
          org_id: string;
          scopes: string[];
          updated_at: string;
        };
        Insert: {
          account_constraints?: Json;
          agent_id: string;
          approval_mode?: string;
          created_at?: string;
          created_by?: string | null;
          id?: string;
          integration_id: string;
          org_id: string;
          scopes?: string[];
          updated_at?: string;
        };
        Update: {
          account_constraints?: Json;
          agent_id?: string;
          approval_mode?: string;
          created_at?: string;
          created_by?: string | null;
          id?: string;
          integration_id?: string;
          org_id?: string;
          scopes?: string[];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_agent_integration_grants_agent_id_fkey";
            columns: ["agent_id"];
            isOneToOne: false;
            referencedRelation: "ao_agents";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_agent_integration_grants_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_agent_integration_grants_integration_id_fkey";
            columns: ["integration_id"];
            isOneToOne: false;
            referencedRelation: "ao_integrations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_agent_integration_grants_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_agent_runs: {
        Row: {
          agent_id: string | null;
          created_at: string;
          created_by: string | null;
          ended_at: string | null;
          error: string | null;
          external_id: string | null;
          id: string;
          input: Json | null;
          metadata: Json;
          org_id: string;
          output: Json | null;
          parent_run_id: string | null;
          source: string;
          started_at: string | null;
          status: Database["public"]["Enums"]["ao_run_status"];
        };
        Insert: {
          agent_id?: string | null;
          created_at?: string;
          created_by?: string | null;
          ended_at?: string | null;
          error?: string | null;
          external_id?: string | null;
          id?: string;
          input?: Json | null;
          metadata?: Json;
          org_id: string;
          output?: Json | null;
          parent_run_id?: string | null;
          source?: string;
          started_at?: string | null;
          status?: Database["public"]["Enums"]["ao_run_status"];
        };
        Update: {
          agent_id?: string | null;
          created_at?: string;
          created_by?: string | null;
          ended_at?: string | null;
          error?: string | null;
          external_id?: string | null;
          id?: string;
          input?: Json | null;
          metadata?: Json;
          org_id?: string;
          output?: Json | null;
          parent_run_id?: string | null;
          source?: string;
          started_at?: string | null;
          status?: Database["public"]["Enums"]["ao_run_status"];
        };
        Relationships: [
          {
            foreignKeyName: "ao_agent_runs_agent_id_fkey";
            columns: ["agent_id"];
            isOneToOne: false;
            referencedRelation: "ao_agents";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_agent_runs_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_agent_runs_parent_run_id_fkey";
            columns: ["parent_run_id"];
            isOneToOne: false;
            referencedRelation: "ao_agent_runs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_agents: {
        Row: {
          config_version: number;
          created_at: string;
          created_by: string | null;
          department: string | null;
          description: string | null;
          draft_config: Json;
          id: string;
          is_scoped: boolean;
          mission: string | null;
          model: string;
          name: string;
          org_id: string;
          published_at: string | null;
          published_config: Json;
          role: string;
          scope_config: Json;
          system_prompt: string;
          tools: Json;
          updated_at: string;
        };
        Insert: {
          config_version?: number;
          created_at?: string;
          created_by?: string | null;
          department?: string | null;
          description?: string | null;
          draft_config?: Json;
          id?: string;
          is_scoped?: boolean;
          mission?: string | null;
          model?: string;
          name: string;
          org_id: string;
          published_at?: string | null;
          published_config?: Json;
          role?: string;
          scope_config?: Json;
          system_prompt?: string;
          tools?: Json;
          updated_at?: string;
        };
        Update: {
          config_version?: number;
          created_at?: string;
          created_by?: string | null;
          department?: string | null;
          description?: string | null;
          draft_config?: Json;
          id?: string;
          is_scoped?: boolean;
          mission?: string | null;
          model?: string;
          name?: string;
          org_id?: string;
          published_at?: string | null;
          published_config?: Json;
          role?: string;
          scope_config?: Json;
          system_prompt?: string;
          tools?: Json;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_agents_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_ai_models: {
        Row: {
          active: boolean;
          audio_support: boolean;
          auto_eligible: boolean;
          auto_priority: number;
          billing_increment_micro_credits: number | null;
          capability_tags: string[];
          category: string;
          coding_rating: number;
          context_max_tokens: number | null;
          cost_buffer_percent: number | null;
          cost_cached_input_per_million: number;
          cost_input_token_per_million: number;
          cost_output_token_per_million: number;
          cost_reasoning_per_million: number;
          cost_request_micro_usd: number;
          cost_tool_call_micro_usd: number;
          created_at: string;
          credit_rounding_method: Database["public"]["Enums"]["ao_rounding_method"] | null;
          customer_name: string;
          deprecated: boolean;
          description: string | null;
          effective_at: string;
          expires_at: string | null;
          fallback_model_id: string | null;
          fixed_credits_per_million_input: number | null;
          fixed_credits_per_million_output: number | null;
          fixed_credits_per_request: number | null;
          icon: string | null;
          id: string;
          internal_model_id: string;
          internal_only: boolean;
          manual_select_eligible: boolean;
          markup_method: Database["public"]["Enums"]["ao_markup_method"] | null;
          markup_multiplier: number | null;
          markup_percent: number | null;
          maximum_charge_credits: number | null;
          minimum_charge_credits: number | null;
          plan_slugs: string[];
          popular: boolean;
          pricing_version: number;
          provider_model_id: string;
          provider_slug: string;
          reasoning_rating: number;
          reliability_rating: number;
          risk_classification: string;
          show_model_name: boolean;
          show_provider_name: boolean;
          speed_rating: number;
          structured_output_support: boolean;
          tool_support: boolean;
          updated_at: string;
          vision_support: boolean;
          workspace_ids: string[];
        };
        Insert: {
          active?: boolean;
          audio_support?: boolean;
          auto_eligible?: boolean;
          auto_priority?: number;
          billing_increment_micro_credits?: number | null;
          capability_tags?: string[];
          category?: string;
          coding_rating?: number;
          context_max_tokens?: number | null;
          cost_buffer_percent?: number | null;
          cost_cached_input_per_million?: number;
          cost_input_token_per_million?: number;
          cost_output_token_per_million?: number;
          cost_reasoning_per_million?: number;
          cost_request_micro_usd?: number;
          cost_tool_call_micro_usd?: number;
          created_at?: string;
          credit_rounding_method?: Database["public"]["Enums"]["ao_rounding_method"] | null;
          customer_name: string;
          deprecated?: boolean;
          description?: string | null;
          effective_at?: string;
          expires_at?: string | null;
          fallback_model_id?: string | null;
          fixed_credits_per_million_input?: number | null;
          fixed_credits_per_million_output?: number | null;
          fixed_credits_per_request?: number | null;
          icon?: string | null;
          id: string;
          internal_model_id: string;
          internal_only?: boolean;
          manual_select_eligible?: boolean;
          markup_method?: Database["public"]["Enums"]["ao_markup_method"] | null;
          markup_multiplier?: number | null;
          markup_percent?: number | null;
          maximum_charge_credits?: number | null;
          minimum_charge_credits?: number | null;
          plan_slugs?: string[];
          popular?: boolean;
          pricing_version?: number;
          provider_model_id: string;
          provider_slug: string;
          reasoning_rating?: number;
          reliability_rating?: number;
          risk_classification?: string;
          show_model_name?: boolean;
          show_provider_name?: boolean;
          speed_rating?: number;
          structured_output_support?: boolean;
          tool_support?: boolean;
          updated_at?: string;
          vision_support?: boolean;
          workspace_ids?: string[];
        };
        Update: {
          active?: boolean;
          audio_support?: boolean;
          auto_eligible?: boolean;
          auto_priority?: number;
          billing_increment_micro_credits?: number | null;
          capability_tags?: string[];
          category?: string;
          coding_rating?: number;
          context_max_tokens?: number | null;
          cost_buffer_percent?: number | null;
          cost_cached_input_per_million?: number;
          cost_input_token_per_million?: number;
          cost_output_token_per_million?: number;
          cost_reasoning_per_million?: number;
          cost_request_micro_usd?: number;
          cost_tool_call_micro_usd?: number;
          created_at?: string;
          credit_rounding_method?: Database["public"]["Enums"]["ao_rounding_method"] | null;
          customer_name?: string;
          deprecated?: boolean;
          description?: string | null;
          effective_at?: string;
          expires_at?: string | null;
          fallback_model_id?: string | null;
          fixed_credits_per_million_input?: number | null;
          fixed_credits_per_million_output?: number | null;
          fixed_credits_per_request?: number | null;
          icon?: string | null;
          id?: string;
          internal_model_id?: string;
          internal_only?: boolean;
          manual_select_eligible?: boolean;
          markup_method?: Database["public"]["Enums"]["ao_markup_method"] | null;
          markup_multiplier?: number | null;
          markup_percent?: number | null;
          maximum_charge_credits?: number | null;
          minimum_charge_credits?: number | null;
          plan_slugs?: string[];
          popular?: boolean;
          pricing_version?: number;
          provider_model_id?: string;
          provider_slug?: string;
          reasoning_rating?: number;
          reliability_rating?: number;
          risk_classification?: string;
          show_model_name?: boolean;
          show_provider_name?: boolean;
          speed_rating?: number;
          structured_output_support?: boolean;
          tool_support?: boolean;
          updated_at?: string;
          vision_support?: boolean;
          workspace_ids?: string[];
        };
        Relationships: [
          {
            foreignKeyName: "ao_ai_models_fallback_model_id_fkey";
            columns: ["fallback_model_id"];
            isOneToOne: false;
            referencedRelation: "ao_ai_models";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_ai_models_provider_slug_fkey";
            columns: ["provider_slug"];
            isOneToOne: false;
            referencedRelation: "ao_ai_providers";
            referencedColumns: ["slug"];
          },
        ];
      };
      ao_ai_providers: {
        Row: {
          api_connection_status: string;
          auto_eligible: boolean;
          compliance_metadata: Json;
          cost_buffer_percent: number;
          created_at: string;
          currency: string;
          data_retention_class: string | null;
          default_markup_multiplier: number;
          default_markup_percent: number;
          default_minimum_charge_credits: number;
          effective_at: string;
          emergency_disabled: boolean;
          fallback_behavior: string;
          health_status: string;
          name: string;
          pricing_version: number;
          priority: number;
          rate_limit_rpm: number | null;
          rounding_method: Database["public"]["Enums"]["ao_rounding_method"];
          slug: string;
          status: Database["public"]["Enums"]["ao_provider_status"];
          updated_at: string;
        };
        Insert: {
          api_connection_status?: string;
          auto_eligible?: boolean;
          compliance_metadata?: Json;
          cost_buffer_percent?: number;
          created_at?: string;
          currency?: string;
          data_retention_class?: string | null;
          default_markup_multiplier?: number;
          default_markup_percent?: number;
          default_minimum_charge_credits?: number;
          effective_at?: string;
          emergency_disabled?: boolean;
          fallback_behavior?: string;
          health_status?: string;
          name: string;
          pricing_version?: number;
          priority?: number;
          rate_limit_rpm?: number | null;
          rounding_method?: Database["public"]["Enums"]["ao_rounding_method"];
          slug: string;
          status?: Database["public"]["Enums"]["ao_provider_status"];
          updated_at?: string;
        };
        Update: {
          api_connection_status?: string;
          auto_eligible?: boolean;
          compliance_metadata?: Json;
          cost_buffer_percent?: number;
          created_at?: string;
          currency?: string;
          data_retention_class?: string | null;
          default_markup_multiplier?: number;
          default_markup_percent?: number;
          default_minimum_charge_credits?: number;
          effective_at?: string;
          emergency_disabled?: boolean;
          fallback_behavior?: string;
          health_status?: string;
          name?: string;
          pricing_version?: number;
          priority?: number;
          rate_limit_rpm?: number | null;
          rounding_method?: Database["public"]["Enums"]["ao_rounding_method"];
          slug?: string;
          status?: Database["public"]["Enums"]["ao_provider_status"];
          updated_at?: string;
        };
        Relationships: [];
      };
      ao_analytics_events: {
        Row: {
          created_at: string;
          event_name: string;
          id: string;
          payload: Json;
          session_id: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          event_name: string;
          id?: string;
          payload?: Json;
          session_id?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          event_name?: string;
          id?: string;
          payload?: Json;
          session_id?: string | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
      ao_anchor_webhook_events: {
        Row: {
          browser_run_id: string | null;
          event_id: string;
          event_type: string;
          id: string;
          org_id: string | null;
          payload: Json;
          processed_at: string;
          session_id: string | null;
        };
        Insert: {
          browser_run_id?: string | null;
          event_id: string;
          event_type: string;
          id?: string;
          org_id?: string | null;
          payload?: Json;
          processed_at?: string;
          session_id?: string | null;
        };
        Update: {
          browser_run_id?: string | null;
          event_id?: string;
          event_type?: string;
          id?: string;
          org_id?: string | null;
          payload?: Json;
          processed_at?: string;
          session_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ao_anchor_webhook_events_browser_run_id_fkey";
            columns: ["browser_run_id"];
            isOneToOne: false;
            referencedRelation: "ao_browser_runs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_anchor_webhook_events_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_api_keys: {
        Row: {
          created_at: string;
          created_by: string | null;
          encrypted_key: string;
          id: string;
          label: string;
          last4: string;
          org_id: string;
          provider: Database["public"]["Enums"]["ao_provider"];
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          encrypted_key: string;
          id?: string;
          label?: string;
          last4: string;
          org_id: string;
          provider: Database["public"]["Enums"]["ao_provider"];
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          encrypted_key?: string;
          id?: string;
          label?: string;
          last4?: string;
          org_id?: string;
          provider?: Database["public"]["Enums"]["ao_provider"];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_api_keys_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_approvals: {
        Row: {
          created_at: string;
          decided_at: string | null;
          decided_by: string | null;
          id: string;
          org_id: string;
          requested_action: Json;
          run_id: string | null;
          status: Database["public"]["Enums"]["ao_approval_status"];
        };
        Insert: {
          created_at?: string;
          decided_at?: string | null;
          decided_by?: string | null;
          id?: string;
          org_id: string;
          requested_action: Json;
          run_id?: string | null;
          status?: Database["public"]["Enums"]["ao_approval_status"];
        };
        Update: {
          created_at?: string;
          decided_at?: string | null;
          decided_by?: string | null;
          id?: string;
          org_id?: string;
          requested_action?: Json;
          run_id?: string | null;
          status?: Database["public"]["Enums"]["ao_approval_status"];
        };
        Relationships: [
          {
            foreignKeyName: "ao_approvals_decided_by_fkey";
            columns: ["decided_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_approvals_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_approvals_run_id_fkey";
            columns: ["run_id"];
            isOneToOne: false;
            referencedRelation: "ao_agent_runs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_artifacts: {
        Row: {
          content: string | null;
          created_at: string;
          created_by: string | null;
          id: string;
          kind: string;
          language: string | null;
          metadata: Json;
          mime_type: string | null;
          org_id: string;
          storage_path: string | null;
          thread_id: string | null;
          title: string;
          updated_at: string;
        };
        Insert: {
          content?: string | null;
          created_at?: string;
          created_by?: string | null;
          id?: string;
          kind: string;
          language?: string | null;
          metadata?: Json;
          mime_type?: string | null;
          org_id: string;
          storage_path?: string | null;
          thread_id?: string | null;
          title?: string;
          updated_at?: string;
        };
        Update: {
          content?: string | null;
          created_at?: string;
          created_by?: string | null;
          id?: string;
          kind?: string;
          language?: string | null;
          metadata?: Json;
          mime_type?: string | null;
          org_id?: string;
          storage_path?: string | null;
          thread_id?: string | null;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_artifacts_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_artifacts_thread_id_fkey";
            columns: ["thread_id"];
            isOneToOne: false;
            referencedRelation: "ao_threads";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_audit_events: {
        Row: {
          actor_id: string | null;
          created_at: string;
          id: string;
          kind: string;
          metadata: Json;
          org_id: string;
          resource_id: string | null;
          resource_type: string | null;
          severity: string;
          summary: string;
        };
        Insert: {
          actor_id?: string | null;
          created_at?: string;
          id?: string;
          kind: string;
          metadata?: Json;
          org_id: string;
          resource_id?: string | null;
          resource_type?: string | null;
          severity?: string;
          summary: string;
        };
        Update: {
          actor_id?: string | null;
          created_at?: string;
          id?: string;
          kind?: string;
          metadata?: Json;
          org_id?: string;
          resource_id?: string | null;
          resource_type?: string | null;
          severity?: string;
          summary?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_audit_events_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_automation_events: {
        Row: {
          automation_id: string | null;
          created_at: string;
          error: string | null;
          event_name: string;
          event_source: string;
          id: string;
          org_id: string;
          payload: Json;
          run_id: string | null;
          status: string;
        };
        Insert: {
          automation_id?: string | null;
          created_at?: string;
          error?: string | null;
          event_name: string;
          event_source: string;
          id?: string;
          org_id: string;
          payload?: Json;
          run_id?: string | null;
          status?: string;
        };
        Update: {
          automation_id?: string | null;
          created_at?: string;
          error?: string | null;
          event_name?: string;
          event_source?: string;
          id?: string;
          org_id?: string;
          payload?: Json;
          run_id?: string | null;
          status?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_automation_events_automation_id_fkey";
            columns: ["automation_id"];
            isOneToOne: false;
            referencedRelation: "ao_automations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_automation_events_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_automation_events_run_id_fkey";
            columns: ["run_id"];
            isOneToOne: false;
            referencedRelation: "ao_automation_runs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_automation_runs: {
        Row: {
          automation_id: string;
          credits_used: number;
          dry_run: boolean;
          ended_at: string | null;
          error: string | null;
          id: string;
          narrative: Json;
          org_id: string;
          report_run_meta: Json;
          result_summary: string | null;
          started_at: string;
          status: string;
          trigger_source: string;
          work_item_id: string | null;
        };
        Insert: {
          automation_id: string;
          credits_used?: number;
          dry_run?: boolean;
          ended_at?: string | null;
          error?: string | null;
          id?: string;
          narrative?: Json;
          org_id: string;
          report_run_meta?: Json;
          result_summary?: string | null;
          started_at?: string;
          status?: string;
          trigger_source?: string;
          work_item_id?: string | null;
        };
        Update: {
          automation_id?: string;
          credits_used?: number;
          dry_run?: boolean;
          ended_at?: string | null;
          error?: string | null;
          id?: string;
          narrative?: Json;
          org_id?: string;
          report_run_meta?: Json;
          result_summary?: string | null;
          started_at?: string;
          status?: string;
          trigger_source?: string;
          work_item_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ao_automation_runs_automation_id_fkey";
            columns: ["automation_id"];
            isOneToOne: false;
            referencedRelation: "ao_automations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_automation_runs_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_automation_versions: {
        Row: {
          automation_id: string;
          change_summary: string | null;
          created_at: string;
          created_by: string | null;
          id: string;
          org_id: string;
          snapshot: Json;
          source: string;
          version: number;
        };
        Insert: {
          automation_id: string;
          change_summary?: string | null;
          created_at?: string;
          created_by?: string | null;
          id?: string;
          org_id: string;
          snapshot: Json;
          source?: string;
          version: number;
        };
        Update: {
          automation_id?: string;
          change_summary?: string | null;
          created_at?: string;
          created_by?: string | null;
          id?: string;
          org_id?: string;
          snapshot?: Json;
          source?: string;
          version?: number;
        };
        Relationships: [
          {
            foreignKeyName: "ao_automation_versions_automation_id_fkey";
            columns: ["automation_id"];
            isOneToOne: false;
            referencedRelation: "ao_automations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_automation_versions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_automation_versions_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_automations: {
        Row: {
          agent_id: string | null;
          created_at: string;
          created_by: string | null;
          cron_expression: string;
          description: string | null;
          enabled: boolean;
          graph: Json;
          id: string;
          kind: string | null;
          last_error: string | null;
          last_run_at: string | null;
          legacy_workflow_id: string | null;
          mode: string;
          name: string;
          next_run_at: string | null;
          notify_channel: string;
          notify_config: Json;
          org_id: string;
          outputs: Json;
          project_id: string | null;
          prompt: string;
          report_meta: Json;
          report_pack_id: string | null;
          resolved_prompt_snapshot: string | null;
          template_id: string | null;
          template_version_id: string | null;
          timezone: string;
          trigger: Json;
          updated_at: string;
          version: number;
        };
        Insert: {
          agent_id?: string | null;
          created_at?: string;
          created_by?: string | null;
          cron_expression?: string;
          description?: string | null;
          enabled?: boolean;
          graph?: Json;
          id?: string;
          kind?: string | null;
          last_error?: string | null;
          last_run_at?: string | null;
          legacy_workflow_id?: string | null;
          mode?: string;
          name?: string;
          next_run_at?: string | null;
          notify_channel?: string;
          notify_config?: Json;
          org_id: string;
          outputs?: Json;
          project_id?: string | null;
          prompt: string;
          report_meta?: Json;
          report_pack_id?: string | null;
          resolved_prompt_snapshot?: string | null;
          template_id?: string | null;
          template_version_id?: string | null;
          timezone?: string;
          trigger?: Json;
          updated_at?: string;
          version?: number;
        };
        Update: {
          agent_id?: string | null;
          created_at?: string;
          created_by?: string | null;
          cron_expression?: string;
          description?: string | null;
          enabled?: boolean;
          graph?: Json;
          id?: string;
          kind?: string | null;
          last_error?: string | null;
          last_run_at?: string | null;
          legacy_workflow_id?: string | null;
          mode?: string;
          name?: string;
          next_run_at?: string | null;
          notify_channel?: string;
          notify_config?: Json;
          org_id?: string;
          outputs?: Json;
          project_id?: string | null;
          prompt?: string;
          report_meta?: Json;
          report_pack_id?: string | null;
          resolved_prompt_snapshot?: string | null;
          template_id?: string | null;
          template_version_id?: string | null;
          timezone?: string;
          trigger?: Json;
          updated_at?: string;
          version?: number;
        };
        Relationships: [
          {
            foreignKeyName: "ao_automations_agent_id_fkey";
            columns: ["agent_id"];
            isOneToOne: false;
            referencedRelation: "ao_agents";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_automations_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_automations_legacy_workflow_id_fkey";
            columns: ["legacy_workflow_id"];
            isOneToOne: false;
            referencedRelation: "ao_workflows";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_automations_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_automations_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "ao_intel_projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_automations_report_pack_id_fkey";
            columns: ["report_pack_id"];
            isOneToOne: false;
            referencedRelation: "ao_report_packs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_automations_template_id_fkey";
            columns: ["template_id"];
            isOneToOne: false;
            referencedRelation: "ao_templates";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_automations_template_version_id_fkey";
            columns: ["template_version_id"];
            isOneToOne: false;
            referencedRelation: "ao_template_versions";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_billing_alerts: {
        Row: {
          alert_type: string;
          balance_at_alert: number;
          channel: string;
          created_at: string;
          delivered: boolean;
          delivered_at: string | null;
          id: string;
          idempotency_key: string | null;
          metadata: Json;
          org_id: string;
          threshold_credits: number | null;
        };
        Insert: {
          alert_type: string;
          balance_at_alert: number;
          channel?: string;
          created_at?: string;
          delivered?: boolean;
          delivered_at?: string | null;
          id?: string;
          idempotency_key?: string | null;
          metadata?: Json;
          org_id: string;
          threshold_credits?: number | null;
        };
        Update: {
          alert_type?: string;
          balance_at_alert?: number;
          channel?: string;
          created_at?: string;
          delivered?: boolean;
          delivered_at?: string | null;
          id?: string;
          idempotency_key?: string | null;
          metadata?: Json;
          org_id?: string;
          threshold_credits?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "ao_billing_alerts_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_billing_plans: {
        Row: {
          active: boolean;
          created_at: string;
          cta: string | null;
          daily_credits: number;
          daily_monthly_cap: number | null;
          description: string | null;
          features: Json;
          monthly_credits: number;
          name: string;
          price_cents: number;
          rollover_months: number;
          slug: string;
          sort_order: number;
          stripe_price_id: string | null;
          updated_at: string;
        };
        Insert: {
          active?: boolean;
          created_at?: string;
          cta?: string | null;
          daily_credits?: number;
          daily_monthly_cap?: number | null;
          description?: string | null;
          features?: Json;
          monthly_credits?: number;
          name: string;
          price_cents?: number;
          rollover_months?: number;
          slug: string;
          sort_order?: number;
          stripe_price_id?: string | null;
          updated_at?: string;
        };
        Update: {
          active?: boolean;
          created_at?: string;
          cta?: string | null;
          daily_credits?: number;
          daily_monthly_cap?: number | null;
          description?: string | null;
          features?: Json;
          monthly_credits?: number;
          name?: string;
          price_cents?: number;
          rollover_months?: number;
          slug?: string;
          sort_order?: number;
          stripe_price_id?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      ao_billing_stripe_events: {
        Row: {
          event_type: string;
          processed_at: string;
          stripe_event_id: string;
        };
        Insert: {
          event_type: string;
          processed_at?: string;
          stripe_event_id: string;
        };
        Update: {
          event_type?: string;
          processed_at?: string;
          stripe_event_id?: string;
        };
        Relationships: [];
      };
      ao_billing_subscriptions: {
        Row: {
          cancel_at_period_end: boolean;
          created_at: string;
          current_period_end: string | null;
          current_period_start: string | null;
          id: string;
          org_id: string;
          plan_slug: string;
          recurring_amount_cents: number | null;
          status: string;
          stripe_price_id: string | null;
          stripe_subscription_id: string | null;
          updated_at: string;
        };
        Insert: {
          cancel_at_period_end?: boolean;
          created_at?: string;
          current_period_end?: string | null;
          current_period_start?: string | null;
          id?: string;
          org_id: string;
          plan_slug: string;
          recurring_amount_cents?: number | null;
          status?: string;
          stripe_price_id?: string | null;
          stripe_subscription_id?: string | null;
          updated_at?: string;
        };
        Update: {
          cancel_at_period_end?: boolean;
          created_at?: string;
          current_period_end?: string | null;
          current_period_start?: string | null;
          id?: string;
          org_id?: string;
          plan_slug?: string;
          recurring_amount_cents?: number | null;
          status?: string;
          stripe_price_id?: string | null;
          stripe_subscription_id?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_billing_subscriptions_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_billing_subscriptions_plan_slug_fkey";
            columns: ["plan_slug"];
            isOneToOne: false;
            referencedRelation: "ao_billing_plans";
            referencedColumns: ["slug"];
          },
        ];
      };
      ao_billing_topup_packs: {
        Row: {
          active: boolean;
          created_at: string;
          credits: number;
          id: string;
          label: string;
          price_cents: number;
          sort_order: number;
          stripe_price_id: string | null;
          updated_at: string;
        };
        Insert: {
          active?: boolean;
          created_at?: string;
          credits: number;
          id: string;
          label: string;
          price_cents: number;
          sort_order?: number;
          stripe_price_id?: string | null;
          updated_at?: string;
        };
        Update: {
          active?: boolean;
          created_at?: string;
          credits?: number;
          id?: string;
          label?: string;
          price_cents?: number;
          sort_order?: number;
          stripe_price_id?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      ao_browser_relay_presence: {
        Row: {
          last_seen_at: string;
          org_id: string;
          relay_state: string;
          shared_tab_count: number;
          user_id: string;
        };
        Insert: {
          last_seen_at?: string;
          org_id: string;
          relay_state?: string;
          shared_tab_count?: number;
          user_id: string;
        };
        Update: {
          last_seen_at?: string;
          org_id?: string;
          relay_state?: string;
          shared_tab_count?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_browser_relay_presence_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_browser_relay_presence_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_browser_relay_requests: {
        Row: {
          action: string;
          created_at: string;
          error_message: string | null;
          expires_at: string;
          id: string;
          org_id: string;
          payload: Json;
          result: Json | null;
          status: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          action: string;
          created_at?: string;
          error_message?: string | null;
          expires_at?: string;
          id?: string;
          org_id: string;
          payload?: Json;
          result?: Json | null;
          status?: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          action?: string;
          created_at?: string;
          error_message?: string | null;
          expires_at?: string;
          id?: string;
          org_id?: string;
          payload?: Json;
          result?: Json | null;
          status?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_browser_relay_requests_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_browser_relay_requests_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_browser_runs: {
        Row: {
          anchor_profile_id: string | null;
          control_mode: string;
          created_at: string;
          credits_charged: number;
          current_url: string | null;
          ended_at: string | null;
          error_message: string | null;
          evidence_urls: Json;
          failover_provider: string | null;
          failover_reason: string | null;
          id: string;
          identity_id: string | null;
          live_url: string | null;
          message_id: string | null;
          metadata: Json;
          org_id: string;
          page_domain: string | null;
          page_title: string | null;
          provider: string;
          recording_blob_url: string | null;
          recording_url: string | null;
          session_id: string | null;
          started_at: string | null;
          status: string;
          steps: Json;
          task_description: string | null;
          thread_id: string | null;
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          anchor_profile_id?: string | null;
          control_mode?: string;
          created_at?: string;
          credits_charged?: number;
          current_url?: string | null;
          ended_at?: string | null;
          error_message?: string | null;
          evidence_urls?: Json;
          failover_provider?: string | null;
          failover_reason?: string | null;
          id?: string;
          identity_id?: string | null;
          live_url?: string | null;
          message_id?: string | null;
          metadata?: Json;
          org_id: string;
          page_domain?: string | null;
          page_title?: string | null;
          provider?: string;
          recording_blob_url?: string | null;
          recording_url?: string | null;
          session_id?: string | null;
          started_at?: string | null;
          status?: string;
          steps?: Json;
          task_description?: string | null;
          thread_id?: string | null;
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          anchor_profile_id?: string | null;
          control_mode?: string;
          created_at?: string;
          credits_charged?: number;
          current_url?: string | null;
          ended_at?: string | null;
          error_message?: string | null;
          evidence_urls?: Json;
          failover_provider?: string | null;
          failover_reason?: string | null;
          id?: string;
          identity_id?: string | null;
          live_url?: string | null;
          message_id?: string | null;
          metadata?: Json;
          org_id?: string;
          page_domain?: string | null;
          page_title?: string | null;
          provider?: string;
          recording_blob_url?: string | null;
          recording_url?: string | null;
          session_id?: string | null;
          started_at?: string | null;
          status?: string;
          steps?: Json;
          task_description?: string | null;
          thread_id?: string | null;
          updated_at?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ao_browser_runs_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_browser_runs_thread_id_fkey";
            columns: ["thread_id"];
            isOneToOne: false;
            referencedRelation: "ao_threads";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_browser_runs_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_browser_session_events: {
        Row: {
          browser_run_id: string;
          created_at: string;
          id: string;
          kind: string;
          metadata: Json;
          org_id: string;
          summary: string | null;
          thread_id: string | null;
        };
        Insert: {
          browser_run_id: string;
          created_at?: string;
          id?: string;
          kind: string;
          metadata?: Json;
          org_id: string;
          summary?: string | null;
          thread_id?: string | null;
        };
        Update: {
          browser_run_id?: string;
          created_at?: string;
          id?: string;
          kind?: string;
          metadata?: Json;
          org_id?: string;
          summary?: string | null;
          thread_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ao_browser_session_events_browser_run_id_fkey";
            columns: ["browser_run_id"];
            isOneToOne: false;
            referencedRelation: "ao_browser_runs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_browser_session_events_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_browser_session_events_thread_id_fkey";
            columns: ["thread_id"];
            isOneToOne: false;
            referencedRelation: "ao_threads";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_calendar_constraints: {
        Row: {
          created_at: string;
          ends_at: string;
          external_event_id: string | null;
          id: string;
          is_hard: boolean;
          org_id: string;
          source: Database["public"]["Enums"]["ao_calendar_constraint_source"];
          starts_at: string;
          synced_at: string;
          title: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          ends_at: string;
          external_event_id?: string | null;
          id?: string;
          is_hard?: boolean;
          org_id: string;
          source?: Database["public"]["Enums"]["ao_calendar_constraint_source"];
          starts_at: string;
          synced_at?: string;
          title: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          ends_at?: string;
          external_event_id?: string | null;
          id?: string;
          is_hard?: boolean;
          org_id?: string;
          source?: Database["public"]["Enums"]["ao_calendar_constraint_source"];
          starts_at?: string;
          synced_at?: string;
          title?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_calendar_constraints_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_calendar_constraints_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_capstone_releases: {
        Row: {
          created_at: string;
          doctrine_paths: Json;
          fetched_at: string;
          id: string;
          manifest: Json;
          tag: string;
        };
        Insert: {
          created_at?: string;
          doctrine_paths?: Json;
          fetched_at?: string;
          id?: string;
          manifest?: Json;
          tag: string;
        };
        Update: {
          created_at?: string;
          doctrine_paths?: Json;
          fetched_at?: string;
          id?: string;
          manifest?: Json;
          tag?: string;
        };
        Relationships: [];
      };
      ao_changelog_entries: {
        Row: {
          body_md: string;
          created_at: string;
          id: string;
          metadata: Json;
          period_end: string | null;
          period_start: string | null;
          published_at: string;
          source: string;
          tags: string[];
          title: string;
          version: string | null;
        };
        Insert: {
          body_md?: string;
          created_at?: string;
          id?: string;
          metadata?: Json;
          period_end?: string | null;
          period_start?: string | null;
          published_at?: string;
          source?: string;
          tags?: string[];
          title: string;
          version?: string | null;
        };
        Update: {
          body_md?: string;
          created_at?: string;
          id?: string;
          metadata?: Json;
          period_end?: string | null;
          period_start?: string | null;
          published_at?: string;
          source?: string;
          tags?: string[];
          title?: string;
          version?: string | null;
        };
        Relationships: [];
      };
      ao_channel_configs: {
        Row: {
          channel: string;
          config: Json;
          created_at: string;
          created_by: string | null;
          enabled: boolean;
          id: string;
          org_id: string;
          updated_at: string;
        };
        Insert: {
          channel: string;
          config?: Json;
          created_at?: string;
          created_by?: string | null;
          enabled?: boolean;
          id?: string;
          org_id: string;
          updated_at?: string;
        };
        Update: {
          channel?: string;
          config?: Json;
          created_at?: string;
          created_by?: string | null;
          enabled?: boolean;
          id?: string;
          org_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_channel_configs_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_channel_configs_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_chat_folders: {
        Row: {
          color: string | null;
          created_at: string;
          created_by: string;
          id: string;
          name: string;
          org_id: string;
          position: number;
          updated_at: string;
        };
        Insert: {
          color?: string | null;
          created_at?: string;
          created_by: string;
          id?: string;
          name: string;
          org_id: string;
          position?: number;
          updated_at?: string;
        };
        Update: {
          color?: string | null;
          created_at?: string;
          created_by?: string;
          id?: string;
          name?: string;
          org_id?: string;
          position?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_chat_folders_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_chat_stream_chunks: {
        Row: {
          chunk: string;
          created_at: string;
          id: number;
          seq: number;
          thread_id: string;
        };
        Insert: {
          chunk: string;
          created_at?: string;
          id?: never;
          seq: number;
          thread_id: string;
        };
        Update: {
          chunk?: string;
          created_at?: string;
          id?: never;
          seq?: number;
          thread_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_chat_stream_chunks_thread_id_fkey";
            columns: ["thread_id"];
            isOneToOne: false;
            referencedRelation: "ao_threads";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_chat_stream_sessions: {
        Row: {
          expires_at: string;
          instance_id: string | null;
          org_id: string;
          run_id: string | null;
          started_at: string;
          thread_id: string;
          updated_at: string;
        };
        Insert: {
          expires_at: string;
          instance_id?: string | null;
          org_id: string;
          run_id?: string | null;
          started_at?: string;
          thread_id: string;
          updated_at?: string;
        };
        Update: {
          expires_at?: string;
          instance_id?: string | null;
          org_id?: string;
          run_id?: string | null;
          started_at?: string;
          thread_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_chat_stream_sessions_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_chat_stream_sessions_run_id_fkey";
            columns: ["run_id"];
            isOneToOne: false;
            referencedRelation: "ao_agent_runs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_chat_stream_sessions_thread_id_fkey";
            columns: ["thread_id"];
            isOneToOne: true;
            referencedRelation: "ao_threads";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_composio_triggers: {
        Row: {
          composio_instance_id: string | null;
          config: Json;
          connected_account_id: string;
          created_at: string;
          created_by: string | null;
          enabled: boolean;
          id: string;
          org_id: string;
          toolkit_slug: string;
          trigger_name: string | null;
          trigger_slug: string;
          updated_at: string;
        };
        Insert: {
          composio_instance_id?: string | null;
          config?: Json;
          connected_account_id: string;
          created_at?: string;
          created_by?: string | null;
          enabled?: boolean;
          id?: string;
          org_id: string;
          toolkit_slug: string;
          trigger_name?: string | null;
          trigger_slug: string;
          updated_at?: string;
        };
        Update: {
          composio_instance_id?: string | null;
          config?: Json;
          connected_account_id?: string;
          created_at?: string;
          created_by?: string | null;
          enabled?: boolean;
          id?: string;
          org_id?: string;
          toolkit_slug?: string;
          trigger_name?: string | null;
          trigger_slug?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_composio_triggers_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_composio_triggers_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_connection_packs: {
        Row: {
          created_at: string;
          created_by: string;
          description: string | null;
          id: string;
          integration_ids: string[];
          name: string;
          org_id: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          created_by: string;
          description?: string | null;
          id?: string;
          integration_ids?: string[];
          name: string;
          org_id: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          created_by?: string;
          description?: string | null;
          id?: string;
          integration_ids?: string[];
          name?: string;
          org_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_connection_packs_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_connection_packs_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_constraints: {
        Row: {
          created_at: string;
          created_by: string | null;
          description: string | null;
          evidence_refs: Json;
          id: string;
          insight_id: string | null;
          kind: Database["public"]["Enums"]["ao_constraint_kind"];
          metadata: Json;
          objective_id: string | null;
          org_id: string;
          owner_user_id: string | null;
          performance_gap: string | null;
          retired_reason: string | null;
          severity: string;
          source: Database["public"]["Enums"]["ao_constraint_source"];
          status: Database["public"]["Enums"]["ao_constraint_status"];
          superseded_by: string | null;
          title: string;
          updated_at: string;
          validated_at: string | null;
          validated_by: string | null;
          validation_state: string;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          evidence_refs?: Json;
          id?: string;
          insight_id?: string | null;
          kind?: Database["public"]["Enums"]["ao_constraint_kind"];
          metadata?: Json;
          objective_id?: string | null;
          org_id: string;
          owner_user_id?: string | null;
          performance_gap?: string | null;
          retired_reason?: string | null;
          severity?: string;
          source?: Database["public"]["Enums"]["ao_constraint_source"];
          status?: Database["public"]["Enums"]["ao_constraint_status"];
          superseded_by?: string | null;
          title: string;
          updated_at?: string;
          validated_at?: string | null;
          validated_by?: string | null;
          validation_state?: string;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          evidence_refs?: Json;
          id?: string;
          insight_id?: string | null;
          kind?: Database["public"]["Enums"]["ao_constraint_kind"];
          metadata?: Json;
          objective_id?: string | null;
          org_id?: string;
          owner_user_id?: string | null;
          performance_gap?: string | null;
          retired_reason?: string | null;
          severity?: string;
          source?: Database["public"]["Enums"]["ao_constraint_source"];
          status?: Database["public"]["Enums"]["ao_constraint_status"];
          superseded_by?: string | null;
          title?: string;
          updated_at?: string;
          validated_at?: string | null;
          validated_by?: string | null;
          validation_state?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_constraints_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_constraints_insight_id_fkey";
            columns: ["insight_id"];
            isOneToOne: false;
            referencedRelation: "ao_insights";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_constraints_objective_id_fkey";
            columns: ["objective_id"];
            isOneToOne: false;
            referencedRelation: "ao_objectives";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_constraints_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_constraints_owner_user_id_fkey";
            columns: ["owner_user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_constraints_superseded_by_fkey";
            columns: ["superseded_by"];
            isOneToOne: false;
            referencedRelation: "ao_constraints";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_counter_definitions: {
        Row: {
          created_at: string;
          creator_user_id: string | null;
          description: string | null;
          id: string;
          key: string;
          leaderboard_eligible: boolean;
          metadata: Json;
          name: string;
          org_id: string | null;
          owner_id: string | null;
          owner_kind: string;
          playbook_id: string | null;
          playbook_version_id: string | null;
          reset_period: string | null;
          scope_kind: string;
          source_event: string | null;
          updated_at: string;
          visibility: string;
        };
        Insert: {
          created_at?: string;
          creator_user_id?: string | null;
          description?: string | null;
          id?: string;
          key: string;
          leaderboard_eligible?: boolean;
          metadata?: Json;
          name: string;
          org_id?: string | null;
          owner_id?: string | null;
          owner_kind: string;
          playbook_id?: string | null;
          playbook_version_id?: string | null;
          reset_period?: string | null;
          scope_kind: string;
          source_event?: string | null;
          updated_at?: string;
          visibility?: string;
        };
        Update: {
          created_at?: string;
          creator_user_id?: string | null;
          description?: string | null;
          id?: string;
          key?: string;
          leaderboard_eligible?: boolean;
          metadata?: Json;
          name?: string;
          org_id?: string | null;
          owner_id?: string | null;
          owner_kind?: string;
          playbook_id?: string | null;
          playbook_version_id?: string | null;
          reset_period?: string | null;
          scope_kind?: string;
          source_event?: string | null;
          updated_at?: string;
          visibility?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_counter_definitions_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_counter_definitions_playbook_id_fkey";
            columns: ["playbook_id"];
            isOneToOne: false;
            referencedRelation: "ao_playbooks";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_counter_events: {
        Row: {
          actor_id: string | null;
          counter_definition_id: string;
          created_at: string;
          delta: number;
          id: string;
          idempotency_key: string;
          metadata: Json;
          org_id: string;
          period_key: string;
          source_id: string | null;
          source_type: string | null;
          subject_id: string;
          subject_kind: string;
          value_after: number;
        };
        Insert: {
          actor_id?: string | null;
          counter_definition_id: string;
          created_at?: string;
          delta: number;
          id?: string;
          idempotency_key: string;
          metadata?: Json;
          org_id: string;
          period_key?: string;
          source_id?: string | null;
          source_type?: string | null;
          subject_id: string;
          subject_kind: string;
          value_after: number;
        };
        Update: {
          actor_id?: string | null;
          counter_definition_id?: string;
          created_at?: string;
          delta?: number;
          id?: string;
          idempotency_key?: string;
          metadata?: Json;
          org_id?: string;
          period_key?: string;
          source_id?: string | null;
          source_type?: string | null;
          subject_id?: string;
          subject_kind?: string;
          value_after?: number;
        };
        Relationships: [
          {
            foreignKeyName: "ao_counter_events_counter_definition_id_fkey";
            columns: ["counter_definition_id"];
            isOneToOne: false;
            referencedRelation: "ao_counter_definitions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_counter_events_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_counter_values: {
        Row: {
          counter_definition_id: string;
          id: string;
          org_id: string;
          period_key: string;
          subject_id: string;
          subject_kind: string;
          updated_at: string;
          value: number;
        };
        Insert: {
          counter_definition_id: string;
          id?: string;
          org_id: string;
          period_key?: string;
          subject_id: string;
          subject_kind: string;
          updated_at?: string;
          value?: number;
        };
        Update: {
          counter_definition_id?: string;
          id?: string;
          org_id?: string;
          period_key?: string;
          subject_id?: string;
          subject_kind?: string;
          updated_at?: string;
          value?: number;
        };
        Relationships: [
          {
            foreignKeyName: "ao_counter_values_counter_definition_id_fkey";
            columns: ["counter_definition_id"];
            isOneToOne: false;
            referencedRelation: "ao_counter_definitions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_counter_values_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_credit_grants: {
        Row: {
          amount: number;
          bucket: Database["public"]["Enums"]["ao_credit_bucket"];
          created_at: string;
          expires_at: string | null;
          grant_day: string | null;
          id: string;
          idempotency_key: string | null;
          note: string | null;
          org_id: string;
          remaining: number;
        };
        Insert: {
          amount: number;
          bucket: Database["public"]["Enums"]["ao_credit_bucket"];
          created_at?: string;
          expires_at?: string | null;
          grant_day?: string | null;
          id?: string;
          idempotency_key?: string | null;
          note?: string | null;
          org_id: string;
          remaining: number;
        };
        Update: {
          amount?: number;
          bucket?: Database["public"]["Enums"]["ao_credit_bucket"];
          created_at?: string;
          expires_at?: string | null;
          grant_day?: string | null;
          id?: string;
          idempotency_key?: string | null;
          note?: string | null;
          org_id?: string;
          remaining?: number;
        };
        Relationships: [
          {
            foreignKeyName: "ao_credit_grants_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_credit_ledger: {
        Row: {
          action_type: string | null;
          actor_agent_id: string | null;
          actor_user_id: string | null;
          balance_after: number | null;
          balance_before: number | null;
          created_at: string;
          delta: number;
          external_txn_id: string | null;
          grant_id: string | null;
          id: string;
          idempotency_key: string | null;
          metadata: Json;
          model: string | null;
          note: string | null;
          org_id: string;
          provider: string | null;
          reason: Database["public"]["Enums"]["ao_ledger_reason"];
          ref_id: string | null;
          resource_type: string | null;
          source_app: string | null;
          usage_event_id: string | null;
        };
        Insert: {
          action_type?: string | null;
          actor_agent_id?: string | null;
          actor_user_id?: string | null;
          balance_after?: number | null;
          balance_before?: number | null;
          created_at?: string;
          delta: number;
          external_txn_id?: string | null;
          grant_id?: string | null;
          id?: string;
          idempotency_key?: string | null;
          metadata?: Json;
          model?: string | null;
          note?: string | null;
          org_id: string;
          provider?: string | null;
          reason: Database["public"]["Enums"]["ao_ledger_reason"];
          ref_id?: string | null;
          resource_type?: string | null;
          source_app?: string | null;
          usage_event_id?: string | null;
        };
        Update: {
          action_type?: string | null;
          actor_agent_id?: string | null;
          actor_user_id?: string | null;
          balance_after?: number | null;
          balance_before?: number | null;
          created_at?: string;
          delta?: number;
          external_txn_id?: string | null;
          grant_id?: string | null;
          id?: string;
          idempotency_key?: string | null;
          metadata?: Json;
          model?: string | null;
          note?: string | null;
          org_id?: string;
          provider?: string | null;
          reason?: Database["public"]["Enums"]["ao_ledger_reason"];
          ref_id?: string | null;
          resource_type?: string | null;
          source_app?: string | null;
          usage_event_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ao_credit_ledger_grant_id_fkey";
            columns: ["grant_id"];
            isOneToOne: false;
            referencedRelation: "ao_credit_grants";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_credit_ledger_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_credit_ledger_usage_event_id_fkey";
            columns: ["usage_event_id"];
            isOneToOne: false;
            referencedRelation: "ao_usage_events";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_credit_reservations: {
        Row: {
          amount_credits: number;
          correlation_id: string | null;
          created_at: string;
          execution_id: string | null;
          expires_at: string;
          finalized_at: string | null;
          finalized_credits: number;
          id: string;
          idempotency_key: string | null;
          metadata: Json;
          org_id: string;
          reason: string | null;
          released_at: string | null;
          status: Database["public"]["Enums"]["ao_reservation_status"];
          updated_at: string;
          usage_event_id: string | null;
          user_id: string | null;
        };
        Insert: {
          amount_credits: number;
          correlation_id?: string | null;
          created_at?: string;
          execution_id?: string | null;
          expires_at: string;
          finalized_at?: string | null;
          finalized_credits?: number;
          id?: string;
          idempotency_key?: string | null;
          metadata?: Json;
          org_id: string;
          reason?: string | null;
          released_at?: string | null;
          status?: Database["public"]["Enums"]["ao_reservation_status"];
          updated_at?: string;
          usage_event_id?: string | null;
          user_id?: string | null;
        };
        Update: {
          amount_credits?: number;
          correlation_id?: string | null;
          created_at?: string;
          execution_id?: string | null;
          expires_at?: string;
          finalized_at?: string | null;
          finalized_credits?: number;
          id?: string;
          idempotency_key?: string | null;
          metadata?: Json;
          org_id?: string;
          reason?: string | null;
          released_at?: string | null;
          status?: Database["public"]["Enums"]["ao_reservation_status"];
          updated_at?: string;
          usage_event_id?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ao_credit_reservations_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_credit_reservations_usage_event_id_fkey";
            columns: ["usage_event_id"];
            isOneToOne: false;
            referencedRelation: "ao_usage_events";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_day_plan_events: {
        Row: {
          actor_kind: string;
          actor_user_id: string | null;
          created_at: string;
          day_plan_id: string;
          event_type: string;
          id: string;
          org_id: string;
          payload: Json;
          summary: string;
        };
        Insert: {
          actor_kind?: string;
          actor_user_id?: string | null;
          created_at?: string;
          day_plan_id: string;
          event_type: string;
          id?: string;
          org_id: string;
          payload?: Json;
          summary: string;
        };
        Update: {
          actor_kind?: string;
          actor_user_id?: string | null;
          created_at?: string;
          day_plan_id?: string;
          event_type?: string;
          id?: string;
          org_id?: string;
          payload?: Json;
          summary?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_day_plan_events_actor_user_id_fkey";
            columns: ["actor_user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_day_plan_events_day_plan_id_fkey";
            columns: ["day_plan_id"];
            isOneToOne: false;
            referencedRelation: "ao_day_plans";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_day_plan_events_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_day_plans: {
        Row: {
          committed_at: string | null;
          created_at: string;
          created_by: string | null;
          id: string;
          org_id: string;
          owner_agent_id: string | null;
          owner_automation_id: string | null;
          owner_kind: Database["public"]["Enums"]["ao_time_executor_kind"];
          owner_team_id: string | null;
          owner_user_id: string | null;
          owner_workflow_id: string | null;
          plan_date: string;
          playbook_run_id: string | null;
          score_snapshot: Json | null;
          source: Database["public"]["Enums"]["ao_day_plan_source"];
          status: Database["public"]["Enums"]["ao_day_plan_status"];
          summary: string | null;
          superseded_by: string | null;
          updated_at: string;
        };
        Insert: {
          committed_at?: string | null;
          created_at?: string;
          created_by?: string | null;
          id?: string;
          org_id: string;
          owner_agent_id?: string | null;
          owner_automation_id?: string | null;
          owner_kind?: Database["public"]["Enums"]["ao_time_executor_kind"];
          owner_team_id?: string | null;
          owner_user_id?: string | null;
          owner_workflow_id?: string | null;
          plan_date: string;
          playbook_run_id?: string | null;
          score_snapshot?: Json | null;
          source?: Database["public"]["Enums"]["ao_day_plan_source"];
          status?: Database["public"]["Enums"]["ao_day_plan_status"];
          summary?: string | null;
          superseded_by?: string | null;
          updated_at?: string;
        };
        Update: {
          committed_at?: string | null;
          created_at?: string;
          created_by?: string | null;
          id?: string;
          org_id?: string;
          owner_agent_id?: string | null;
          owner_automation_id?: string | null;
          owner_kind?: Database["public"]["Enums"]["ao_time_executor_kind"];
          owner_team_id?: string | null;
          owner_user_id?: string | null;
          owner_workflow_id?: string | null;
          plan_date?: string;
          playbook_run_id?: string | null;
          score_snapshot?: Json | null;
          source?: Database["public"]["Enums"]["ao_day_plan_source"];
          status?: Database["public"]["Enums"]["ao_day_plan_status"];
          summary?: string | null;
          superseded_by?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_day_plans_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_day_plans_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_day_plans_owner_user_id_fkey";
            columns: ["owner_user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_day_plans_playbook_run_id_fkey";
            columns: ["playbook_run_id"];
            isOneToOne: false;
            referencedRelation: "ao_playbook_runs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_day_plans_superseded_by_fkey";
            columns: ["superseded_by"];
            isOneToOne: false;
            referencedRelation: "ao_day_plans";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_ecosystem_launch_tokens: {
        Row: {
          access_token: string;
          app_id: string;
          consumed_at: string | null;
          created_at: string;
          expires_at: string;
          id: string;
          org_id: string;
          refresh_token: string | null;
          token_hash: string;
          user_id: string;
        };
        Insert: {
          access_token: string;
          app_id: string;
          consumed_at?: string | null;
          created_at?: string;
          expires_at: string;
          id?: string;
          org_id: string;
          refresh_token?: string | null;
          token_hash: string;
          user_id: string;
        };
        Update: {
          access_token?: string;
          app_id?: string;
          consumed_at?: string | null;
          created_at?: string;
          expires_at?: string;
          id?: string;
          org_id?: string;
          refresh_token?: string | null;
          token_hash?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_ecosystem_launch_tokens_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_entities: {
        Row: {
          agent_id: string | null;
          archived_at: string | null;
          attrs: Json;
          created_at: string;
          embedding: string | null;
          entity_type: string;
          external_id: string | null;
          id: string;
          last_seen_at: string;
          org_id: string;
          pinned_at: string | null;
          project_id: string | null;
          retrieval_count: number;
          source: string;
          title: string;
          token_vector: Json;
          updated_at: string;
          user_id: string | null;
          valid_from: string;
          valid_until: string | null;
        };
        Insert: {
          agent_id?: string | null;
          archived_at?: string | null;
          attrs?: Json;
          created_at?: string;
          embedding?: string | null;
          entity_type: string;
          external_id?: string | null;
          id?: string;
          last_seen_at?: string;
          org_id: string;
          pinned_at?: string | null;
          project_id?: string | null;
          retrieval_count?: number;
          source: string;
          title: string;
          token_vector?: Json;
          updated_at?: string;
          user_id?: string | null;
          valid_from?: string;
          valid_until?: string | null;
        };
        Update: {
          agent_id?: string | null;
          archived_at?: string | null;
          attrs?: Json;
          created_at?: string;
          embedding?: string | null;
          entity_type?: string;
          external_id?: string | null;
          id?: string;
          last_seen_at?: string;
          org_id?: string;
          pinned_at?: string | null;
          project_id?: string | null;
          retrieval_count?: number;
          source?: string;
          title?: string;
          token_vector?: Json;
          updated_at?: string;
          user_id?: string | null;
          valid_from?: string;
          valid_until?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ao_entities_agent_id_fkey";
            columns: ["agent_id"];
            isOneToOne: false;
            referencedRelation: "ao_agents";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_entities_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_entities_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "ao_intel_projects";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_entity_edges: {
        Row: {
          created_at: string;
          from_entity_id: string;
          id: string;
          org_id: string;
          relation: string;
          to_entity_id: string;
          weight: number;
        };
        Insert: {
          created_at?: string;
          from_entity_id: string;
          id?: string;
          org_id: string;
          relation?: string;
          to_entity_id: string;
          weight?: number;
        };
        Update: {
          created_at?: string;
          from_entity_id?: string;
          id?: string;
          org_id?: string;
          relation?: string;
          to_entity_id?: string;
          weight?: number;
        };
        Relationships: [
          {
            foreignKeyName: "ao_entity_edges_from_entity_id_fkey";
            columns: ["from_entity_id"];
            isOneToOne: false;
            referencedRelation: "ao_entities";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_entity_edges_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_entity_edges_to_entity_id_fkey";
            columns: ["to_entity_id"];
            isOneToOne: false;
            referencedRelation: "ao_entities";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_feature_requests: {
        Row: {
          author_display_name: string | null;
          author_user_id: string | null;
          board_id: string;
          created_at: string;
          description: string;
          id: string;
          status: string;
          title: string;
          updated_at: string;
          vote_count: number;
        };
        Insert: {
          author_display_name?: string | null;
          author_user_id?: string | null;
          board_id: string;
          created_at?: string;
          description?: string;
          id?: string;
          status?: string;
          title: string;
          updated_at?: string;
          vote_count?: number;
        };
        Update: {
          author_display_name?: string | null;
          author_user_id?: string | null;
          board_id?: string;
          created_at?: string;
          description?: string;
          id?: string;
          status?: string;
          title?: string;
          updated_at?: string;
          vote_count?: number;
        };
        Relationships: [
          {
            foreignKeyName: "ao_feature_requests_author_user_id_fkey";
            columns: ["author_user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_feature_requests_board_id_fkey";
            columns: ["board_id"];
            isOneToOne: false;
            referencedRelation: "ao_roadmap_boards";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_feature_votes: {
        Row: {
          created_at: string;
          request_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          request_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          request_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_feature_votes_request_id_fkey";
            columns: ["request_id"];
            isOneToOne: false;
            referencedRelation: "ao_feature_requests";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_feature_votes_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_flag_definitions: {
        Row: {
          config: Json;
          counter_definition_id: string | null;
          created_at: string;
          description: string | null;
          flag_type: string;
          id: string;
          key: string;
          name: string;
          org_id: string | null;
          playbook_id: string | null;
          playbook_version_id: string | null;
          sort_order: number;
          threshold: number | null;
        };
        Insert: {
          config?: Json;
          counter_definition_id?: string | null;
          created_at?: string;
          description?: string | null;
          flag_type?: string;
          id?: string;
          key: string;
          name: string;
          org_id?: string | null;
          playbook_id?: string | null;
          playbook_version_id?: string | null;
          sort_order?: number;
          threshold?: number | null;
        };
        Update: {
          config?: Json;
          counter_definition_id?: string | null;
          created_at?: string;
          description?: string | null;
          flag_type?: string;
          id?: string;
          key?: string;
          name?: string;
          org_id?: string | null;
          playbook_id?: string | null;
          playbook_version_id?: string | null;
          sort_order?: number;
          threshold?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "ao_flag_definitions_counter_definition_id_fkey";
            columns: ["counter_definition_id"];
            isOneToOne: false;
            referencedRelation: "ao_counter_definitions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_flag_definitions_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_flag_definitions_playbook_id_fkey";
            columns: ["playbook_id"];
            isOneToOne: false;
            referencedRelation: "ao_playbooks";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_flag_instances: {
        Row: {
          acknowledged_at: string | null;
          counter_value_at_raise: number | null;
          created_at: string;
          flag_definition_id: string;
          id: string;
          idempotency_key: string;
          inbox_item_id: string | null;
          metadata: Json;
          org_id: string;
          status: string;
          subject_id: string;
          subject_kind: string;
        };
        Insert: {
          acknowledged_at?: string | null;
          counter_value_at_raise?: number | null;
          created_at?: string;
          flag_definition_id: string;
          id?: string;
          idempotency_key: string;
          inbox_item_id?: string | null;
          metadata?: Json;
          org_id: string;
          status?: string;
          subject_id: string;
          subject_kind: string;
        };
        Update: {
          acknowledged_at?: string | null;
          counter_value_at_raise?: number | null;
          created_at?: string;
          flag_definition_id?: string;
          id?: string;
          idempotency_key?: string;
          inbox_item_id?: string | null;
          metadata?: Json;
          org_id?: string;
          status?: string;
          subject_id?: string;
          subject_kind?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_flag_instances_flag_definition_id_fkey";
            columns: ["flag_definition_id"];
            isOneToOne: false;
            referencedRelation: "ao_flag_definitions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_flag_instances_inbox_item_id_fkey";
            columns: ["inbox_item_id"];
            isOneToOne: false;
            referencedRelation: "ao_inbox_items";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_flag_instances_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_github_code_index_chunks: {
        Row: {
          branch: string;
          built_at: string;
          end_line: number;
          file: string;
          head_sha: string | null;
          id: string;
          org_id: string;
          repo_full_name: string;
          search_text: string | null;
          snippet: string;
          start_line: number;
          thread_id: string;
          token_vector: Json;
        };
        Insert: {
          branch?: string;
          built_at?: string;
          end_line: number;
          file: string;
          head_sha?: string | null;
          id?: string;
          org_id: string;
          repo_full_name: string;
          search_text?: string | null;
          snippet: string;
          start_line: number;
          thread_id: string;
          token_vector?: Json;
        };
        Update: {
          branch?: string;
          built_at?: string;
          end_line?: number;
          file?: string;
          head_sha?: string | null;
          id?: string;
          org_id?: string;
          repo_full_name?: string;
          search_text?: string | null;
          snippet?: string;
          start_line?: number;
          thread_id?: string;
          token_vector?: Json;
        };
        Relationships: [
          {
            foreignKeyName: "ao_github_code_index_chunks_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_github_code_index_chunks_thread_id_fkey";
            columns: ["thread_id"];
            isOneToOne: false;
            referencedRelation: "ao_threads";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_github_links: {
        Row: {
          artifact_id: string | null;
          auto_push: boolean;
          created_at: string;
          created_by: string | null;
          default_branch: string;
          feature_branch: string | null;
          github_webhook_id: number | null;
          id: string;
          integration_id: string;
          last_synced_sha: string | null;
          org_id: string;
          pending_pull_number: number | null;
          publish_mode: string;
          repo_full_name: string;
          root_path: string;
          space_id: string | null;
          sync_mode: string;
          updated_at: string;
          webhook_secret: string | null;
        };
        Insert: {
          artifact_id?: string | null;
          auto_push?: boolean;
          created_at?: string;
          created_by?: string | null;
          default_branch?: string;
          feature_branch?: string | null;
          github_webhook_id?: number | null;
          id?: string;
          integration_id: string;
          last_synced_sha?: string | null;
          org_id: string;
          pending_pull_number?: number | null;
          publish_mode?: string;
          repo_full_name: string;
          root_path?: string;
          space_id?: string | null;
          sync_mode?: string;
          updated_at?: string;
          webhook_secret?: string | null;
        };
        Update: {
          artifact_id?: string | null;
          auto_push?: boolean;
          created_at?: string;
          created_by?: string | null;
          default_branch?: string;
          feature_branch?: string | null;
          github_webhook_id?: number | null;
          id?: string;
          integration_id?: string;
          last_synced_sha?: string | null;
          org_id?: string;
          pending_pull_number?: number | null;
          publish_mode?: string;
          repo_full_name?: string;
          root_path?: string;
          space_id?: string | null;
          sync_mode?: string;
          updated_at?: string;
          webhook_secret?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ao_github_links_artifact_id_fkey";
            columns: ["artifact_id"];
            isOneToOne: false;
            referencedRelation: "ao_artifacts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_github_links_integration_id_fkey";
            columns: ["integration_id"];
            isOneToOne: false;
            referencedRelation: "ao_integrations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_github_links_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_github_links_space_id_fkey";
            columns: ["space_id"];
            isOneToOne: false;
            referencedRelation: "ao_spaces";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_github_sandbox_jobs: {
        Row: {
          agent_run_id: string | null;
          child_run_id: string | null;
          created_at: string;
          error: string | null;
          id: string;
          org_id: string;
          payload: Json;
          queue_message_id: string | null;
          result: Json | null;
          status: string;
          thread_id: string | null;
          tool_name: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          agent_run_id?: string | null;
          child_run_id?: string | null;
          created_at?: string;
          error?: string | null;
          id?: string;
          org_id: string;
          payload?: Json;
          queue_message_id?: string | null;
          result?: Json | null;
          status?: string;
          thread_id?: string | null;
          tool_name: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          agent_run_id?: string | null;
          child_run_id?: string | null;
          created_at?: string;
          error?: string | null;
          id?: string;
          org_id?: string;
          payload?: Json;
          queue_message_id?: string | null;
          result?: Json | null;
          status?: string;
          thread_id?: string | null;
          tool_name?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_github_sandbox_jobs_agent_run_id_fkey";
            columns: ["agent_run_id"];
            isOneToOne: false;
            referencedRelation: "ao_agent_runs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_github_sandbox_jobs_child_run_id_fkey";
            columns: ["child_run_id"];
            isOneToOne: false;
            referencedRelation: "ao_agent_runs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_github_sandbox_jobs_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_github_sandbox_jobs_thread_id_fkey";
            columns: ["thread_id"];
            isOneToOne: false;
            referencedRelation: "ao_threads";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_github_sandbox_jobs_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_github_workspaces: {
        Row: {
          branch: string;
          created_at: string;
          head_sha: string | null;
          id: string;
          integration_id: string;
          org_id: string;
          repo_full_name: string;
          thread_id: string;
          updated_at: string;
          workspace_path: string;
        };
        Insert: {
          branch?: string;
          created_at?: string;
          head_sha?: string | null;
          id?: string;
          integration_id: string;
          org_id: string;
          repo_full_name: string;
          thread_id: string;
          updated_at?: string;
          workspace_path: string;
        };
        Update: {
          branch?: string;
          created_at?: string;
          head_sha?: string | null;
          id?: string;
          integration_id?: string;
          org_id?: string;
          repo_full_name?: string;
          thread_id?: string;
          updated_at?: string;
          workspace_path?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_github_workspaces_integration_id_fkey";
            columns: ["integration_id"];
            isOneToOne: false;
            referencedRelation: "ao_integrations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_github_workspaces_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_github_workspaces_thread_id_fkey";
            columns: ["thread_id"];
            isOneToOne: false;
            referencedRelation: "ao_threads";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_guest_prompt_usage: {
        Row: {
          claimed_at: string | null;
          created_at: string;
          expires_at: string;
          ip_hash: string | null;
          last_active_at: string;
          prompts_used: number;
          user_id: string;
        };
        Insert: {
          claimed_at?: string | null;
          created_at?: string;
          expires_at?: string;
          ip_hash?: string | null;
          last_active_at?: string;
          prompts_used?: number;
          user_id: string;
        };
        Update: {
          claimed_at?: string | null;
          created_at?: string;
          expires_at?: string;
          ip_hash?: string | null;
          last_active_at?: string;
          prompts_used?: number;
          user_id?: string;
        };
        Relationships: [];
      };
      ao_identity_profiles: {
        Row: {
          approved_at: string | null;
          approved_by: string | null;
          core_statement: string | null;
          created_at: string;
          created_by: string | null;
          id: string;
          metadata: Json;
          mission: string | null;
          org_id: string;
          preferences: Json;
          purpose: string | null;
          status: string;
          updated_at: string;
          values: Json;
        };
        Insert: {
          approved_at?: string | null;
          approved_by?: string | null;
          core_statement?: string | null;
          created_at?: string;
          created_by?: string | null;
          id?: string;
          metadata?: Json;
          mission?: string | null;
          org_id: string;
          preferences?: Json;
          purpose?: string | null;
          status?: string;
          updated_at?: string;
          values?: Json;
        };
        Update: {
          approved_at?: string | null;
          approved_by?: string | null;
          core_statement?: string | null;
          created_at?: string;
          created_by?: string | null;
          id?: string;
          metadata?: Json;
          mission?: string | null;
          org_id?: string;
          preferences?: Json;
          purpose?: string | null;
          status?: string;
          updated_at?: string;
          values?: Json;
        };
        Relationships: [
          {
            foreignKeyName: "ao_identity_profiles_approved_by_fkey";
            columns: ["approved_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_identity_profiles_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_identity_profiles_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: true;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_identity_proposals: {
        Row: {
          created_at: string;
          domain: string;
          id: string;
          inbox_item_id: string | null;
          org_id: string;
          proposed_by: string | null;
          proposed_patch: Json;
          reviewed_at: string | null;
          reviewed_by: string | null;
          status: Database["public"]["Enums"]["ao_identity_proposal_status"];
          summary: string | null;
          target_id: string | null;
        };
        Insert: {
          created_at?: string;
          domain: string;
          id?: string;
          inbox_item_id?: string | null;
          org_id: string;
          proposed_by?: string | null;
          proposed_patch?: Json;
          reviewed_at?: string | null;
          reviewed_by?: string | null;
          status?: Database["public"]["Enums"]["ao_identity_proposal_status"];
          summary?: string | null;
          target_id?: string | null;
        };
        Update: {
          created_at?: string;
          domain?: string;
          id?: string;
          inbox_item_id?: string | null;
          org_id?: string;
          proposed_by?: string | null;
          proposed_patch?: Json;
          reviewed_at?: string | null;
          reviewed_by?: string | null;
          status?: Database["public"]["Enums"]["ao_identity_proposal_status"];
          summary?: string | null;
          target_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ao_identity_proposals_inbox_item_id_fkey";
            columns: ["inbox_item_id"];
            isOneToOne: false;
            referencedRelation: "ao_inbox_items";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_identity_proposals_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_identity_proposals_proposed_by_fkey";
            columns: ["proposed_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_identity_proposals_reviewed_by_fkey";
            columns: ["reviewed_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_identity_roles: {
        Row: {
          created_at: string;
          created_by: string | null;
          description: string | null;
          duties: Json;
          id: string;
          is_primary: boolean;
          name: string;
          org_id: string;
          purpose: string | null;
          sort_order: number;
          status: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          duties?: Json;
          id?: string;
          is_primary?: boolean;
          name: string;
          org_id: string;
          purpose?: string | null;
          sort_order?: number;
          status?: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          duties?: Json;
          id?: string;
          is_primary?: boolean;
          name?: string;
          org_id?: string;
          purpose?: string | null;
          sort_order?: number;
          status?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_identity_roles_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_identity_roles_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_inbox_events: {
        Row: {
          actor_id: string | null;
          created_at: string;
          event_type: string;
          id: string;
          inbox_item_id: string;
          message: string | null;
          metadata: Json;
          org_id: string;
        };
        Insert: {
          actor_id?: string | null;
          created_at?: string;
          event_type: string;
          id?: string;
          inbox_item_id: string;
          message?: string | null;
          metadata?: Json;
          org_id: string;
        };
        Update: {
          actor_id?: string | null;
          created_at?: string;
          event_type?: string;
          id?: string;
          inbox_item_id?: string;
          message?: string | null;
          metadata?: Json;
          org_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_inbox_events_actor_id_fkey";
            columns: ["actor_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_inbox_events_inbox_item_id_fkey";
            columns: ["inbox_item_id"];
            isOneToOne: false;
            referencedRelation: "ao_inbox_items";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_inbox_events_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_inbox_items: {
        Row: {
          agent_id: string | null;
          agent_name: string;
          approval_id: string | null;
          assigned_to: string | null;
          automation_id: string | null;
          context: Json;
          created_at: string;
          decided_at: string | null;
          decided_by: string | null;
          decision_note: string | null;
          department: string | null;
          error_message: string | null;
          follow_up_at: string | null;
          human_response: string | null;
          id: string;
          is_read: boolean;
          lane: Database["public"]["Enums"]["ao_inbox_lane"];
          org_id: string;
          parent_item_id: string | null;
          person_ref: string | null;
          pinned: boolean;
          priority: Database["public"]["Enums"]["ao_inbox_priority"];
          project_id: string | null;
          requested_by: string | null;
          run_id: string | null;
          source_app: string;
          space_id: string | null;
          status: Database["public"]["Enums"]["ao_inbox_item_status"];
          suggested_action: string | null;
          suggested_draft: string | null;
          summary: string | null;
          task_outcome: string | null;
          thread_id: string | null;
          title: string;
          type: Database["public"]["Enums"]["ao_inbox_item_type"];
          updated_at: string;
          workflow_hook_token: string | null;
          workflow_run_id: string | null;
        };
        Insert: {
          agent_id?: string | null;
          agent_name?: string;
          approval_id?: string | null;
          assigned_to?: string | null;
          automation_id?: string | null;
          context?: Json;
          created_at?: string;
          decided_at?: string | null;
          decided_by?: string | null;
          decision_note?: string | null;
          department?: string | null;
          error_message?: string | null;
          follow_up_at?: string | null;
          human_response?: string | null;
          id?: string;
          is_read?: boolean;
          lane?: Database["public"]["Enums"]["ao_inbox_lane"];
          org_id: string;
          parent_item_id?: string | null;
          person_ref?: string | null;
          pinned?: boolean;
          priority?: Database["public"]["Enums"]["ao_inbox_priority"];
          project_id?: string | null;
          requested_by?: string | null;
          run_id?: string | null;
          source_app?: string;
          space_id?: string | null;
          status?: Database["public"]["Enums"]["ao_inbox_item_status"];
          suggested_action?: string | null;
          suggested_draft?: string | null;
          summary?: string | null;
          task_outcome?: string | null;
          thread_id?: string | null;
          title: string;
          type: Database["public"]["Enums"]["ao_inbox_item_type"];
          updated_at?: string;
          workflow_hook_token?: string | null;
          workflow_run_id?: string | null;
        };
        Update: {
          agent_id?: string | null;
          agent_name?: string;
          approval_id?: string | null;
          assigned_to?: string | null;
          automation_id?: string | null;
          context?: Json;
          created_at?: string;
          decided_at?: string | null;
          decided_by?: string | null;
          decision_note?: string | null;
          department?: string | null;
          error_message?: string | null;
          follow_up_at?: string | null;
          human_response?: string | null;
          id?: string;
          is_read?: boolean;
          lane?: Database["public"]["Enums"]["ao_inbox_lane"];
          org_id?: string;
          parent_item_id?: string | null;
          person_ref?: string | null;
          pinned?: boolean;
          priority?: Database["public"]["Enums"]["ao_inbox_priority"];
          project_id?: string | null;
          requested_by?: string | null;
          run_id?: string | null;
          source_app?: string;
          space_id?: string | null;
          status?: Database["public"]["Enums"]["ao_inbox_item_status"];
          suggested_action?: string | null;
          suggested_draft?: string | null;
          summary?: string | null;
          task_outcome?: string | null;
          thread_id?: string | null;
          title?: string;
          type?: Database["public"]["Enums"]["ao_inbox_item_type"];
          updated_at?: string;
          workflow_hook_token?: string | null;
          workflow_run_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ao_inbox_items_agent_id_fkey";
            columns: ["agent_id"];
            isOneToOne: false;
            referencedRelation: "ao_agents";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_inbox_items_approval_id_fkey";
            columns: ["approval_id"];
            isOneToOne: false;
            referencedRelation: "ao_approvals";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_inbox_items_assigned_to_fkey";
            columns: ["assigned_to"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_inbox_items_automation_id_fkey";
            columns: ["automation_id"];
            isOneToOne: false;
            referencedRelation: "ao_automations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_inbox_items_decided_by_fkey";
            columns: ["decided_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_inbox_items_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_inbox_items_parent_item_id_fkey";
            columns: ["parent_item_id"];
            isOneToOne: false;
            referencedRelation: "ao_inbox_items";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_inbox_items_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "ao_intel_projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_inbox_items_requested_by_fkey";
            columns: ["requested_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_inbox_items_run_id_fkey";
            columns: ["run_id"];
            isOneToOne: false;
            referencedRelation: "ao_agent_runs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_inbox_items_space_id_fkey";
            columns: ["space_id"];
            isOneToOne: false;
            referencedRelation: "ao_spaces";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_inbox_items_thread_id_fkey";
            columns: ["thread_id"];
            isOneToOne: false;
            referencedRelation: "ao_threads";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_inbox_items_workflow_run_id_fkey";
            columns: ["workflow_run_id"];
            isOneToOne: false;
            referencedRelation: "ao_workflow_runs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_insights: {
        Row: {
          body: string;
          created_at: string;
          dismissed_at: string | null;
          entity_id: string | null;
          id: string;
          kind: string;
          metadata: Json;
          org_id: string;
          status: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          body: string;
          created_at?: string;
          dismissed_at?: string | null;
          entity_id?: string | null;
          id?: string;
          kind: string;
          metadata?: Json;
          org_id: string;
          status?: string;
          title: string;
          updated_at?: string;
        };
        Update: {
          body?: string;
          created_at?: string;
          dismissed_at?: string | null;
          entity_id?: string | null;
          id?: string;
          kind?: string;
          metadata?: Json;
          org_id?: string;
          status?: string;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_insights_entity_id_fkey";
            columns: ["entity_id"];
            isOneToOne: false;
            referencedRelation: "ao_entities";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_insights_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_integration_access_events: {
        Row: {
          actor_id: string | null;
          created_at: string;
          event_type: string;
          id: string;
          integration_id: string | null;
          metadata: Json;
          org_id: string | null;
          share_id: string | null;
        };
        Insert: {
          actor_id?: string | null;
          created_at?: string;
          event_type: string;
          id?: string;
          integration_id?: string | null;
          metadata?: Json;
          org_id?: string | null;
          share_id?: string | null;
        };
        Update: {
          actor_id?: string | null;
          created_at?: string;
          event_type?: string;
          id?: string;
          integration_id?: string | null;
          metadata?: Json;
          org_id?: string | null;
          share_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ao_integration_access_events_actor_id_fkey";
            columns: ["actor_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_integration_access_events_integration_id_fkey";
            columns: ["integration_id"];
            isOneToOne: false;
            referencedRelation: "ao_integrations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_integration_access_events_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_integration_access_events_share_id_fkey";
            columns: ["share_id"];
            isOneToOne: false;
            referencedRelation: "ao_integration_shares";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_integration_grantees: {
        Row: {
          created_at: string;
          granted_by: string | null;
          id: string;
          integration_id: string;
          org_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          granted_by?: string | null;
          id?: string;
          integration_id: string;
          org_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          granted_by?: string | null;
          id?: string;
          integration_id?: string;
          org_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_integration_grantees_granted_by_fkey";
            columns: ["granted_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_integration_grantees_integration_id_fkey";
            columns: ["integration_id"];
            isOneToOne: false;
            referencedRelation: "ao_integrations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_integration_grantees_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_integration_grantees_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_integration_preferences: {
        Row: {
          created_at: string;
          decided_at: string;
          decided_by: string | null;
          domain: string;
          id: string;
          label: string | null;
          org_id: string;
          preference_key: string;
          run_id: string | null;
          source: string;
          thread_id: string | null;
          updated_at: string;
          user_id: string | null;
          value: Json;
        };
        Insert: {
          created_at?: string;
          decided_at?: string;
          decided_by?: string | null;
          domain: string;
          id?: string;
          label?: string | null;
          org_id: string;
          preference_key?: string;
          run_id?: string | null;
          source?: string;
          thread_id?: string | null;
          updated_at?: string;
          user_id?: string | null;
          value?: Json;
        };
        Update: {
          created_at?: string;
          decided_at?: string;
          decided_by?: string | null;
          domain?: string;
          id?: string;
          label?: string | null;
          org_id?: string;
          preference_key?: string;
          run_id?: string | null;
          source?: string;
          thread_id?: string | null;
          updated_at?: string;
          user_id?: string | null;
          value?: Json;
        };
        Relationships: [
          {
            foreignKeyName: "ao_integration_preferences_decided_by_fkey";
            columns: ["decided_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_integration_preferences_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_integration_preferences_run_id_fkey";
            columns: ["run_id"];
            isOneToOne: false;
            referencedRelation: "ao_playbook_runs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_integration_preferences_thread_id_fkey";
            columns: ["thread_id"];
            isOneToOne: false;
            referencedRelation: "ao_threads";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_integration_preferences_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_integration_share_grantees: {
        Row: {
          created_at: string;
          id: string;
          share_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          share_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          share_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_integration_share_grantees_share_id_fkey";
            columns: ["share_id"];
            isOneToOne: false;
            referencedRelation: "ao_integration_shares";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_integration_share_grantees_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_integration_shares: {
        Row: {
          access_mode: string;
          created_at: string;
          expires_at: string | null;
          granted_by: string;
          id: string;
          integration_id: string;
          revoked_at: string | null;
          scopes: string[];
          source_org_id: string;
          status: string;
          target_org_id: string;
          updated_at: string;
        };
        Insert: {
          access_mode?: string;
          created_at?: string;
          expires_at?: string | null;
          granted_by: string;
          id?: string;
          integration_id: string;
          revoked_at?: string | null;
          scopes?: string[];
          source_org_id: string;
          status?: string;
          target_org_id: string;
          updated_at?: string;
        };
        Update: {
          access_mode?: string;
          created_at?: string;
          expires_at?: string | null;
          granted_by?: string;
          id?: string;
          integration_id?: string;
          revoked_at?: string | null;
          scopes?: string[];
          source_org_id?: string;
          status?: string;
          target_org_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_integration_shares_granted_by_fkey";
            columns: ["granted_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_integration_shares_integration_id_fkey";
            columns: ["integration_id"];
            isOneToOne: false;
            referencedRelation: "ao_integrations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_integration_shares_source_org_id_fkey";
            columns: ["source_org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_integration_shares_target_org_id_fkey";
            columns: ["target_org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_integration_workspace_settings: {
        Row: {
          created_at: string;
          disabled_at: string | null;
          id: string;
          integration_id: string;
          org_id: string;
          updated_at: string;
          updated_by: string | null;
          webhooks_enabled: boolean;
        };
        Insert: {
          created_at?: string;
          disabled_at?: string | null;
          id?: string;
          integration_id: string;
          org_id: string;
          updated_at?: string;
          updated_by?: string | null;
          webhooks_enabled?: boolean;
        };
        Update: {
          created_at?: string;
          disabled_at?: string | null;
          id?: string;
          integration_id?: string;
          org_id?: string;
          updated_at?: string;
          updated_by?: string | null;
          webhooks_enabled?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "ao_integration_workspace_settings_integration_id_fkey";
            columns: ["integration_id"];
            isOneToOne: false;
            referencedRelation: "ao_integrations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_integration_workspace_settings_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_integration_workspace_settings_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_integrations: {
        Row: {
          channel_meta: Json | null;
          config: Json;
          created_at: string;
          created_by: string | null;
          disabled_at: string | null;
          id: string;
          kind: Database["public"]["Enums"]["ao_integration_kind"];
          org_id: string;
          status: string;
          updated_at: string;
          visibility: string;
        };
        Insert: {
          channel_meta?: Json | null;
          config?: Json;
          created_at?: string;
          created_by?: string | null;
          disabled_at?: string | null;
          id?: string;
          kind: Database["public"]["Enums"]["ao_integration_kind"];
          org_id: string;
          status?: string;
          updated_at?: string;
          visibility?: string;
        };
        Update: {
          channel_meta?: Json | null;
          config?: Json;
          created_at?: string;
          created_by?: string | null;
          disabled_at?: string | null;
          id?: string;
          kind?: Database["public"]["Enums"]["ao_integration_kind"];
          org_id?: string;
          status?: string;
          updated_at?: string;
          visibility?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_integrations_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_intel_history_events: {
        Row: {
          actor_id: string | null;
          created_at: string;
          id: string;
          kind: Database["public"]["Enums"]["ao_intel_history_kind"];
          metadata: Json;
          org_id: string;
          ref_id: string | null;
          ref_table: string | null;
          summary: string;
        };
        Insert: {
          actor_id?: string | null;
          created_at?: string;
          id?: string;
          kind?: Database["public"]["Enums"]["ao_intel_history_kind"];
          metadata?: Json;
          org_id: string;
          ref_id?: string | null;
          ref_table?: string | null;
          summary: string;
        };
        Update: {
          actor_id?: string | null;
          created_at?: string;
          id?: string;
          kind?: Database["public"]["Enums"]["ao_intel_history_kind"];
          metadata?: Json;
          org_id?: string;
          ref_id?: string | null;
          ref_table?: string | null;
          summary?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_intel_history_events_actor_id_fkey";
            columns: ["actor_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_intel_history_events_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_intel_master_plans: {
        Row: {
          created_at: string;
          created_by: string | null;
          description: string | null;
          id: string;
          org_id: string;
          plan_priority: string;
          sections: Json;
          status: Database["public"]["Enums"]["ao_intel_master_plan_status"];
          title: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          id?: string;
          org_id: string;
          plan_priority?: string;
          sections?: Json;
          status?: Database["public"]["Enums"]["ao_intel_master_plan_status"];
          title: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          id?: string;
          org_id?: string;
          plan_priority?: string;
          sections?: Json;
          status?: Database["public"]["Enums"]["ao_intel_master_plan_status"];
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_intel_master_plans_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_intel_master_plans_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_intel_project_members: {
        Row: {
          added_by: string | null;
          created_at: string;
          id: string;
          org_id: string;
          project_id: string;
          role: string;
          user_id: string;
        };
        Insert: {
          added_by?: string | null;
          created_at?: string;
          id?: string;
          org_id: string;
          project_id: string;
          role?: string;
          user_id: string;
        };
        Update: {
          added_by?: string | null;
          created_at?: string;
          id?: string;
          org_id?: string;
          project_id?: string;
          role?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_intel_project_members_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_intel_project_members_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "ao_intel_projects";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_intel_projects: {
        Row: {
          commitment_state: Database["public"]["Enums"]["ao_work_commitment_state"];
          completed_at: string | null;
          confidence: number | null;
          constraint_id: string | null;
          created_at: string;
          created_by: string | null;
          dedupe_key: string | null;
          description: string | null;
          due_at: string | null;
          expected_outcome: Json;
          health: string;
          id: string;
          master_plan_id: string | null;
          objective_id: string | null;
          org_id: string;
          owner_user_id: string | null;
          plan_section: string | null;
          priority: string;
          source_inbox_item_id: string | null;
          source_playbook_run_id: string | null;
          source_thread_id: string | null;
          source_type: string;
          space_id: string | null;
          started_at: string | null;
          status: Database["public"]["Enums"]["ao_intel_project_status"];
          success_criteria: string | null;
          title: string;
          updated_at: string;
        };
        Insert: {
          commitment_state?: Database["public"]["Enums"]["ao_work_commitment_state"];
          completed_at?: string | null;
          confidence?: number | null;
          constraint_id?: string | null;
          created_at?: string;
          created_by?: string | null;
          dedupe_key?: string | null;
          description?: string | null;
          due_at?: string | null;
          expected_outcome?: Json;
          health?: string;
          id?: string;
          master_plan_id?: string | null;
          objective_id?: string | null;
          org_id: string;
          owner_user_id?: string | null;
          plan_section?: string | null;
          priority?: string;
          source_inbox_item_id?: string | null;
          source_playbook_run_id?: string | null;
          source_thread_id?: string | null;
          source_type?: string;
          space_id?: string | null;
          started_at?: string | null;
          status?: Database["public"]["Enums"]["ao_intel_project_status"];
          success_criteria?: string | null;
          title: string;
          updated_at?: string;
        };
        Update: {
          commitment_state?: Database["public"]["Enums"]["ao_work_commitment_state"];
          completed_at?: string | null;
          confidence?: number | null;
          constraint_id?: string | null;
          created_at?: string;
          created_by?: string | null;
          dedupe_key?: string | null;
          description?: string | null;
          due_at?: string | null;
          expected_outcome?: Json;
          health?: string;
          id?: string;
          master_plan_id?: string | null;
          objective_id?: string | null;
          org_id?: string;
          owner_user_id?: string | null;
          plan_section?: string | null;
          priority?: string;
          source_inbox_item_id?: string | null;
          source_playbook_run_id?: string | null;
          source_thread_id?: string | null;
          source_type?: string;
          space_id?: string | null;
          started_at?: string | null;
          status?: Database["public"]["Enums"]["ao_intel_project_status"];
          success_criteria?: string | null;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_intel_projects_constraint_id_fkey";
            columns: ["constraint_id"];
            isOneToOne: false;
            referencedRelation: "ao_constraints";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_intel_projects_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_intel_projects_master_plan_id_fkey";
            columns: ["master_plan_id"];
            isOneToOne: false;
            referencedRelation: "ao_intel_master_plans";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_intel_projects_objective_id_fkey";
            columns: ["objective_id"];
            isOneToOne: false;
            referencedRelation: "ao_objectives";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_intel_projects_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_intel_projects_owner_user_id_fkey";
            columns: ["owner_user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_intel_projects_source_inbox_item_id_fkey";
            columns: ["source_inbox_item_id"];
            isOneToOne: false;
            referencedRelation: "ao_inbox_items";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_intel_projects_source_playbook_run_id_fkey";
            columns: ["source_playbook_run_id"];
            isOneToOne: false;
            referencedRelation: "ao_playbook_runs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_intel_projects_source_thread_id_fkey";
            columns: ["source_thread_id"];
            isOneToOne: false;
            referencedRelation: "ao_threads";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_invites: {
        Row: {
          accepted_at: string | null;
          created_at: string;
          created_by: string | null;
          email: string;
          expires_at: string;
          id: string;
          org_id: string;
          role: Database["public"]["Enums"]["ao_org_role"];
          token: string;
        };
        Insert: {
          accepted_at?: string | null;
          created_at?: string;
          created_by?: string | null;
          email: string;
          expires_at?: string;
          id?: string;
          org_id: string;
          role?: Database["public"]["Enums"]["ao_org_role"];
          token?: string;
        };
        Update: {
          accepted_at?: string | null;
          created_at?: string;
          created_by?: string | null;
          email?: string;
          expires_at?: string;
          id?: string;
          org_id?: string;
          role?: Database["public"]["Enums"]["ao_org_role"];
          token?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_invites_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_login_email_codes: {
        Row: {
          code_hash: string;
          created_at: string;
          email: string;
          expires_at: string;
          id: string;
        };
        Insert: {
          code_hash: string;
          created_at?: string;
          email: string;
          expires_at: string;
          id?: string;
        };
        Update: {
          code_hash?: string;
          created_at?: string;
          email?: string;
          expires_at?: string;
          id?: string;
        };
        Relationships: [];
      };
      ao_marketing_attribution: {
        Row: {
          conversion_type: string | null;
          created_at: string;
          first_paid_at: string | null;
          first_touch: Json | null;
          id: string;
          last_touch: Json | null;
          registered_at: string;
          stripe_customer_id: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          conversion_type?: string | null;
          created_at?: string;
          first_paid_at?: string | null;
          first_touch?: Json | null;
          id?: string;
          last_touch?: Json | null;
          registered_at?: string;
          stripe_customer_id?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          conversion_type?: string | null;
          created_at?: string;
          first_paid_at?: string | null;
          first_touch?: Json | null;
          id?: string;
          last_touch?: Json | null;
          registered_at?: string;
          stripe_customer_id?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      ao_marketplace_installs: {
        Row: {
          config: Json;
          created_at: string;
          id: string;
          installed_by: string | null;
          installed_skill_id: string | null;
          org_id: string;
          status: string;
          template_id: string;
          test_run_id: string | null;
          updated_at: string;
        };
        Insert: {
          config?: Json;
          created_at?: string;
          id?: string;
          installed_by?: string | null;
          installed_skill_id?: string | null;
          org_id: string;
          status?: string;
          template_id: string;
          test_run_id?: string | null;
          updated_at?: string;
        };
        Update: {
          config?: Json;
          created_at?: string;
          id?: string;
          installed_by?: string | null;
          installed_skill_id?: string | null;
          org_id?: string;
          status?: string;
          template_id?: string;
          test_run_id?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_marketplace_installs_installed_by_fkey";
            columns: ["installed_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_marketplace_installs_installed_skill_id_fkey";
            columns: ["installed_skill_id"];
            isOneToOne: false;
            referencedRelation: "ao_skills";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_marketplace_installs_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_marketplace_installs_template_id_fkey";
            columns: ["template_id"];
            isOneToOne: false;
            referencedRelation: "ao_marketplace_templates";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_marketplace_installs_test_run_id_fkey";
            columns: ["test_run_id"];
            isOneToOne: false;
            referencedRelation: "ao_skill_runs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_marketplace_templates: {
        Row: {
          attribution: string | null;
          category: string;
          contributor_count: number;
          created_at: string;
          description: string | null;
          id: string;
          ir_json: Json;
          is_enterprise_only: boolean;
          is_premium: boolean;
          last_verified_at: string | null;
          learned_from_network: boolean;
          limitations: string | null;
          name: string;
          network_pattern_count: number;
          outcome: string;
          portal: string | null;
          required_credentials: Json;
          required_inputs: Json;
          run_count: number;
          slug: string;
          success_rate: number | null;
          trust_level: string;
          updated_at: string;
        };
        Insert: {
          attribution?: string | null;
          category?: string;
          contributor_count?: number;
          created_at?: string;
          description?: string | null;
          id?: string;
          ir_json: Json;
          is_enterprise_only?: boolean;
          is_premium?: boolean;
          last_verified_at?: string | null;
          learned_from_network?: boolean;
          limitations?: string | null;
          name: string;
          network_pattern_count?: number;
          outcome: string;
          portal?: string | null;
          required_credentials?: Json;
          required_inputs?: Json;
          run_count?: number;
          slug: string;
          success_rate?: number | null;
          trust_level?: string;
          updated_at?: string;
        };
        Update: {
          attribution?: string | null;
          category?: string;
          contributor_count?: number;
          created_at?: string;
          description?: string | null;
          id?: string;
          ir_json?: Json;
          is_enterprise_only?: boolean;
          is_premium?: boolean;
          last_verified_at?: string | null;
          learned_from_network?: boolean;
          limitations?: string | null;
          name?: string;
          network_pattern_count?: number;
          outcome?: string;
          portal?: string | null;
          required_credentials?: Json;
          required_inputs?: Json;
          run_count?: number;
          slug?: string;
          success_rate?: number | null;
          trust_level?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      ao_message_chunks: {
        Row: {
          chunk_index: number;
          chunk_text: string;
          created_at: string;
          embedding: string | null;
          id: string;
          message_id: string;
          org_id: string;
          project_id: string | null;
          role: string;
          thread_id: string;
          token_vector: Json;
        };
        Insert: {
          chunk_index?: number;
          chunk_text: string;
          created_at?: string;
          embedding?: string | null;
          id?: string;
          message_id: string;
          org_id: string;
          project_id?: string | null;
          role?: string;
          thread_id: string;
          token_vector?: Json;
        };
        Update: {
          chunk_index?: number;
          chunk_text?: string;
          created_at?: string;
          embedding?: string | null;
          id?: string;
          message_id?: string;
          org_id?: string;
          project_id?: string | null;
          role?: string;
          thread_id?: string;
          token_vector?: Json;
        };
        Relationships: [
          {
            foreignKeyName: "ao_message_chunks_message_id_fkey";
            columns: ["message_id"];
            isOneToOne: false;
            referencedRelation: "ao_messages";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_message_chunks_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_message_chunks_thread_id_fkey";
            columns: ["thread_id"];
            isOneToOne: false;
            referencedRelation: "ao_threads";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_messages: {
        Row: {
          content: string;
          content_tsv: unknown;
          created_at: string;
          credits_used: number;
          id: string;
          input_tokens: number;
          metadata: Json;
          model: string | null;
          org_id: string;
          output_tokens: number;
          role: Database["public"]["Enums"]["ao_message_role"];
          thread_id: string;
        };
        Insert: {
          content: string;
          content_tsv?: unknown;
          created_at?: string;
          credits_used?: number;
          id?: string;
          input_tokens?: number;
          metadata?: Json;
          model?: string | null;
          org_id: string;
          output_tokens?: number;
          role: Database["public"]["Enums"]["ao_message_role"];
          thread_id: string;
        };
        Update: {
          content?: string;
          content_tsv?: unknown;
          created_at?: string;
          credits_used?: number;
          id?: string;
          input_tokens?: number;
          metadata?: Json;
          model?: string | null;
          org_id?: string;
          output_tokens?: number;
          role?: Database["public"]["Enums"]["ao_message_role"];
          thread_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_messages_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_messages_thread_id_fkey";
            columns: ["thread_id"];
            isOneToOne: false;
            referencedRelation: "ao_threads";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_meta_ad_action_log: {
        Row: {
          created_at: string;
          id: string;
          integration_id: string | null;
          operation: string;
          org_id: string;
          params: Json;
          result: Json | null;
          reversible_params: Json | null;
          rollback_of: string | null;
          tool_name: string;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          integration_id?: string | null;
          operation?: string;
          org_id: string;
          params?: Json;
          result?: Json | null;
          reversible_params?: Json | null;
          rollback_of?: string | null;
          tool_name: string;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          integration_id?: string | null;
          operation?: string;
          org_id?: string;
          params?: Json;
          result?: Json | null;
          reversible_params?: Json | null;
          rollback_of?: string | null;
          tool_name?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ao_meta_ad_action_log_integration_id_fkey";
            columns: ["integration_id"];
            isOneToOne: false;
            referencedRelation: "ao_integrations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_meta_ad_action_log_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_meta_ad_action_log_rollback_of_fkey";
            columns: ["rollback_of"];
            isOneToOne: false;
            referencedRelation: "ao_meta_ad_action_log";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_meta_lead_sync_configs: {
        Row: {
          calendar_id: string | null;
          created_at: string;
          enabled: boolean;
          form_ids: string[];
          id: string;
          last_sync_at: string | null;
          org_id: string;
          source: string;
          tags: string[];
          updated_at: string;
          webhook_secret: string | null;
          workflow_id: string | null;
        };
        Insert: {
          calendar_id?: string | null;
          created_at?: string;
          enabled?: boolean;
          form_ids?: string[];
          id?: string;
          last_sync_at?: string | null;
          org_id: string;
          source?: string;
          tags?: string[];
          updated_at?: string;
          webhook_secret?: string | null;
          workflow_id?: string | null;
        };
        Update: {
          calendar_id?: string | null;
          created_at?: string;
          enabled?: boolean;
          form_ids?: string[];
          id?: string;
          last_sync_at?: string | null;
          org_id?: string;
          source?: string;
          tags?: string[];
          updated_at?: string;
          webhook_secret?: string | null;
          workflow_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ao_meta_lead_sync_configs_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: true;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_meta_lead_sync_processed: {
        Row: {
          contact_id: string | null;
          created_at: string;
          error: string | null;
          form_id: string | null;
          id: string;
          meta_lead_id: string;
          org_id: string;
          payload: Json;
          status: string;
        };
        Insert: {
          contact_id?: string | null;
          created_at?: string;
          error?: string | null;
          form_id?: string | null;
          id?: string;
          meta_lead_id: string;
          org_id: string;
          payload?: Json;
          status?: string;
        };
        Update: {
          contact_id?: string | null;
          created_at?: string;
          error?: string | null;
          form_id?: string | null;
          id?: string;
          meta_lead_id?: string;
          org_id?: string;
          payload?: Json;
          status?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_meta_lead_sync_processed_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_objectives: {
        Row: {
          baseline: Json;
          created_at: string;
          created_by: string | null;
          description: string | null;
          id: string;
          metrics: Json;
          org_id: string;
          owner_user_id: string | null;
          source_thread_id: string | null;
          status: Database["public"]["Enums"]["ao_objective_status"];
          target: Json;
          team_id: string | null;
          timeframe_end: string | null;
          timeframe_start: string | null;
          title: string;
          updated_at: string;
        };
        Insert: {
          baseline?: Json;
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          id?: string;
          metrics?: Json;
          org_id: string;
          owner_user_id?: string | null;
          source_thread_id?: string | null;
          status?: Database["public"]["Enums"]["ao_objective_status"];
          target?: Json;
          team_id?: string | null;
          timeframe_end?: string | null;
          timeframe_start?: string | null;
          title: string;
          updated_at?: string;
        };
        Update: {
          baseline?: Json;
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          id?: string;
          metrics?: Json;
          org_id?: string;
          owner_user_id?: string | null;
          source_thread_id?: string | null;
          status?: Database["public"]["Enums"]["ao_objective_status"];
          target?: Json;
          team_id?: string | null;
          timeframe_end?: string | null;
          timeframe_start?: string | null;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_objectives_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_objectives_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_objectives_owner_user_id_fkey";
            columns: ["owner_user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_objectives_source_thread_id_fkey";
            columns: ["source_thread_id"];
            isOneToOne: false;
            referencedRelation: "ao_threads";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_org_automation_template_installs: {
        Row: {
          automation_id: string | null;
          created_at: string;
          id: string;
          installed_by: string | null;
          org_id: string;
          template_id: string;
        };
        Insert: {
          automation_id?: string | null;
          created_at?: string;
          id?: string;
          installed_by?: string | null;
          org_id: string;
          template_id: string;
        };
        Update: {
          automation_id?: string | null;
          created_at?: string;
          id?: string;
          installed_by?: string | null;
          org_id?: string;
          template_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_org_automation_template_installs_automation_id_fkey";
            columns: ["automation_id"];
            isOneToOne: false;
            referencedRelation: "ao_automations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_org_automation_template_installs_installed_by_fkey";
            columns: ["installed_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_org_automation_template_installs_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_org_automation_template_installs_template_id_fkey";
            columns: ["template_id"];
            isOneToOne: false;
            referencedRelation: "ao_org_automation_templates";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_org_automation_templates: {
        Row: {
          created_at: string;
          created_by: string | null;
          description: string | null;
          graph: Json;
          id: string;
          install_count: number;
          kind: string | null;
          mode: string;
          name: string;
          org_id: string;
          outputs: Json;
          prompt: string;
          schedule: string;
          slug: string;
          source_automation_id: string | null;
          trigger: Json;
          updated_at: string;
          visibility: string;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          graph?: Json;
          id?: string;
          install_count?: number;
          kind?: string | null;
          mode?: string;
          name: string;
          org_id: string;
          outputs?: Json;
          prompt?: string;
          schedule?: string;
          slug: string;
          source_automation_id?: string | null;
          trigger?: Json;
          updated_at?: string;
          visibility?: string;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          graph?: Json;
          id?: string;
          install_count?: number;
          kind?: string | null;
          mode?: string;
          name?: string;
          org_id?: string;
          outputs?: Json;
          prompt?: string;
          schedule?: string;
          slug?: string;
          source_automation_id?: string | null;
          trigger?: Json;
          updated_at?: string;
          visibility?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_org_automation_templates_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_org_automation_templates_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_org_automation_templates_source_automation_id_fkey";
            columns: ["source_automation_id"];
            isOneToOne: false;
            referencedRelation: "ao_automations";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_org_billing_policies: {
        Row: {
          allow_negative_balance: boolean;
          approved_models_only: boolean;
          auto_only: boolean;
          auto_topup_amount_credits: number | null;
          auto_topup_enabled: boolean;
          auto_topup_threshold_credits: number | null;
          created_at: string;
          daily_member_limit_credits: number | null;
          email_alerts_enabled: boolean;
          expensive_task_threshold_credits: number | null;
          grace_balance_credits: number;
          hard_stop_at_zero: boolean;
          last_balance_alert_at: string | null;
          last_balance_alert_threshold: number | null;
          max_cost_per_task_credits: number | null;
          model_mode_default: string;
          monthly_workspace_limit_credits: number | null;
          no_premium_models: boolean;
          notify_owner_thresholds: number[];
          org_id: string;
          premium_requires_approval: boolean;
          updated_at: string;
        };
        Insert: {
          allow_negative_balance?: boolean;
          approved_models_only?: boolean;
          auto_only?: boolean;
          auto_topup_amount_credits?: number | null;
          auto_topup_enabled?: boolean;
          auto_topup_threshold_credits?: number | null;
          created_at?: string;
          daily_member_limit_credits?: number | null;
          email_alerts_enabled?: boolean;
          expensive_task_threshold_credits?: number | null;
          grace_balance_credits?: number;
          hard_stop_at_zero?: boolean;
          last_balance_alert_at?: string | null;
          last_balance_alert_threshold?: number | null;
          max_cost_per_task_credits?: number | null;
          model_mode_default?: string;
          monthly_workspace_limit_credits?: number | null;
          no_premium_models?: boolean;
          notify_owner_thresholds?: number[];
          org_id: string;
          premium_requires_approval?: boolean;
          updated_at?: string;
        };
        Update: {
          allow_negative_balance?: boolean;
          approved_models_only?: boolean;
          auto_only?: boolean;
          auto_topup_amount_credits?: number | null;
          auto_topup_enabled?: boolean;
          auto_topup_threshold_credits?: number | null;
          created_at?: string;
          daily_member_limit_credits?: number | null;
          email_alerts_enabled?: boolean;
          expensive_task_threshold_credits?: number | null;
          grace_balance_credits?: number;
          hard_stop_at_zero?: boolean;
          last_balance_alert_at?: string | null;
          last_balance_alert_threshold?: number | null;
          max_cost_per_task_credits?: number | null;
          model_mode_default?: string;
          monthly_workspace_limit_credits?: number | null;
          no_premium_models?: boolean;
          notify_owner_thresholds?: number[];
          org_id?: string;
          premium_requires_approval?: boolean;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_org_billing_policies_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: true;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_org_branding: {
        Row: {
          display_name: string | null;
          embed_enabled: boolean;
          hide_powered_by: boolean;
          logo_url: string | null;
          org_id: string;
          primary_color: string;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          display_name?: string | null;
          embed_enabled?: boolean;
          hide_powered_by?: boolean;
          logo_url?: string | null;
          org_id: string;
          primary_color?: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          display_name?: string | null;
          embed_enabled?: boolean;
          hide_powered_by?: boolean;
          logo_url?: string | null;
          org_id?: string;
          primary_color?: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ao_org_branding_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: true;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_org_branding_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_org_learning_consent: {
        Row: {
          consented_at: string | null;
          consented_by: string | null;
          contribute_patterns: boolean;
          org_id: string;
          updated_at: string;
        };
        Insert: {
          consented_at?: string | null;
          consented_by?: string | null;
          contribute_patterns?: boolean;
          org_id: string;
          updated_at?: string;
        };
        Update: {
          consented_at?: string | null;
          consented_by?: string | null;
          contribute_patterns?: boolean;
          org_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_org_learning_consent_consented_by_fkey";
            columns: ["consented_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_org_learning_consent_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: true;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_org_members: {
        Row: {
          created_at: string;
          invited_by: string | null;
          left_at: string | null;
          member_kind: string;
          org_id: string;
          role: Database["public"]["Enums"]["ao_org_role"];
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          invited_by?: string | null;
          left_at?: string | null;
          member_kind?: string;
          org_id: string;
          role?: Database["public"]["Enums"]["ao_org_role"];
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          invited_by?: string | null;
          left_at?: string | null;
          member_kind?: string;
          org_id?: string;
          role?: Database["public"]["Enums"]["ao_org_role"];
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_org_members_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_org_policies: {
        Row: {
          allow_browser: boolean;
          block_browser_domains: Json;
          browser_allow_human_takeover: boolean;
          browser_allowed_domains: Json;
          browser_auto_error_screenshot: boolean;
          browser_auto_final_evidence: boolean;
          browser_data_retention_days: number;
          browser_failover_provider: string | null;
          browser_primary_provider: string;
          browser_record_sessions: boolean;
          browser_require_high_risk_approval: boolean;
          browser_sensitive_data_masking: boolean;
          browser_session_timeout_minutes: number;
          browser_show_live_preview: boolean;
          cloud_agent_auto_escalate: boolean;
          cloud_agent_default: boolean;
          cloud_agent_escalate_tool_heavy: boolean;
          dual_control_ads_spend: boolean;
          forced_ask_categories: string[];
          org_id: string;
          require_admin_for_all_writes: boolean;
          require_admin_for_external_email: boolean;
          restrict_sign_in_domains: Json;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          allow_browser?: boolean;
          block_browser_domains?: Json;
          browser_allow_human_takeover?: boolean;
          browser_allowed_domains?: Json;
          browser_auto_error_screenshot?: boolean;
          browser_auto_final_evidence?: boolean;
          browser_data_retention_days?: number;
          browser_failover_provider?: string | null;
          browser_primary_provider?: string;
          browser_record_sessions?: boolean;
          browser_require_high_risk_approval?: boolean;
          browser_sensitive_data_masking?: boolean;
          browser_session_timeout_minutes?: number;
          browser_show_live_preview?: boolean;
          cloud_agent_auto_escalate?: boolean;
          cloud_agent_default?: boolean;
          cloud_agent_escalate_tool_heavy?: boolean;
          dual_control_ads_spend?: boolean;
          forced_ask_categories?: string[];
          org_id: string;
          require_admin_for_all_writes?: boolean;
          require_admin_for_external_email?: boolean;
          restrict_sign_in_domains?: Json;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          allow_browser?: boolean;
          block_browser_domains?: Json;
          browser_allow_human_takeover?: boolean;
          browser_allowed_domains?: Json;
          browser_auto_error_screenshot?: boolean;
          browser_auto_final_evidence?: boolean;
          browser_data_retention_days?: number;
          browser_failover_provider?: string | null;
          browser_primary_provider?: string;
          browser_record_sessions?: boolean;
          browser_require_high_risk_approval?: boolean;
          browser_sensitive_data_masking?: boolean;
          browser_session_timeout_minutes?: number;
          browser_show_live_preview?: boolean;
          cloud_agent_auto_escalate?: boolean;
          cloud_agent_default?: boolean;
          cloud_agent_escalate_tool_heavy?: boolean;
          dual_control_ads_spend?: boolean;
          forced_ask_categories?: string[];
          org_id?: string;
          require_admin_for_all_writes?: boolean;
          require_admin_for_external_email?: boolean;
          restrict_sign_in_domains?: Json;
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ao_org_policies_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: true;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_org_sandboxes: {
        Row: {
          created_at: string;
          id: string;
          last_used_at: string | null;
          org_id: string;
          runtime: string;
          sandbox_name: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          last_used_at?: string | null;
          org_id: string;
          runtime?: string;
          sandbox_name: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          last_used_at?: string | null;
          org_id?: string;
          runtime?: string;
          sandbox_name?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_org_sandboxes_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_orgs: {
        Row: {
          agency_of_record: string | null;
          agenda_time_graph_enabled: boolean;
          archived_at: string | null;
          billing_exempt: boolean;
          billing_status: string;
          created_at: string;
          created_by: string | null;
          credits_balance: number;
          daily_credits_month_key: string | null;
          daily_credits_month_total: number;
          deleted_at: string | null;
          id: string;
          kind: string;
          lifecycle_status: string;
          name: string;
          plan: string;
          private_marketplace_enabled: boolean;
          provisional_guest: boolean;
          retention_until: string | null;
          skill_compliance_tier: string;
          slug: string;
          stripe_customer_id: string | null;
          updated_at: string;
        };
        Insert: {
          agency_of_record?: string | null;
          agenda_time_graph_enabled?: boolean;
          archived_at?: string | null;
          billing_exempt?: boolean;
          billing_status?: string;
          created_at?: string;
          created_by?: string | null;
          credits_balance?: number;
          daily_credits_month_key?: string | null;
          daily_credits_month_total?: number;
          deleted_at?: string | null;
          id?: string;
          kind?: string;
          lifecycle_status?: string;
          name: string;
          plan?: string;
          private_marketplace_enabled?: boolean;
          provisional_guest?: boolean;
          retention_until?: string | null;
          skill_compliance_tier?: string;
          slug: string;
          stripe_customer_id?: string | null;
          updated_at?: string;
        };
        Update: {
          agency_of_record?: string | null;
          agenda_time_graph_enabled?: boolean;
          archived_at?: string | null;
          billing_exempt?: boolean;
          billing_status?: string;
          created_at?: string;
          created_by?: string | null;
          credits_balance?: number;
          daily_credits_month_key?: string | null;
          daily_credits_month_total?: number;
          deleted_at?: string | null;
          id?: string;
          kind?: string;
          lifecycle_status?: string;
          name?: string;
          plan?: string;
          private_marketplace_enabled?: boolean;
          provisional_guest?: boolean;
          retention_until?: string | null;
          skill_compliance_tier?: string;
          slug?: string;
          stripe_customer_id?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_orgs_agency_of_record_fkey";
            columns: ["agency_of_record"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_outcome_reviews: {
        Row: {
          actual: Json;
          baseline: Json;
          created_at: string;
          evidence_summary: string | null;
          expected: Json;
          follow_up_work_item_id: string | null;
          id: string;
          lessons: string | null;
          objective_id: string | null;
          org_id: string;
          project_id: string | null;
          reviewed_at: string | null;
          reviewed_by: string | null;
          status: Database["public"]["Enums"]["ao_outcome_review_status"];
        };
        Insert: {
          actual?: Json;
          baseline?: Json;
          created_at?: string;
          evidence_summary?: string | null;
          expected?: Json;
          follow_up_work_item_id?: string | null;
          id?: string;
          lessons?: string | null;
          objective_id?: string | null;
          org_id: string;
          project_id?: string | null;
          reviewed_at?: string | null;
          reviewed_by?: string | null;
          status?: Database["public"]["Enums"]["ao_outcome_review_status"];
        };
        Update: {
          actual?: Json;
          baseline?: Json;
          created_at?: string;
          evidence_summary?: string | null;
          expected?: Json;
          follow_up_work_item_id?: string | null;
          id?: string;
          lessons?: string | null;
          objective_id?: string | null;
          org_id?: string;
          project_id?: string | null;
          reviewed_at?: string | null;
          reviewed_by?: string | null;
          status?: Database["public"]["Enums"]["ao_outcome_review_status"];
        };
        Relationships: [
          {
            foreignKeyName: "ao_outcome_reviews_follow_up_work_item_id_fkey";
            columns: ["follow_up_work_item_id"];
            isOneToOne: false;
            referencedRelation: "ao_work_items";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_outcome_reviews_objective_id_fkey";
            columns: ["objective_id"];
            isOneToOne: false;
            referencedRelation: "ao_objectives";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_outcome_reviews_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_outcome_reviews_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "ao_intel_projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_outcome_reviews_reviewed_by_fkey";
            columns: ["reviewed_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_packaged_actions: {
        Row: {
          active: boolean;
          created_at: string;
          description: string | null;
          fixed_credits_max: number | null;
          fixed_credits_min: number;
          markup_method: Database["public"]["Enums"]["ao_markup_method"];
          metadata: Json;
          name: string;
          pricing_version: number;
          slug: string;
          updated_at: string;
        };
        Insert: {
          active?: boolean;
          created_at?: string;
          description?: string | null;
          fixed_credits_max?: number | null;
          fixed_credits_min?: number;
          markup_method?: Database["public"]["Enums"]["ao_markup_method"];
          metadata?: Json;
          name: string;
          pricing_version?: number;
          slug: string;
          updated_at?: string;
        };
        Update: {
          active?: boolean;
          created_at?: string;
          description?: string | null;
          fixed_credits_max?: number | null;
          fixed_credits_min?: number;
          markup_method?: Database["public"]["Enums"]["ao_markup_method"];
          metadata?: Json;
          name?: string;
          pricing_version?: number;
          slug?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      ao_platform_agent_runs: {
        Row: {
          agent_slug: string;
          finished_at: string | null;
          id: string;
          metadata: Json;
          reason: string | null;
          started_at: string;
          status: string;
        };
        Insert: {
          agent_slug: string;
          finished_at?: string | null;
          id?: string;
          metadata?: Json;
          reason?: string | null;
          started_at?: string;
          status: string;
        };
        Update: {
          agent_slug?: string;
          finished_at?: string | null;
          id?: string;
          metadata?: Json;
          reason?: string | null;
          started_at?: string;
          status?: string;
        };
        Relationships: [];
      };
      ao_platform_feature_flags: {
        Row: {
          description: string | null;
          enabled: boolean;
          key: string;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          description?: string | null;
          enabled?: boolean;
          key: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          description?: string | null;
          enabled?: boolean;
          key?: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [];
      };
      ao_platform_improvement_proposals: {
        Row: {
          artifact_ref: Json;
          created_at: string;
          detail: string;
          id: string;
          kind: string;
          metadata: Json;
          priority: string;
          report_id: string | null;
          shipped_at: string | null;
          status: string;
          synthesis_id: string | null;
          title: string;
        };
        Insert: {
          artifact_ref?: Json;
          created_at?: string;
          detail: string;
          id?: string;
          kind: string;
          metadata?: Json;
          priority?: string;
          report_id?: string | null;
          shipped_at?: string | null;
          status?: string;
          synthesis_id?: string | null;
          title: string;
        };
        Update: {
          artifact_ref?: Json;
          created_at?: string;
          detail?: string;
          id?: string;
          kind?: string;
          metadata?: Json;
          priority?: string;
          report_id?: string | null;
          shipped_at?: string | null;
          status?: string;
          synthesis_id?: string | null;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_platform_improvement_proposals_report_id_fkey";
            columns: ["report_id"];
            isOneToOne: false;
            referencedRelation: "ao_platform_pattern_reports";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_platform_improvement_proposals_synthesis_id_fkey";
            columns: ["synthesis_id"];
            isOneToOne: false;
            referencedRelation: "ao_platform_learning_syntheses";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_platform_keys: {
        Row: {
          created_at: string;
          created_by: string | null;
          id: string;
          key_hash: string;
          key_prefix: string;
          label: string;
          last_used_at: string | null;
          org_id: string;
          revoked_at: string | null;
          scopes: string[];
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          id?: string;
          key_hash: string;
          key_prefix: string;
          label?: string;
          last_used_at?: string | null;
          org_id: string;
          revoked_at?: string | null;
          scopes?: string[];
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          id?: string;
          key_hash?: string;
          key_prefix?: string;
          label?: string;
          last_used_at?: string | null;
          org_id?: string;
          revoked_at?: string | null;
          scopes?: string[];
        };
        Relationships: [
          {
            foreignKeyName: "ao_platform_keys_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_platform_keys_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_platform_learning_syntheses: {
        Row: {
          agent_slug: string;
          body_md: string;
          created_at: string;
          id: string;
          metadata: Json;
          period_end: string;
          period_start: string;
          published_at: string | null;
          recommendations: Json;
          report_ids: string[];
          status: string;
          title: string;
        };
        Insert: {
          agent_slug?: string;
          body_md: string;
          created_at?: string;
          id?: string;
          metadata?: Json;
          period_end: string;
          period_start: string;
          published_at?: string | null;
          recommendations?: Json;
          report_ids?: string[];
          status?: string;
          title: string;
        };
        Update: {
          agent_slug?: string;
          body_md?: string;
          created_at?: string;
          id?: string;
          metadata?: Json;
          period_end?: string;
          period_start?: string;
          published_at?: string | null;
          recommendations?: Json;
          report_ids?: string[];
          status?: string;
          title?: string;
        };
        Relationships: [];
      };
      ao_platform_pattern_reports: {
        Row: {
          confidence: number;
          created_at: string;
          domain: string;
          fingerprint: string;
          id: string;
          impact_score: number | null;
          metadata: Json;
          org_hash: string;
          org_id: string;
          outcome_class: string;
          redaction_report: Json;
          reviewed_at: string | null;
          reviewed_by: string | null;
          search_text: string | null;
          signal_kind: string;
          status: string;
          summary: string;
          title: string;
          token_vector: Json;
          workflow_pattern: Json;
        };
        Insert: {
          confidence?: number;
          created_at?: string;
          domain?: string;
          fingerprint: string;
          id?: string;
          impact_score?: number | null;
          metadata?: Json;
          org_hash: string;
          org_id: string;
          outcome_class: string;
          redaction_report?: Json;
          reviewed_at?: string | null;
          reviewed_by?: string | null;
          search_text?: string | null;
          signal_kind: string;
          status?: string;
          summary: string;
          title: string;
          token_vector?: Json;
          workflow_pattern?: Json;
        };
        Update: {
          confidence?: number;
          created_at?: string;
          domain?: string;
          fingerprint?: string;
          id?: string;
          impact_score?: number | null;
          metadata?: Json;
          org_hash?: string;
          org_id?: string;
          outcome_class?: string;
          redaction_report?: Json;
          reviewed_at?: string | null;
          reviewed_by?: string | null;
          search_text?: string | null;
          signal_kind?: string;
          status?: string;
          summary?: string;
          title?: string;
          token_vector?: Json;
          workflow_pattern?: Json;
        };
        Relationships: [
          {
            foreignKeyName: "ao_platform_pattern_reports_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_platform_pattern_reports_reviewed_by_fkey";
            columns: ["reviewed_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_platform_webhooks: {
        Row: {
          created_at: string;
          created_by: string | null;
          enabled: boolean;
          events: string[];
          id: string;
          org_id: string;
          secret: string | null;
          updated_at: string;
          url: string;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          enabled?: boolean;
          events?: string[];
          id?: string;
          org_id: string;
          secret?: string | null;
          updated_at?: string;
          url: string;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          enabled?: boolean;
          events?: string[];
          id?: string;
          org_id?: string;
          secret?: string | null;
          updated_at?: string;
          url?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_platform_webhooks_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_platform_webhooks_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_playbook_access_attempts: {
        Row: {
          created_at: string;
          id: string;
          ip_hash: string | null;
          org_id: string | null;
          outcome: string;
          playbook_id: string;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          ip_hash?: string | null;
          org_id?: string | null;
          outcome: string;
          playbook_id: string;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          ip_hash?: string | null;
          org_id?: string | null;
          outcome?: string;
          playbook_id?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ao_playbook_access_attempts_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_playbook_access_attempts_playbook_id_fkey";
            columns: ["playbook_id"];
            isOneToOne: false;
            referencedRelation: "ao_playbooks";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_playbook_access_policies: {
        Row: {
          allowed_geographies: string[] | null;
          available_from: string | null;
          available_until: string | null;
          discoverability: string;
          forkable: boolean;
          max_activations: number | null;
          one_time_per_participant: boolean;
          password_algo: string | null;
          password_hash: string | null;
          password_set_at: string | null;
          playbook_id: string;
          required_role: string | null;
          requires_invite: boolean;
          requires_license: boolean;
          requires_password: boolean;
          requires_workspace_member: boolean;
          source_visibility: string;
          updated_at: string;
        };
        Insert: {
          allowed_geographies?: string[] | null;
          available_from?: string | null;
          available_until?: string | null;
          discoverability?: string;
          forkable?: boolean;
          max_activations?: number | null;
          one_time_per_participant?: boolean;
          password_algo?: string | null;
          password_hash?: string | null;
          password_set_at?: string | null;
          playbook_id: string;
          required_role?: string | null;
          requires_invite?: boolean;
          requires_license?: boolean;
          requires_password?: boolean;
          requires_workspace_member?: boolean;
          source_visibility?: string;
          updated_at?: string;
        };
        Update: {
          allowed_geographies?: string[] | null;
          available_from?: string | null;
          available_until?: string | null;
          discoverability?: string;
          forkable?: boolean;
          max_activations?: number | null;
          one_time_per_participant?: boolean;
          password_algo?: string | null;
          password_hash?: string | null;
          password_set_at?: string | null;
          playbook_id?: string;
          required_role?: string | null;
          requires_invite?: boolean;
          requires_license?: boolean;
          requires_password?: boolean;
          requires_workspace_member?: boolean;
          source_visibility?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_playbook_access_policies_playbook_id_fkey";
            columns: ["playbook_id"];
            isOneToOne: true;
            referencedRelation: "ao_playbooks";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_playbook_codewords: {
        Row: {
          alias_target_id: string | null;
          created_at: string;
          created_by: string | null;
          display_form: string;
          enterprise_org_id: string | null;
          id: string;
          is_reserved: boolean;
          owner_org_id: string | null;
          playbook_id: string;
          resolution_key: string;
          scope: string;
          skeleton: string | null;
          status: string;
          updated_at: string;
        };
        Insert: {
          alias_target_id?: string | null;
          created_at?: string;
          created_by?: string | null;
          display_form: string;
          enterprise_org_id?: string | null;
          id?: string;
          is_reserved?: boolean;
          owner_org_id?: string | null;
          playbook_id: string;
          resolution_key: string;
          scope?: string;
          skeleton?: string | null;
          status?: string;
          updated_at?: string;
        };
        Update: {
          alias_target_id?: string | null;
          created_at?: string;
          created_by?: string | null;
          display_form?: string;
          enterprise_org_id?: string | null;
          id?: string;
          is_reserved?: boolean;
          owner_org_id?: string | null;
          playbook_id?: string;
          resolution_key?: string;
          scope?: string;
          skeleton?: string | null;
          status?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_playbook_codewords_alias_target_id_fkey";
            columns: ["alias_target_id"];
            isOneToOne: false;
            referencedRelation: "ao_playbook_codewords";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_playbook_codewords_enterprise_org_id_fkey";
            columns: ["enterprise_org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_playbook_codewords_owner_org_id_fkey";
            columns: ["owner_org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_playbook_codewords_playbook_id_fkey";
            columns: ["playbook_id"];
            isOneToOne: false;
            referencedRelation: "ao_playbooks";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_playbook_consents: {
        Row: {
          contract_hash: string;
          contract_text: string;
          granted_at: string;
          id: string;
          org_id: string;
          playbook_id: string;
          risk_tier: number;
          user_id: string;
          version_id: string;
          withdrawn_at: string | null;
        };
        Insert: {
          contract_hash: string;
          contract_text: string;
          granted_at?: string;
          id?: string;
          org_id: string;
          playbook_id: string;
          risk_tier: number;
          user_id: string;
          version_id: string;
          withdrawn_at?: string | null;
        };
        Update: {
          contract_hash?: string;
          contract_text?: string;
          granted_at?: string;
          id?: string;
          org_id?: string;
          playbook_id?: string;
          risk_tier?: number;
          user_id?: string;
          version_id?: string;
          withdrawn_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ao_playbook_consents_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_playbook_consents_playbook_id_fkey";
            columns: ["playbook_id"];
            isOneToOne: false;
            referencedRelation: "ao_playbooks";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_playbook_consents_version_id_fkey";
            columns: ["version_id"];
            isOneToOne: false;
            referencedRelation: "ao_playbook_version_meta";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_playbook_consents_version_id_fkey";
            columns: ["version_id"];
            isOneToOne: false;
            referencedRelation: "ao_playbook_versions";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_playbook_dependencies: {
        Row: {
          agent_id: string | null;
          channel: string | null;
          created_at: string;
          dependency_kind: string;
          depends_on_playbook_id: string | null;
          enforcement: string;
          id: string;
          integration_id: string | null;
          note: string | null;
          skill_id: string | null;
          tool_name: string | null;
          toolkit_slug: string | null;
          version_id: string;
        };
        Insert: {
          agent_id?: string | null;
          channel?: string | null;
          created_at?: string;
          dependency_kind: string;
          depends_on_playbook_id?: string | null;
          enforcement?: string;
          id?: string;
          integration_id?: string | null;
          note?: string | null;
          skill_id?: string | null;
          tool_name?: string | null;
          toolkit_slug?: string | null;
          version_id: string;
        };
        Update: {
          agent_id?: string | null;
          channel?: string | null;
          created_at?: string;
          dependency_kind?: string;
          depends_on_playbook_id?: string | null;
          enforcement?: string;
          id?: string;
          integration_id?: string | null;
          note?: string | null;
          skill_id?: string | null;
          tool_name?: string | null;
          toolkit_slug?: string | null;
          version_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_playbook_dependencies_agent_id_fkey";
            columns: ["agent_id"];
            isOneToOne: false;
            referencedRelation: "ao_agents";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_playbook_dependencies_depends_on_playbook_id_fkey";
            columns: ["depends_on_playbook_id"];
            isOneToOne: false;
            referencedRelation: "ao_playbooks";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_playbook_dependencies_integration_id_fkey";
            columns: ["integration_id"];
            isOneToOne: false;
            referencedRelation: "ao_integrations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_playbook_dependencies_skill_id_fkey";
            columns: ["skill_id"];
            isOneToOne: false;
            referencedRelation: "ao_skills";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_playbook_dependencies_version_id_fkey";
            columns: ["version_id"];
            isOneToOne: false;
            referencedRelation: "ao_playbook_version_meta";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_playbook_dependencies_version_id_fkey";
            columns: ["version_id"];
            isOneToOne: false;
            referencedRelation: "ao_playbook_versions";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_playbook_enterprise_settings: {
        Row: {
          allow_member_authoring: boolean;
          allowed_public_playbooks: string[];
          max_risk_tier: number;
          org_id: string;
          restrict_to_own_registry: boolean;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          allow_member_authoring?: boolean;
          allowed_public_playbooks?: string[];
          max_risk_tier?: number;
          org_id: string;
          restrict_to_own_registry?: boolean;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          allow_member_authoring?: boolean;
          allowed_public_playbooks?: string[];
          max_risk_tier?: number;
          org_id?: string;
          restrict_to_own_registry?: boolean;
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ao_playbook_enterprise_settings_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: true;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_playbook_grants: {
        Row: {
          created_at: string;
          expires_at: string | null;
          granted_by: string | null;
          grantee_email: string | null;
          grantee_org_id: string | null;
          grantee_user_id: string | null;
          id: string;
          note: string | null;
          playbook_id: string;
          status: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          expires_at?: string | null;
          granted_by?: string | null;
          grantee_email?: string | null;
          grantee_org_id?: string | null;
          grantee_user_id?: string | null;
          id?: string;
          note?: string | null;
          playbook_id: string;
          status?: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          expires_at?: string | null;
          granted_by?: string | null;
          grantee_email?: string | null;
          grantee_org_id?: string | null;
          grantee_user_id?: string | null;
          id?: string;
          note?: string | null;
          playbook_id?: string;
          status?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_playbook_grants_grantee_org_id_fkey";
            columns: ["grantee_org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_playbook_grants_playbook_id_fkey";
            columns: ["playbook_id"];
            isOneToOne: false;
            referencedRelation: "ao_playbooks";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_playbook_installs: {
        Row: {
          id: string;
          install_kind: string;
          installed_at: string;
          installed_by: string;
          installed_playbook_id: string;
          source_playbook_id: string;
          source_version_id: string | null;
          target_org_id: string;
          white_label: boolean;
        };
        Insert: {
          id?: string;
          install_kind?: string;
          installed_at?: string;
          installed_by: string;
          installed_playbook_id: string;
          source_playbook_id: string;
          source_version_id?: string | null;
          target_org_id: string;
          white_label?: boolean;
        };
        Update: {
          id?: string;
          install_kind?: string;
          installed_at?: string;
          installed_by?: string;
          installed_playbook_id?: string;
          source_playbook_id?: string;
          source_version_id?: string | null;
          target_org_id?: string;
          white_label?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "ao_playbook_installs_installed_playbook_id_fkey";
            columns: ["installed_playbook_id"];
            isOneToOne: false;
            referencedRelation: "ao_playbooks";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_playbook_installs_source_playbook_id_fkey";
            columns: ["source_playbook_id"];
            isOneToOne: false;
            referencedRelation: "ao_playbooks";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_playbook_installs_source_version_id_fkey";
            columns: ["source_version_id"];
            isOneToOne: false;
            referencedRelation: "ao_playbook_version_meta";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_playbook_installs_source_version_id_fkey";
            columns: ["source_version_id"];
            isOneToOne: false;
            referencedRelation: "ao_playbook_versions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_playbook_installs_target_org_id_fkey";
            columns: ["target_org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_playbook_library: {
        Row: {
          id: string;
          org_id: string;
          playbook_id: string;
          saved_at: string;
          saved_by: string;
        };
        Insert: {
          id?: string;
          org_id: string;
          playbook_id: string;
          saved_at?: string;
          saved_by: string;
        };
        Update: {
          id?: string;
          org_id?: string;
          playbook_id?: string;
          saved_at?: string;
          saved_by?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_playbook_library_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_playbook_library_playbook_id_fkey";
            columns: ["playbook_id"];
            isOneToOne: false;
            referencedRelation: "ao_playbooks";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_playbook_licenses: {
        Row: {
          expires_at: string | null;
          granted_at: string;
          granted_by: string | null;
          id: string;
          note: string | null;
          org_id: string;
          playbook_id: string;
          source: string;
          status: string;
        };
        Insert: {
          expires_at?: string | null;
          granted_at?: string;
          granted_by?: string | null;
          id?: string;
          note?: string | null;
          org_id: string;
          playbook_id: string;
          source?: string;
          status?: string;
        };
        Update: {
          expires_at?: string | null;
          granted_at?: string;
          granted_by?: string | null;
          id?: string;
          note?: string | null;
          org_id?: string;
          playbook_id?: string;
          source?: string;
          status?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_playbook_licenses_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_playbook_licenses_playbook_id_fkey";
            columns: ["playbook_id"];
            isOneToOne: false;
            referencedRelation: "ao_playbooks";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_playbook_participants: {
        Row: {
          group_run_id: string;
          id: string;
          joined_at: string;
          last_check_in: string | null;
          left_at: string | null;
          org_id: string;
          role: string;
          run_id: string | null;
          status: string;
          user_id: string;
        };
        Insert: {
          group_run_id: string;
          id?: string;
          joined_at?: string;
          last_check_in?: string | null;
          left_at?: string | null;
          org_id: string;
          role?: string;
          run_id?: string | null;
          status?: string;
          user_id: string;
        };
        Update: {
          group_run_id?: string;
          id?: string;
          joined_at?: string;
          last_check_in?: string | null;
          left_at?: string | null;
          org_id?: string;
          role?: string;
          run_id?: string | null;
          status?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_playbook_participants_group_run_id_fkey";
            columns: ["group_run_id"];
            isOneToOne: false;
            referencedRelation: "ao_playbook_runs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_playbook_participants_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_playbook_participants_run_id_fkey";
            columns: ["run_id"];
            isOneToOne: false;
            referencedRelation: "ao_playbook_runs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_playbook_reports: {
        Row: {
          category: string;
          created_at: string;
          detail: string | null;
          id: string;
          playbook_id: string;
          reporter_org_id: string | null;
          reporter_user_id: string | null;
          resolution: string | null;
          resolution_note: string | null;
          reviewed_at: string | null;
          reviewed_by: string | null;
          status: string;
          updated_at: string;
          version_id: string | null;
        };
        Insert: {
          category: string;
          created_at?: string;
          detail?: string | null;
          id?: string;
          playbook_id: string;
          reporter_org_id?: string | null;
          reporter_user_id?: string | null;
          resolution?: string | null;
          resolution_note?: string | null;
          reviewed_at?: string | null;
          reviewed_by?: string | null;
          status?: string;
          updated_at?: string;
          version_id?: string | null;
        };
        Update: {
          category?: string;
          created_at?: string;
          detail?: string | null;
          id?: string;
          playbook_id?: string;
          reporter_org_id?: string | null;
          reporter_user_id?: string | null;
          resolution?: string | null;
          resolution_note?: string | null;
          reviewed_at?: string | null;
          reviewed_by?: string | null;
          status?: string;
          updated_at?: string;
          version_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ao_playbook_reports_playbook_id_fkey";
            columns: ["playbook_id"];
            isOneToOne: false;
            referencedRelation: "ao_playbooks";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_playbook_reports_reporter_org_id_fkey";
            columns: ["reporter_org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_playbook_reports_version_id_fkey";
            columns: ["version_id"];
            isOneToOne: false;
            referencedRelation: "ao_playbook_version_meta";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_playbook_reports_version_id_fkey";
            columns: ["version_id"];
            isOneToOne: false;
            referencedRelation: "ao_playbook_versions";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_playbook_run_events: {
        Row: {
          actor: string | null;
          created_at: string;
          event_type: string;
          id: string;
          org_id: string;
          payload: Json;
          run_id: string;
          seq: number;
        };
        Insert: {
          actor?: string | null;
          created_at?: string;
          event_type: string;
          id?: string;
          org_id: string;
          payload?: Json;
          run_id: string;
          seq: number;
        };
        Update: {
          actor?: string | null;
          created_at?: string;
          event_type?: string;
          id?: string;
          org_id?: string;
          payload?: Json;
          run_id?: string;
          seq?: number;
        };
        Relationships: [
          {
            foreignKeyName: "ao_playbook_run_events_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_playbook_run_events_run_id_fkey";
            columns: ["run_id"];
            isOneToOne: false;
            referencedRelation: "ao_playbook_runs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_playbook_runs: {
        Row: {
          authority_level: string;
          cancelled_at: string | null;
          cancelled_reason: string | null;
          channel: string | null;
          channel_context: Json;
          completed_at: string | null;
          constraint_confirmed_by: string | null;
          constraint_effect: string | null;
          constraint_effect_at: string | null;
          constraint_evidence: string | null;
          constraint_id: string | null;
          current_step_key: string | null;
          group_run_id: string | null;
          halted_at: string | null;
          halted_reason: string | null;
          id: string;
          initiated_by: string;
          intervention_outcome: string | null;
          join_window_ends: string | null;
          last_activity_at: string;
          objective_id: string | null;
          org_id: string;
          outcome_status: string | null;
          outcome_summary: string | null;
          participant_cap: number | null;
          playbook_id: string;
          policy_snapshot: Json;
          position: Json;
          resume_context: string | null;
          run_kind: string;
          run_variables: Json;
          started_at: string;
          status: string;
          thread_id: string | null;
          version_id: string;
        };
        Insert: {
          authority_level?: string;
          cancelled_at?: string | null;
          cancelled_reason?: string | null;
          channel?: string | null;
          channel_context?: Json;
          completed_at?: string | null;
          constraint_confirmed_by?: string | null;
          constraint_effect?: string | null;
          constraint_effect_at?: string | null;
          constraint_evidence?: string | null;
          constraint_id?: string | null;
          current_step_key?: string | null;
          group_run_id?: string | null;
          halted_at?: string | null;
          halted_reason?: string | null;
          id?: string;
          initiated_by: string;
          intervention_outcome?: string | null;
          join_window_ends?: string | null;
          last_activity_at?: string;
          objective_id?: string | null;
          org_id: string;
          outcome_status?: string | null;
          outcome_summary?: string | null;
          participant_cap?: number | null;
          playbook_id: string;
          policy_snapshot?: Json;
          position?: Json;
          resume_context?: string | null;
          run_kind?: string;
          run_variables?: Json;
          started_at?: string;
          status?: string;
          thread_id?: string | null;
          version_id: string;
        };
        Update: {
          authority_level?: string;
          cancelled_at?: string | null;
          cancelled_reason?: string | null;
          channel?: string | null;
          channel_context?: Json;
          completed_at?: string | null;
          constraint_confirmed_by?: string | null;
          constraint_effect?: string | null;
          constraint_effect_at?: string | null;
          constraint_evidence?: string | null;
          constraint_id?: string | null;
          current_step_key?: string | null;
          group_run_id?: string | null;
          halted_at?: string | null;
          halted_reason?: string | null;
          id?: string;
          initiated_by?: string;
          intervention_outcome?: string | null;
          join_window_ends?: string | null;
          last_activity_at?: string;
          objective_id?: string | null;
          org_id?: string;
          outcome_status?: string | null;
          outcome_summary?: string | null;
          participant_cap?: number | null;
          playbook_id?: string;
          policy_snapshot?: Json;
          position?: Json;
          resume_context?: string | null;
          run_kind?: string;
          run_variables?: Json;
          started_at?: string;
          status?: string;
          thread_id?: string | null;
          version_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_playbook_runs_constraint_id_fkey";
            columns: ["constraint_id"];
            isOneToOne: false;
            referencedRelation: "ao_constraints";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_playbook_runs_group_run_id_fkey";
            columns: ["group_run_id"];
            isOneToOne: false;
            referencedRelation: "ao_playbook_runs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_playbook_runs_objective_id_fkey";
            columns: ["objective_id"];
            isOneToOne: false;
            referencedRelation: "ao_objectives";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_playbook_runs_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_playbook_runs_thread_id_fkey";
            columns: ["thread_id"];
            isOneToOne: false;
            referencedRelation: "ao_threads";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_playbook_runs_version_fk";
            columns: ["playbook_id", "version_id"];
            isOneToOne: false;
            referencedRelation: "ao_playbook_version_meta";
            referencedColumns: ["playbook_id", "id"];
          },
          {
            foreignKeyName: "ao_playbook_runs_version_fk";
            columns: ["playbook_id", "version_id"];
            isOneToOne: false;
            referencedRelation: "ao_playbook_versions";
            referencedColumns: ["playbook_id", "id"];
          },
        ];
      };
      ao_playbook_sale_events: {
        Row: {
          amount_cents: number;
          buyer_org_id: string;
          created_at: string;
          creator_share_cents: number;
          currency: string;
          event_type: string;
          id: string;
          note: string | null;
          playbook_id: string;
          sale_id: string | null;
          seller_org_id: string | null;
          stripe_event_id: string | null;
        };
        Insert: {
          amount_cents: number;
          buyer_org_id: string;
          created_at?: string;
          creator_share_cents?: number;
          currency?: string;
          event_type: string;
          id?: string;
          note?: string | null;
          playbook_id: string;
          sale_id?: string | null;
          seller_org_id?: string | null;
          stripe_event_id?: string | null;
        };
        Update: {
          amount_cents?: number;
          buyer_org_id?: string;
          created_at?: string;
          creator_share_cents?: number;
          currency?: string;
          event_type?: string;
          id?: string;
          note?: string | null;
          playbook_id?: string;
          sale_id?: string | null;
          seller_org_id?: string | null;
          stripe_event_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ao_playbook_sale_events_buyer_org_id_fkey";
            columns: ["buyer_org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_playbook_sale_events_playbook_id_fkey";
            columns: ["playbook_id"];
            isOneToOne: false;
            referencedRelation: "ao_playbooks";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_playbook_sale_events_sale_id_fkey";
            columns: ["sale_id"];
            isOneToOne: false;
            referencedRelation: "ao_playbook_sales";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_playbook_sale_events_seller_org_id_fkey";
            columns: ["seller_org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_playbook_sales: {
        Row: {
          amount_cents: number;
          buyer_org_id: string;
          buyer_user_id: string | null;
          created_at: string;
          creator_share_cents: number;
          currency: string;
          disputed_at: string | null;
          id: string;
          payout_status: string;
          platform_fee_bps: number | null;
          platform_fee_cents: number;
          playbook_id: string;
          refunded_at: string | null;
          refunded_cents: number;
          seller_org_id: string | null;
          stripe_session_id: string | null;
        };
        Insert: {
          amount_cents: number;
          buyer_org_id: string;
          buyer_user_id?: string | null;
          created_at?: string;
          creator_share_cents?: number;
          currency?: string;
          disputed_at?: string | null;
          id?: string;
          payout_status?: string;
          platform_fee_bps?: number | null;
          platform_fee_cents?: number;
          playbook_id: string;
          refunded_at?: string | null;
          refunded_cents?: number;
          seller_org_id?: string | null;
          stripe_session_id?: string | null;
        };
        Update: {
          amount_cents?: number;
          buyer_org_id?: string;
          buyer_user_id?: string | null;
          created_at?: string;
          creator_share_cents?: number;
          currency?: string;
          disputed_at?: string | null;
          id?: string;
          payout_status?: string;
          platform_fee_bps?: number | null;
          platform_fee_cents?: number;
          playbook_id?: string;
          refunded_at?: string | null;
          refunded_cents?: number;
          seller_org_id?: string | null;
          stripe_session_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ao_playbook_sales_buyer_org_id_fkey";
            columns: ["buyer_org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_playbook_sales_playbook_id_fkey";
            columns: ["playbook_id"];
            isOneToOne: false;
            referencedRelation: "ao_playbooks";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_playbook_sales_seller_org_id_fkey";
            columns: ["seller_org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_playbook_versions: {
        Row: {
          capability_manifest: Json;
          changelog: string | null;
          content_hash: string;
          created_at: string;
          created_by: string | null;
          definition: Json;
          execution_disabled_at: string | null;
          execution_disabled_by: string | null;
          execution_disabled_reason: string | null;
          id: string;
          intelligence_mode: boolean;
          playbook_id: string;
          published_at: string | null;
          risk_tier: number;
          signature: string | null;
          smoke_tested_at: string | null;
          smoke_tested_by: string | null;
          status: string;
          version_number: number;
        };
        Insert: {
          capability_manifest?: Json;
          changelog?: string | null;
          content_hash: string;
          created_at?: string;
          created_by?: string | null;
          definition: Json;
          execution_disabled_at?: string | null;
          execution_disabled_by?: string | null;
          execution_disabled_reason?: string | null;
          id?: string;
          intelligence_mode?: boolean;
          playbook_id: string;
          published_at?: string | null;
          risk_tier?: number;
          signature?: string | null;
          smoke_tested_at?: string | null;
          smoke_tested_by?: string | null;
          status?: string;
          version_number: number;
        };
        Update: {
          capability_manifest?: Json;
          changelog?: string | null;
          content_hash?: string;
          created_at?: string;
          created_by?: string | null;
          definition?: Json;
          execution_disabled_at?: string | null;
          execution_disabled_by?: string | null;
          execution_disabled_reason?: string | null;
          id?: string;
          intelligence_mode?: boolean;
          playbook_id?: string;
          published_at?: string | null;
          risk_tier?: number;
          signature?: string | null;
          smoke_tested_at?: string | null;
          smoke_tested_by?: string | null;
          status?: string;
          version_number?: number;
        };
        Relationships: [
          {
            foreignKeyName: "ao_playbook_versions_playbook_id_fkey";
            columns: ["playbook_id"];
            isOneToOne: false;
            referencedRelation: "ao_playbooks";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_playbook_workspace_templates: {
        Row: {
          created_at: string;
          created_by: string;
          description: string | null;
          id: string;
          name: string;
          org_id: string;
          source_playbook_id: string | null;
          template_json: Json;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          created_by: string;
          description?: string | null;
          id?: string;
          name: string;
          org_id: string;
          source_playbook_id?: string | null;
          template_json: Json;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          created_by?: string;
          description?: string | null;
          id?: string;
          name?: string;
          org_id?: string;
          source_playbook_id?: string | null;
          template_json?: Json;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_playbook_workspace_templates_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_playbook_workspace_templates_source_playbook_id_fkey";
            columns: ["source_playbook_id"];
            isOneToOne: false;
            referencedRelation: "ao_playbooks";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_playbooks: {
        Row: {
          created_at: string;
          created_by: string | null;
          creator_display_name: string | null;
          creator_verified: boolean;
          creator_verified_at: string | null;
          current_version_id: string | null;
          description: string | null;
          forked_from_playbook_id: string | null;
          forked_from_version_id: string | null;
          id: string;
          listed_at: string | null;
          name: string;
          owner_kind: string;
          owner_org_id: string | null;
          price_cents: number | null;
          price_currency: string;
          status: string;
          summary: string | null;
          tags: string[] | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          creator_display_name?: string | null;
          creator_verified?: boolean;
          creator_verified_at?: string | null;
          current_version_id?: string | null;
          description?: string | null;
          forked_from_playbook_id?: string | null;
          forked_from_version_id?: string | null;
          id?: string;
          listed_at?: string | null;
          name: string;
          owner_kind: string;
          owner_org_id?: string | null;
          price_cents?: number | null;
          price_currency?: string;
          status?: string;
          summary?: string | null;
          tags?: string[] | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          creator_display_name?: string | null;
          creator_verified?: boolean;
          creator_verified_at?: string | null;
          current_version_id?: string | null;
          description?: string | null;
          forked_from_playbook_id?: string | null;
          forked_from_version_id?: string | null;
          id?: string;
          listed_at?: string | null;
          name?: string;
          owner_kind?: string;
          owner_org_id?: string | null;
          price_cents?: number | null;
          price_currency?: string;
          status?: string;
          summary?: string | null;
          tags?: string[] | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_playbooks_current_version_fk";
            columns: ["current_version_id"];
            isOneToOne: false;
            referencedRelation: "ao_playbook_version_meta";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_playbooks_current_version_fk";
            columns: ["current_version_id"];
            isOneToOne: false;
            referencedRelation: "ao_playbook_versions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_playbooks_forked_from_playbook_id_fkey";
            columns: ["forked_from_playbook_id"];
            isOneToOne: false;
            referencedRelation: "ao_playbooks";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_playbooks_forked_from_version_id_fkey";
            columns: ["forked_from_version_id"];
            isOneToOne: false;
            referencedRelation: "ao_playbook_version_meta";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_playbooks_forked_from_version_id_fkey";
            columns: ["forked_from_version_id"];
            isOneToOne: false;
            referencedRelation: "ao_playbook_versions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_playbooks_owner_org_id_fkey";
            columns: ["owner_org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_pricing_approvals: {
        Row: {
          after_value: Json;
          before_value: Json | null;
          created_at: string;
          entity_id: string;
          entity_type: string;
          id: string;
          published_at: string | null;
          reason: string | null;
          requested_at: string;
          requested_by: string;
          review_note: string | null;
          reviewed_at: string | null;
          reviewed_by: string | null;
          status: string;
        };
        Insert: {
          after_value?: Json;
          before_value?: Json | null;
          created_at?: string;
          entity_id: string;
          entity_type: string;
          id?: string;
          published_at?: string | null;
          reason?: string | null;
          requested_at?: string;
          requested_by: string;
          review_note?: string | null;
          reviewed_at?: string | null;
          reviewed_by?: string | null;
          status?: string;
        };
        Update: {
          after_value?: Json;
          before_value?: Json | null;
          created_at?: string;
          entity_id?: string;
          entity_type?: string;
          id?: string;
          published_at?: string | null;
          reason?: string | null;
          requested_at?: string;
          requested_by?: string;
          review_note?: string | null;
          reviewed_at?: string | null;
          reviewed_by?: string | null;
          status?: string;
        };
        Relationships: [];
      };
      ao_pricing_global_settings: {
        Row: {
          billing_precision_micro_credits: number;
          cost_buffer_percent: number;
          default_auto_eligible: boolean;
          default_markup_multiplier: number;
          default_markup_percent: number;
          default_maximum_charge_credits: number | null;
          default_minimum_charge_credits: number;
          dual_approval_markup_threshold: number;
          dual_approval_required: boolean;
          emergency_pricing_enabled: boolean;
          expensive_task_threshold_credits: number;
          id: boolean;
          low_balance_threshold_credits: number;
          one_credits_per_usd: number;
          pricing_version: number;
          provider_cost_fallback_behavior: string;
          published_at: string;
          rounding_method: Database["public"]["Enums"]["ao_rounding_method"];
          updated_at: string;
        };
        Insert: {
          billing_precision_micro_credits?: number;
          cost_buffer_percent?: number;
          default_auto_eligible?: boolean;
          default_markup_multiplier?: number;
          default_markup_percent?: number;
          default_maximum_charge_credits?: number | null;
          default_minimum_charge_credits?: number;
          dual_approval_markup_threshold?: number;
          dual_approval_required?: boolean;
          emergency_pricing_enabled?: boolean;
          expensive_task_threshold_credits?: number;
          id?: boolean;
          low_balance_threshold_credits?: number;
          one_credits_per_usd?: number;
          pricing_version?: number;
          provider_cost_fallback_behavior?: string;
          published_at?: string;
          rounding_method?: Database["public"]["Enums"]["ao_rounding_method"];
          updated_at?: string;
        };
        Update: {
          billing_precision_micro_credits?: number;
          cost_buffer_percent?: number;
          default_auto_eligible?: boolean;
          default_markup_multiplier?: number;
          default_markup_percent?: number;
          default_maximum_charge_credits?: number | null;
          default_minimum_charge_credits?: number;
          dual_approval_markup_threshold?: number;
          dual_approval_required?: boolean;
          emergency_pricing_enabled?: boolean;
          expensive_task_threshold_credits?: number;
          id?: boolean;
          low_balance_threshold_credits?: number;
          one_credits_per_usd?: number;
          pricing_version?: number;
          provider_cost_fallback_behavior?: string;
          published_at?: string;
          rounding_method?: Database["public"]["Enums"]["ao_rounding_method"];
          updated_at?: string;
        };
        Relationships: [];
      };
      ao_pricing_rules: {
        Row: {
          created_at: string;
          created_by: string | null;
          description: string | null;
          effective_from: string;
          effective_until: string | null;
          fixed_credits: number | null;
          fixed_micro_usd: number | null;
          id: string;
          markup_method: Database["public"]["Enums"]["ao_markup_method"] | null;
          markup_multiplier: number | null;
          markup_percent: number | null;
          maximum_charge_credits: number | null;
          minimum_charge_credits: number | null;
          name: string | null;
          org_id: string | null;
          pass_through: boolean;
          precedence: number;
          pricing_version: number;
          published_at: string | null;
          published_by: string | null;
          rule_type: Database["public"]["Enums"]["ao_pricing_rule_type"];
          status: Database["public"]["Enums"]["ao_pricing_rule_status"];
          target_key: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          effective_from?: string;
          effective_until?: string | null;
          fixed_credits?: number | null;
          fixed_micro_usd?: number | null;
          id?: string;
          markup_method?: Database["public"]["Enums"]["ao_markup_method"] | null;
          markup_multiplier?: number | null;
          markup_percent?: number | null;
          maximum_charge_credits?: number | null;
          minimum_charge_credits?: number | null;
          name?: string | null;
          org_id?: string | null;
          pass_through?: boolean;
          precedence?: number;
          pricing_version?: number;
          published_at?: string | null;
          published_by?: string | null;
          rule_type: Database["public"]["Enums"]["ao_pricing_rule_type"];
          status?: Database["public"]["Enums"]["ao_pricing_rule_status"];
          target_key?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          effective_from?: string;
          effective_until?: string | null;
          fixed_credits?: number | null;
          fixed_micro_usd?: number | null;
          id?: string;
          markup_method?: Database["public"]["Enums"]["ao_markup_method"] | null;
          markup_multiplier?: number | null;
          markup_percent?: number | null;
          maximum_charge_credits?: number | null;
          minimum_charge_credits?: number | null;
          name?: string | null;
          org_id?: string | null;
          pass_through?: boolean;
          precedence?: number;
          pricing_version?: number;
          published_at?: string | null;
          published_by?: string | null;
          rule_type?: Database["public"]["Enums"]["ao_pricing_rule_type"];
          status?: Database["public"]["Enums"]["ao_pricing_rule_status"];
          target_key?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_pricing_rules_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          display_name: string | null;
          location_label: string | null;
          timezone: string | null;
          timezone_source: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          display_name?: string | null;
          location_label?: string | null;
          timezone?: string | null;
          timezone_source?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          display_name?: string | null;
          location_label?: string | null;
          timezone?: string | null;
          timezone_source?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      ao_project_milestones: {
        Row: {
          achieved_at: string | null;
          created_at: string;
          created_by: string | null;
          dedupe_key: string | null;
          description: string | null;
          due_at: string | null;
          id: string;
          org_id: string;
          project_id: string;
          sort_order: number;
          source_playbook_run_id: string | null;
          status: Database["public"]["Enums"]["ao_milestone_status"];
          success_criteria: string | null;
          title: string;
          updated_at: string;
        };
        Insert: {
          achieved_at?: string | null;
          created_at?: string;
          created_by?: string | null;
          dedupe_key?: string | null;
          description?: string | null;
          due_at?: string | null;
          id?: string;
          org_id: string;
          project_id: string;
          sort_order?: number;
          source_playbook_run_id?: string | null;
          status?: Database["public"]["Enums"]["ao_milestone_status"];
          success_criteria?: string | null;
          title: string;
          updated_at?: string;
        };
        Update: {
          achieved_at?: string | null;
          created_at?: string;
          created_by?: string | null;
          dedupe_key?: string | null;
          description?: string | null;
          due_at?: string | null;
          id?: string;
          org_id?: string;
          project_id?: string;
          sort_order?: number;
          source_playbook_run_id?: string | null;
          status?: Database["public"]["Enums"]["ao_milestone_status"];
          success_criteria?: string | null;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_project_milestones_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_project_milestones_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_project_milestones_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "ao_intel_projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_project_milestones_source_playbook_run_id_fkey";
            columns: ["source_playbook_run_id"];
            isOneToOne: false;
            referencedRelation: "ao_playbook_runs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_prompt_queue: {
        Row: {
          auto_route: boolean;
          completed_at: string | null;
          content: string;
          created_at: string;
          created_by: string | null;
          debate: boolean;
          error: string | null;
          id: string;
          model: string | null;
          org_id: string;
          position: number;
          started_at: string | null;
          status: string;
          thread_id: string;
        };
        Insert: {
          auto_route?: boolean;
          completed_at?: string | null;
          content: string;
          created_at?: string;
          created_by?: string | null;
          debate?: boolean;
          error?: string | null;
          id?: string;
          model?: string | null;
          org_id: string;
          position?: number;
          started_at?: string | null;
          status?: string;
          thread_id: string;
        };
        Update: {
          auto_route?: boolean;
          completed_at?: string | null;
          content?: string;
          created_at?: string;
          created_by?: string | null;
          debate?: boolean;
          error?: string | null;
          id?: string;
          model?: string | null;
          org_id?: string;
          position?: number;
          started_at?: string | null;
          status?: string;
          thread_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_prompt_queue_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_prompt_queue_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_prompt_queue_thread_id_fkey";
            columns: ["thread_id"];
            isOneToOne: false;
            referencedRelation: "ao_threads";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_provider_invoices: {
        Row: {
          billed_amount_micro_usd: number;
          calculated_cost_micro_usd: number;
          created_at: string;
          currency: string;
          id: string;
          imported_by: string | null;
          invoice_external_id: string | null;
          line_items: Json;
          notes: string | null;
          period_end: string;
          period_start: string;
          provider_slug: string;
          status: string;
          updated_at: string;
          variance_micro_usd: number;
          variance_percent: number | null;
        };
        Insert: {
          billed_amount_micro_usd?: number;
          calculated_cost_micro_usd?: number;
          created_at?: string;
          currency?: string;
          id?: string;
          imported_by?: string | null;
          invoice_external_id?: string | null;
          line_items?: Json;
          notes?: string | null;
          period_end: string;
          period_start: string;
          provider_slug: string;
          status?: string;
          updated_at?: string;
          variance_micro_usd?: number;
          variance_percent?: number | null;
        };
        Update: {
          billed_amount_micro_usd?: number;
          calculated_cost_micro_usd?: number;
          created_at?: string;
          currency?: string;
          id?: string;
          imported_by?: string | null;
          invoice_external_id?: string | null;
          line_items?: Json;
          notes?: string | null;
          period_end?: string;
          period_start?: string;
          provider_slug?: string;
          status?: string;
          updated_at?: string;
          variance_micro_usd?: number;
          variance_percent?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "ao_provider_invoices_provider_slug_fkey";
            columns: ["provider_slug"];
            isOneToOne: false;
            referencedRelation: "ao_ai_providers";
            referencedColumns: ["slug"];
          },
        ];
      };
      ao_relationships: {
        Row: {
          circle: Database["public"]["Enums"]["ao_relationship_circle"];
          created_at: string;
          created_by: string | null;
          display_name: string;
          entity_id: string | null;
          entity_type: string;
          id: string;
          metadata: Json;
          notes: string | null;
          org_id: string;
          role_in_bond: string | null;
          state: Database["public"]["Enums"]["ao_relationship_state"];
          updated_at: string;
        };
        Insert: {
          circle?: Database["public"]["Enums"]["ao_relationship_circle"];
          created_at?: string;
          created_by?: string | null;
          display_name: string;
          entity_id?: string | null;
          entity_type?: string;
          id?: string;
          metadata?: Json;
          notes?: string | null;
          org_id: string;
          role_in_bond?: string | null;
          state?: Database["public"]["Enums"]["ao_relationship_state"];
          updated_at?: string;
        };
        Update: {
          circle?: Database["public"]["Enums"]["ao_relationship_circle"];
          created_at?: string;
          created_by?: string | null;
          display_name?: string;
          entity_id?: string | null;
          entity_type?: string;
          id?: string;
          metadata?: Json;
          notes?: string | null;
          org_id?: string;
          role_in_bond?: string | null;
          state?: Database["public"]["Enums"]["ao_relationship_state"];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_relationships_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_relationships_entity_id_fkey";
            columns: ["entity_id"];
            isOneToOne: false;
            referencedRelation: "ao_entities";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_relationships_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_report_packs: {
        Row: {
          created_at: string;
          created_by: string | null;
          description: string | null;
          id: string;
          name: string;
          org_id: string;
          template_pack_id: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          id?: string;
          name: string;
          org_id: string;
          template_pack_id?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          id?: string;
          name?: string;
          org_id?: string;
          template_pack_id?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_report_packs_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_report_packs_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_report_packs_template_pack_id_fkey";
            columns: ["template_pack_id"];
            isOneToOne: false;
            referencedRelation: "ao_templates";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_revenue_orchestrator_config: {
        Row: {
          contact_sla_hours: number;
          conversion_rates: Json;
          created_at: string;
          employee_mappings: Json;
          enabled: boolean;
          id: string;
          org_id: string;
          thresholds: Json;
          updated_at: string;
        };
        Insert: {
          contact_sla_hours?: number;
          conversion_rates?: Json;
          created_at?: string;
          employee_mappings?: Json;
          enabled?: boolean;
          id?: string;
          org_id: string;
          thresholds?: Json;
          updated_at?: string;
        };
        Update: {
          contact_sla_hours?: number;
          conversion_rates?: Json;
          created_at?: string;
          employee_mappings?: Json;
          enabled?: boolean;
          id?: string;
          org_id?: string;
          thresholds?: Json;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_revenue_orchestrator_config_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: true;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_roadmap_boards: {
        Row: {
          active: boolean;
          created_at: string;
          description: string | null;
          id: string;
          name: string;
          slug: string;
          sort_order: number;
        };
        Insert: {
          active?: boolean;
          created_at?: string;
          description?: string | null;
          id?: string;
          name: string;
          slug: string;
          sort_order?: number;
        };
        Update: {
          active?: boolean;
          created_at?: string;
          description?: string | null;
          id?: string;
          name?: string;
          slug?: string;
          sort_order?: number;
        };
        Relationships: [];
      };
      ao_routing_config: {
        Row: {
          config_version: number;
          default_fallback_chain: string[];
          escalation_on_tool_failure: boolean;
          escalation_on_validation_failure: boolean;
          id: boolean;
          max_escalations: number;
          min_quality_floor: number;
          updated_at: string;
          weight_cost: number;
          weight_quality: number;
          weight_reliability: number;
          weight_risk: number;
          weight_speed: number;
        };
        Insert: {
          config_version?: number;
          default_fallback_chain?: string[];
          escalation_on_tool_failure?: boolean;
          escalation_on_validation_failure?: boolean;
          id?: boolean;
          max_escalations?: number;
          min_quality_floor?: number;
          updated_at?: string;
          weight_cost?: number;
          weight_quality?: number;
          weight_reliability?: number;
          weight_risk?: number;
          weight_speed?: number;
        };
        Update: {
          config_version?: number;
          default_fallback_chain?: string[];
          escalation_on_tool_failure?: boolean;
          escalation_on_validation_failure?: boolean;
          id?: boolean;
          max_escalations?: number;
          min_quality_floor?: number;
          updated_at?: string;
          weight_cost?: number;
          weight_quality?: number;
          weight_reliability?: number;
          weight_risk?: number;
          weight_speed?: number;
        };
        Relationships: [];
      };
      ao_routing_experiments: {
        Row: {
          control_weights: Json;
          created_at: string;
          created_by: string | null;
          description: string | null;
          ended_at: string | null;
          id: string;
          name: string;
          started_at: string | null;
          status: string;
          traffic_percent: number;
          treatment_weights: Json;
          updated_at: string;
        };
        Insert: {
          control_weights?: Json;
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          ended_at?: string | null;
          id?: string;
          name: string;
          started_at?: string | null;
          status?: string;
          traffic_percent?: number;
          treatment_weights?: Json;
          updated_at?: string;
        };
        Update: {
          control_weights?: Json;
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          ended_at?: string | null;
          id?: string;
          name?: string;
          started_at?: string | null;
          status?: string;
          traffic_percent?: number;
          treatment_weights?: Json;
          updated_at?: string;
        };
        Relationships: [];
      };
      ao_routing_outcomes: {
        Row: {
          created_at: string;
          credits_charged: number;
          escalated: boolean;
          experiment_id: string | null;
          id: string;
          latency_ms: number | null;
          metadata: Json;
          model_id: string | null;
          org_id: string | null;
          provider_cost_micro_usd: number;
          retry_count: number;
          success: boolean | null;
          task_category: string | null;
          usage_event_id: string | null;
          user_accepted: boolean | null;
          variant: string;
        };
        Insert: {
          created_at?: string;
          credits_charged?: number;
          escalated?: boolean;
          experiment_id?: string | null;
          id?: string;
          latency_ms?: number | null;
          metadata?: Json;
          model_id?: string | null;
          org_id?: string | null;
          provider_cost_micro_usd?: number;
          retry_count?: number;
          success?: boolean | null;
          task_category?: string | null;
          usage_event_id?: string | null;
          user_accepted?: boolean | null;
          variant?: string;
        };
        Update: {
          created_at?: string;
          credits_charged?: number;
          escalated?: boolean;
          experiment_id?: string | null;
          id?: string;
          latency_ms?: number | null;
          metadata?: Json;
          model_id?: string | null;
          org_id?: string | null;
          provider_cost_micro_usd?: number;
          retry_count?: number;
          success?: boolean | null;
          task_category?: string | null;
          usage_event_id?: string | null;
          user_accepted?: boolean | null;
          variant?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_routing_outcomes_experiment_id_fkey";
            columns: ["experiment_id"];
            isOneToOne: false;
            referencedRelation: "ao_routing_experiments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_routing_outcomes_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_routing_outcomes_usage_event_id_fkey";
            columns: ["usage_event_id"];
            isOneToOne: false;
            referencedRelation: "ao_usage_events";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_sandbox_runs: {
        Row: {
          artifact_id: string | null;
          created_at: string;
          created_by: string | null;
          duration_ms: number | null;
          exit_code: number | null;
          id: string;
          language: string;
          org_id: string;
          runtime: string;
          stderr: string | null;
          stdout: string | null;
          thread_id: string | null;
        };
        Insert: {
          artifact_id?: string | null;
          created_at?: string;
          created_by?: string | null;
          duration_ms?: number | null;
          exit_code?: number | null;
          id?: string;
          language: string;
          org_id: string;
          runtime: string;
          stderr?: string | null;
          stdout?: string | null;
          thread_id?: string | null;
        };
        Update: {
          artifact_id?: string | null;
          created_at?: string;
          created_by?: string | null;
          duration_ms?: number | null;
          exit_code?: number | null;
          id?: string;
          language?: string;
          org_id?: string;
          runtime?: string;
          stderr?: string | null;
          stdout?: string | null;
          thread_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ao_sandbox_runs_artifact_id_fkey";
            columns: ["artifact_id"];
            isOneToOne: false;
            referencedRelation: "ao_artifacts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_sandbox_runs_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_sandbox_runs_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_sandbox_runs_thread_id_fkey";
            columns: ["thread_id"];
            isOneToOne: false;
            referencedRelation: "ao_threads";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_skill_contributions: {
        Row: {
          consent: string;
          contributed_by: string;
          created_at: string;
          id: string;
          org_id: string;
          redaction_report: Json;
          sanitized_ir: Json;
          skill_id: string;
          status: string;
        };
        Insert: {
          consent: string;
          contributed_by: string;
          created_at?: string;
          id?: string;
          org_id: string;
          redaction_report?: Json;
          sanitized_ir: Json;
          skill_id: string;
          status?: string;
        };
        Update: {
          consent?: string;
          contributed_by?: string;
          created_at?: string;
          id?: string;
          org_id?: string;
          redaction_report?: Json;
          sanitized_ir?: Json;
          skill_id?: string;
          status?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_skill_contributions_contributed_by_fkey";
            columns: ["contributed_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_skill_contributions_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_skill_contributions_skill_id_fkey";
            columns: ["skill_id"];
            isOneToOne: false;
            referencedRelation: "ao_skills";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_skill_recordings: {
        Row: {
          browser_run_id: string | null;
          compiled_skill_id: string | null;
          created_at: string;
          created_by: string;
          events: Json;
          id: string;
          mode: string;
          narration: Json;
          org_id: string;
          portal: string | null;
          status: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          browser_run_id?: string | null;
          compiled_skill_id?: string | null;
          created_at?: string;
          created_by: string;
          events?: Json;
          id?: string;
          mode?: string;
          narration?: Json;
          org_id: string;
          portal?: string | null;
          status?: string;
          title: string;
          updated_at?: string;
        };
        Update: {
          browser_run_id?: string | null;
          compiled_skill_id?: string | null;
          created_at?: string;
          created_by?: string;
          events?: Json;
          id?: string;
          mode?: string;
          narration?: Json;
          org_id?: string;
          portal?: string | null;
          status?: string;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_skill_recordings_browser_run_id_fkey";
            columns: ["browser_run_id"];
            isOneToOne: false;
            referencedRelation: "ao_browser_runs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_skill_recordings_compiled_skill_id_fkey";
            columns: ["compiled_skill_id"];
            isOneToOne: false;
            referencedRelation: "ao_skills";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_skill_recordings_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_skill_recordings_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_skill_runs: {
        Row: {
          access_level_used: string[];
          browser_run_id: string | null;
          confidence: string | null;
          created_at: string;
          credential_refs: string[];
          current_node_id: string | null;
          ended_at: string | null;
          error: string | null;
          human_interventions: number;
          id: string;
          inbox_item_id: string | null;
          initiated_by: string;
          inputs: Json;
          org_id: string;
          outputs: Json | null;
          queue_message_id: string | null;
          skill_id: string;
          skill_version: number;
          started_at: string | null;
          status: string;
          updated_at: string;
        };
        Insert: {
          access_level_used?: string[];
          browser_run_id?: string | null;
          confidence?: string | null;
          created_at?: string;
          credential_refs?: string[];
          current_node_id?: string | null;
          ended_at?: string | null;
          error?: string | null;
          human_interventions?: number;
          id?: string;
          inbox_item_id?: string | null;
          initiated_by: string;
          inputs?: Json;
          org_id: string;
          outputs?: Json | null;
          queue_message_id?: string | null;
          skill_id: string;
          skill_version?: number;
          started_at?: string | null;
          status?: string;
          updated_at?: string;
        };
        Update: {
          access_level_used?: string[];
          browser_run_id?: string | null;
          confidence?: string | null;
          created_at?: string;
          credential_refs?: string[];
          current_node_id?: string | null;
          ended_at?: string | null;
          error?: string | null;
          human_interventions?: number;
          id?: string;
          inbox_item_id?: string | null;
          initiated_by?: string;
          inputs?: Json;
          org_id?: string;
          outputs?: Json | null;
          queue_message_id?: string | null;
          skill_id?: string;
          skill_version?: number;
          started_at?: string | null;
          status?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_skill_runs_browser_run_id_fkey";
            columns: ["browser_run_id"];
            isOneToOne: false;
            referencedRelation: "ao_browser_runs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_skill_runs_inbox_item_id_fkey";
            columns: ["inbox_item_id"];
            isOneToOne: false;
            referencedRelation: "ao_inbox_items";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_skill_runs_initiated_by_fkey";
            columns: ["initiated_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_skill_runs_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_skill_runs_skill_id_fkey";
            columns: ["skill_id"];
            isOneToOne: false;
            referencedRelation: "ao_skills";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_skill_versions: {
        Row: {
          changelog: string | null;
          created_at: string;
          created_by: string | null;
          id: string;
          ir_json: Json;
          org_id: string;
          skill_id: string;
          version_number: number;
        };
        Insert: {
          changelog?: string | null;
          created_at?: string;
          created_by?: string | null;
          id?: string;
          ir_json: Json;
          org_id: string;
          skill_id: string;
          version_number: number;
        };
        Update: {
          changelog?: string | null;
          created_at?: string;
          created_by?: string | null;
          id?: string;
          ir_json?: Json;
          org_id?: string;
          skill_id?: string;
          version_number?: number;
        };
        Relationships: [
          {
            foreignKeyName: "ao_skill_versions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_skill_versions_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_skill_versions_skill_id_fkey";
            columns: ["skill_id"];
            isOneToOne: false;
            referencedRelation: "ao_skills";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_skills: {
        Row: {
          content: string;
          created_at: string;
          created_by: string | null;
          description: string | null;
          enabled: boolean;
          id: string;
          ir_json: Json | null;
          kind: string;
          name: string;
          org_id: string;
          pattern_key: string | null;
          portal: string | null;
          skill_status: string;
          source: string;
          status: string;
          successful_run_count: number;
          supervised_run_count: number;
          trigger_config: Json;
          updated_at: string;
          version: number;
          visibility: string;
        };
        Insert: {
          content?: string;
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          enabled?: boolean;
          id?: string;
          ir_json?: Json | null;
          kind?: string;
          name: string;
          org_id: string;
          pattern_key?: string | null;
          portal?: string | null;
          skill_status?: string;
          source?: string;
          status?: string;
          successful_run_count?: number;
          supervised_run_count?: number;
          trigger_config?: Json;
          updated_at?: string;
          version?: number;
          visibility?: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          enabled?: boolean;
          id?: string;
          ir_json?: Json | null;
          kind?: string;
          name?: string;
          org_id?: string;
          pattern_key?: string | null;
          portal?: string | null;
          skill_status?: string;
          source?: string;
          status?: string;
          successful_run_count?: number;
          supervised_run_count?: number;
          trigger_config?: Json;
          updated_at?: string;
          version?: number;
          visibility?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_skills_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_skills_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_slack_user_links: {
        Row: {
          created_at: string;
          id: string;
          org_id: string;
          slack_email: string | null;
          slack_team_id: string;
          slack_user_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          org_id: string;
          slack_email?: string | null;
          slack_team_id: string;
          slack_user_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          org_id?: string;
          slack_email?: string | null;
          slack_team_id?: string;
          slack_user_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_slack_user_links_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_slack_user_links_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_slack_workspaces: {
        Row: {
          bot_user_id: string | null;
          config: Json;
          created_at: string;
          id: string;
          installed_by: string | null;
          org_id: string;
          slack_team_id: string;
          status: string;
          team_name: string | null;
          updated_at: string;
        };
        Insert: {
          bot_user_id?: string | null;
          config?: Json;
          created_at?: string;
          id?: string;
          installed_by?: string | null;
          org_id: string;
          slack_team_id: string;
          status?: string;
          team_name?: string | null;
          updated_at?: string;
        };
        Update: {
          bot_user_id?: string | null;
          config?: Json;
          created_at?: string;
          id?: string;
          installed_by?: string | null;
          org_id?: string;
          slack_team_id?: string;
          status?: string;
          team_name?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_slack_workspaces_installed_by_fkey";
            columns: ["installed_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_slack_workspaces_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_space_deployments: {
        Row: {
          created_at: string;
          created_by: string | null;
          external_id: string | null;
          id: string;
          org_id: string;
          provider: Database["public"]["Enums"]["ao_space_deploy_provider"];
          space_id: string;
          status: Database["public"]["Enums"]["ao_space_deploy_status"];
          url: string | null;
          version_id: string;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          external_id?: string | null;
          id?: string;
          org_id: string;
          provider?: Database["public"]["Enums"]["ao_space_deploy_provider"];
          space_id: string;
          status?: Database["public"]["Enums"]["ao_space_deploy_status"];
          url?: string | null;
          version_id: string;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          external_id?: string | null;
          id?: string;
          org_id?: string;
          provider?: Database["public"]["Enums"]["ao_space_deploy_provider"];
          space_id?: string;
          status?: Database["public"]["Enums"]["ao_space_deploy_status"];
          url?: string | null;
          version_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_space_deployments_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_space_deployments_space_id_fkey";
            columns: ["space_id"];
            isOneToOne: false;
            referencedRelation: "ao_spaces";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_space_deployments_version_id_fkey";
            columns: ["version_id"];
            isOneToOne: false;
            referencedRelation: "ao_space_versions";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_space_files: {
        Row: {
          content: string | null;
          content_type: string;
          id: string;
          org_id: string;
          path: string;
          space_id: string;
          storage_key: string | null;
          updated_at: string;
        };
        Insert: {
          content?: string | null;
          content_type?: string;
          id?: string;
          org_id: string;
          path: string;
          space_id: string;
          storage_key?: string | null;
          updated_at?: string;
        };
        Update: {
          content?: string | null;
          content_type?: string;
          id?: string;
          org_id?: string;
          path?: string;
          space_id?: string;
          storage_key?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_space_files_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_space_files_space_id_fkey";
            columns: ["space_id"];
            isOneToOne: false;
            referencedRelation: "ao_spaces";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_space_shares: {
        Row: {
          created_at: string;
          created_by: string | null;
          expires_at: string | null;
          id: string;
          org_id: string;
          space_id: string;
          token: string;
          version_id: string | null;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          expires_at?: string | null;
          id?: string;
          org_id: string;
          space_id: string;
          token?: string;
          version_id?: string | null;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          expires_at?: string | null;
          id?: string;
          org_id?: string;
          space_id?: string;
          token?: string;
          version_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ao_space_shares_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_space_shares_space_id_fkey";
            columns: ["space_id"];
            isOneToOne: false;
            referencedRelation: "ao_spaces";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_space_shares_version_id_fkey";
            columns: ["version_id"];
            isOneToOne: false;
            referencedRelation: "ao_space_versions";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_space_versions: {
        Row: {
          created_at: string;
          created_by: string | null;
          id: string;
          manifest: Json;
          message: string | null;
          org_id: string;
          space_id: string;
          version_number: number;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          id?: string;
          manifest?: Json;
          message?: string | null;
          org_id: string;
          space_id: string;
          version_number: number;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          id?: string;
          manifest?: Json;
          message?: string | null;
          org_id?: string;
          space_id?: string;
          version_number?: number;
        };
        Relationships: [
          {
            foreignKeyName: "ao_space_versions_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_space_versions_space_id_fkey";
            columns: ["space_id"];
            isOneToOne: false;
            referencedRelation: "ao_spaces";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_spaces: {
        Row: {
          created_at: string;
          created_by: string | null;
          entry_path: string;
          id: string;
          org_id: string;
          preview_mode: Database["public"]["Enums"]["ao_space_preview_mode"];
          public_slug: string | null;
          published_version_id: string | null;
          slug: string;
          status: Database["public"]["Enums"]["ao_space_status"];
          thread_id: string | null;
          title: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          entry_path?: string;
          id?: string;
          org_id: string;
          preview_mode?: Database["public"]["Enums"]["ao_space_preview_mode"];
          public_slug?: string | null;
          published_version_id?: string | null;
          slug: string;
          status?: Database["public"]["Enums"]["ao_space_status"];
          thread_id?: string | null;
          title: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          entry_path?: string;
          id?: string;
          org_id?: string;
          preview_mode?: Database["public"]["Enums"]["ao_space_preview_mode"];
          public_slug?: string | null;
          published_version_id?: string | null;
          slug?: string;
          status?: Database["public"]["Enums"]["ao_space_status"];
          thread_id?: string | null;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_spaces_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_spaces_published_version_id_fkey";
            columns: ["published_version_id"];
            isOneToOne: false;
            referencedRelation: "ao_space_versions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_spaces_thread_id_fkey";
            columns: ["thread_id"];
            isOneToOne: false;
            referencedRelation: "ao_threads";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_teams_tenants: {
        Row: {
          config: Json;
          created_at: string;
          id: string;
          installed_by: string | null;
          org_id: string;
          service_url: string | null;
          status: string;
          team_name: string | null;
          teams_tenant_id: string;
          updated_at: string;
        };
        Insert: {
          config?: Json;
          created_at?: string;
          id?: string;
          installed_by?: string | null;
          org_id: string;
          service_url?: string | null;
          status?: string;
          team_name?: string | null;
          teams_tenant_id: string;
          updated_at?: string;
        };
        Update: {
          config?: Json;
          created_at?: string;
          id?: string;
          installed_by?: string | null;
          org_id?: string;
          service_url?: string | null;
          status?: string;
          team_name?: string | null;
          teams_tenant_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_teams_tenants_installed_by_fkey";
            columns: ["installed_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_teams_tenants_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_teams_user_links: {
        Row: {
          created_at: string;
          id: string;
          org_id: string;
          teams_email: string | null;
          teams_tenant_id: string;
          teams_user_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          org_id: string;
          teams_email?: string | null;
          teams_tenant_id: string;
          teams_user_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          org_id?: string;
          teams_email?: string | null;
          teams_tenant_id?: string;
          teams_user_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_teams_user_links_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_teams_user_links_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_template_pack_items: {
        Row: {
          child_template_id: string;
          child_version_id: string | null;
          created_at: string;
          id: string;
          label: string | null;
          pack_template_id: string;
          pack_version_id: string;
          sort_order: number;
        };
        Insert: {
          child_template_id: string;
          child_version_id?: string | null;
          created_at?: string;
          id?: string;
          label?: string | null;
          pack_template_id: string;
          pack_version_id: string;
          sort_order?: number;
        };
        Update: {
          child_template_id?: string;
          child_version_id?: string | null;
          created_at?: string;
          id?: string;
          label?: string | null;
          pack_template_id?: string;
          pack_version_id?: string;
          sort_order?: number;
        };
        Relationships: [
          {
            foreignKeyName: "ao_template_pack_items_child_template_id_fkey";
            columns: ["child_template_id"];
            isOneToOne: false;
            referencedRelation: "ao_templates";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_template_pack_items_child_version_id_fkey";
            columns: ["child_version_id"];
            isOneToOne: false;
            referencedRelation: "ao_template_versions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_template_pack_items_pack_template_id_fkey";
            columns: ["pack_template_id"];
            isOneToOne: false;
            referencedRelation: "ao_templates";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_template_pack_items_pack_version_id_fkey";
            columns: ["pack_version_id"];
            isOneToOne: false;
            referencedRelation: "ao_template_versions";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_template_versions: {
        Row: {
          changelog: string | null;
          created_at: string;
          created_by: string | null;
          definition: Json;
          id: string;
          template_id: string;
          version_number: number;
        };
        Insert: {
          changelog?: string | null;
          created_at?: string;
          created_by?: string | null;
          definition?: Json;
          id?: string;
          template_id: string;
          version_number: number;
        };
        Update: {
          changelog?: string | null;
          created_at?: string;
          created_by?: string | null;
          definition?: Json;
          id?: string;
          template_id?: string;
          version_number?: number;
        };
        Relationships: [
          {
            foreignKeyName: "ao_template_versions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_template_versions_template_id_fkey";
            columns: ["template_id"];
            isOneToOne: false;
            referencedRelation: "ao_templates";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_templates: {
        Row: {
          category: string | null;
          created_at: string;
          created_by: string | null;
          current_version_id: string | null;
          description: string | null;
          id: string;
          kind: string;
          lineage_parent_id: string | null;
          name: string;
          org_id: string | null;
          owner_kind: string;
          playbook_ids: Json;
          slug: string;
          status: string;
          target_type: string;
          updated_at: string;
          visibility: string;
        };
        Insert: {
          category?: string | null;
          created_at?: string;
          created_by?: string | null;
          current_version_id?: string | null;
          description?: string | null;
          id?: string;
          kind?: string;
          lineage_parent_id?: string | null;
          name: string;
          org_id?: string | null;
          owner_kind?: string;
          playbook_ids?: Json;
          slug: string;
          status?: string;
          target_type?: string;
          updated_at?: string;
          visibility?: string;
        };
        Update: {
          category?: string | null;
          created_at?: string;
          created_by?: string | null;
          current_version_id?: string | null;
          description?: string | null;
          id?: string;
          kind?: string;
          lineage_parent_id?: string | null;
          name?: string;
          org_id?: string | null;
          owner_kind?: string;
          playbook_ids?: Json;
          slug?: string;
          status?: string;
          target_type?: string;
          updated_at?: string;
          visibility?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_templates_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_templates_current_version_fk";
            columns: ["current_version_id"];
            isOneToOne: false;
            referencedRelation: "ao_template_versions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_templates_lineage_parent_id_fkey";
            columns: ["lineage_parent_id"];
            isOneToOne: false;
            referencedRelation: "ao_templates";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_templates_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_thread_participants: {
        Row: {
          added_by: string | null;
          agent_id: string | null;
          created_at: string;
          id: string;
          org_id: string;
          participant_kind: string;
          role: string;
          thread_id: string;
          user_id: string | null;
        };
        Insert: {
          added_by?: string | null;
          agent_id?: string | null;
          created_at?: string;
          id?: string;
          org_id: string;
          participant_kind: string;
          role?: string;
          thread_id: string;
          user_id?: string | null;
        };
        Update: {
          added_by?: string | null;
          agent_id?: string | null;
          created_at?: string;
          id?: string;
          org_id?: string;
          participant_kind?: string;
          role?: string;
          thread_id?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ao_thread_participants_agent_id_fkey";
            columns: ["agent_id"];
            isOneToOne: false;
            referencedRelation: "ao_agents";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_thread_participants_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_thread_participants_thread_id_fkey";
            columns: ["thread_id"];
            isOneToOne: false;
            referencedRelation: "ao_threads";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_threads: {
        Row: {
          archived_at: string | null;
          assigned_model_role: string | null;
          channel_meta: Json | null;
          chat_mode: string | null;
          context_master_plan_id: string | null;
          context_project_id: string | null;
          context_scope: string | null;
          context_work_item_id: string | null;
          created_at: string;
          created_by: string | null;
          folder_id: string | null;
          id: string;
          model: string;
          org_id: string;
          pinned_at: string | null;
          project_id: string | null;
          source: string;
          team_id: string | null;
          title: string;
          updated_at: string;
          visibility: string;
        };
        Insert: {
          archived_at?: string | null;
          assigned_model_role?: string | null;
          channel_meta?: Json | null;
          chat_mode?: string | null;
          context_master_plan_id?: string | null;
          context_project_id?: string | null;
          context_scope?: string | null;
          context_work_item_id?: string | null;
          created_at?: string;
          created_by?: string | null;
          folder_id?: string | null;
          id?: string;
          model?: string;
          org_id: string;
          pinned_at?: string | null;
          project_id?: string | null;
          source?: string;
          team_id?: string | null;
          title?: string;
          updated_at?: string;
          visibility?: string;
        };
        Update: {
          archived_at?: string | null;
          assigned_model_role?: string | null;
          channel_meta?: Json | null;
          chat_mode?: string | null;
          context_master_plan_id?: string | null;
          context_project_id?: string | null;
          context_scope?: string | null;
          context_work_item_id?: string | null;
          created_at?: string;
          created_by?: string | null;
          folder_id?: string | null;
          id?: string;
          model?: string;
          org_id?: string;
          pinned_at?: string | null;
          project_id?: string | null;
          source?: string;
          team_id?: string | null;
          title?: string;
          updated_at?: string;
          visibility?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_threads_context_master_plan_id_fkey";
            columns: ["context_master_plan_id"];
            isOneToOne: false;
            referencedRelation: "ao_intel_master_plans";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_threads_context_project_id_fkey";
            columns: ["context_project_id"];
            isOneToOne: false;
            referencedRelation: "ao_intel_projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_threads_context_work_item_id_fkey";
            columns: ["context_work_item_id"];
            isOneToOne: false;
            referencedRelation: "ao_work_items";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_threads_folder_id_fkey";
            columns: ["folder_id"];
            isOneToOne: false;
            referencedRelation: "ao_chat_folders";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_threads_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_threads_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "ao_intel_projects";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_time_blocks: {
        Row: {
          actual_minutes: number | null;
          block_kind: Database["public"]["Enums"]["ao_time_block_kind"];
          created_at: string;
          day_plan_id: string;
          ended_at: string | null;
          ends_at: string;
          executor_agent_id: string | null;
          executor_automation_id: string | null;
          executor_kind: Database["public"]["Enums"]["ao_time_executor_kind"];
          executor_team_id: string | null;
          executor_user_id: string | null;
          executor_workflow_id: string | null;
          external_calendar: string | null;
          external_event_id: string | null;
          flexibility: Database["public"]["Enums"]["ao_time_block_flexibility"];
          id: string;
          notes: string | null;
          org_id: string;
          planned_minutes: number;
          priority_snapshot: string | null;
          sort_index: number;
          started_at: string | null;
          starts_at: string;
          status: Database["public"]["Enums"]["ao_time_block_status"];
          title: string;
          updated_at: string;
          work_item_id: string | null;
        };
        Insert: {
          actual_minutes?: number | null;
          block_kind?: Database["public"]["Enums"]["ao_time_block_kind"];
          created_at?: string;
          day_plan_id: string;
          ended_at?: string | null;
          ends_at: string;
          executor_agent_id?: string | null;
          executor_automation_id?: string | null;
          executor_kind?: Database["public"]["Enums"]["ao_time_executor_kind"];
          executor_team_id?: string | null;
          executor_user_id?: string | null;
          executor_workflow_id?: string | null;
          external_calendar?: string | null;
          external_event_id?: string | null;
          flexibility?: Database["public"]["Enums"]["ao_time_block_flexibility"];
          id?: string;
          notes?: string | null;
          org_id: string;
          planned_minutes: number;
          priority_snapshot?: string | null;
          sort_index?: number;
          started_at?: string | null;
          starts_at: string;
          status?: Database["public"]["Enums"]["ao_time_block_status"];
          title: string;
          updated_at?: string;
          work_item_id?: string | null;
        };
        Update: {
          actual_minutes?: number | null;
          block_kind?: Database["public"]["Enums"]["ao_time_block_kind"];
          created_at?: string;
          day_plan_id?: string;
          ended_at?: string | null;
          ends_at?: string;
          executor_agent_id?: string | null;
          executor_automation_id?: string | null;
          executor_kind?: Database["public"]["Enums"]["ao_time_executor_kind"];
          executor_team_id?: string | null;
          executor_user_id?: string | null;
          executor_workflow_id?: string | null;
          external_calendar?: string | null;
          external_event_id?: string | null;
          flexibility?: Database["public"]["Enums"]["ao_time_block_flexibility"];
          id?: string;
          notes?: string | null;
          org_id?: string;
          planned_minutes?: number;
          priority_snapshot?: string | null;
          sort_index?: number;
          started_at?: string | null;
          starts_at?: string;
          status?: Database["public"]["Enums"]["ao_time_block_status"];
          title?: string;
          updated_at?: string;
          work_item_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ao_time_blocks_day_plan_id_fkey";
            columns: ["day_plan_id"];
            isOneToOne: false;
            referencedRelation: "ao_day_plans";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_time_blocks_executor_user_id_fkey";
            columns: ["executor_user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_time_blocks_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_time_blocks_work_item_id_fkey";
            columns: ["work_item_id"];
            isOneToOne: false;
            referencedRelation: "ao_work_items";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_tool_approval_grants: {
        Row: {
          created_at: string;
          id: string;
          label: string | null;
          match_type: string;
          match_value: string;
          org_id: string;
          revoked_at: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          label?: string | null;
          match_type: string;
          match_value: string;
          org_id: string;
          revoked_at?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          label?: string | null;
          match_type?: string;
          match_value?: string;
          org_id?: string;
          revoked_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_tool_approval_grants_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_tool_audit_logs: {
        Row: {
          arguments: Json;
          created_at: string;
          duration_ms: number | null;
          error_message: string | null;
          id: string;
          model: string | null;
          org_id: string;
          outcome: string;
          required_approval: boolean;
          run_id: string | null;
          thread_id: string | null;
          tool_name: string;
          toolkit_slug: string | null;
          user_id: string;
        };
        Insert: {
          arguments?: Json;
          created_at?: string;
          duration_ms?: number | null;
          error_message?: string | null;
          id?: string;
          model?: string | null;
          org_id: string;
          outcome: string;
          required_approval?: boolean;
          run_id?: string | null;
          thread_id?: string | null;
          tool_name: string;
          toolkit_slug?: string | null;
          user_id: string;
        };
        Update: {
          arguments?: Json;
          created_at?: string;
          duration_ms?: number | null;
          error_message?: string | null;
          id?: string;
          model?: string | null;
          org_id?: string;
          outcome?: string;
          required_approval?: boolean;
          run_id?: string | null;
          thread_id?: string | null;
          tool_name?: string;
          toolkit_slug?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_tool_audit_logs_run_id_fkey";
            columns: ["run_id"];
            isOneToOne: false;
            referencedRelation: "ao_agent_runs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_usage_events: {
        Row: {
          action_slug: string | null;
          agent_id: string | null;
          business_label: string | null;
          cached_input_tokens: number;
          core_ledger_entry_ids: string[] | null;
          correlation_id: string | null;
          cost_buffer_micro_usd: number;
          created_at: string;
          execution_id: string | null;
          id: string;
          idempotency_key: string | null;
          input_tokens: number;
          internal_cost_micro_usd: number;
          ledger_id: string | null;
          markup_method: Database["public"]["Enums"]["ao_markup_method"] | null;
          markup_value: number | null;
          model_id: string | null;
          one_credits_charged: number;
          one_credits_per_usd: number;
          org_id: string;
          output_tokens: number;
          plan_slug: string | null;
          pricing_engine_version: number | null;
          pricing_rule_id: string | null;
          pricing_rule_version: number | null;
          pricing_snapshot: Json;
          promotion_id: string | null;
          provider_model_id: string | null;
          provider_pricing_version: number | null;
          provider_slug: string | null;
          raw_provider_cost_micro_usd: number;
          reasoning_tokens: number;
          request_id: string | null;
          requests: number;
          reservation_id: string | null;
          resource_type: string;
          retail_micro_usd: number;
          routing_decision: Json | null;
          source_app: string;
          status: string;
          thread_id: string | null;
          tool_calls: number;
          user_id: string | null;
          workflow_id: string | null;
          workspace_override_id: string | null;
        };
        Insert: {
          action_slug?: string | null;
          agent_id?: string | null;
          business_label?: string | null;
          cached_input_tokens?: number;
          core_ledger_entry_ids?: string[] | null;
          correlation_id?: string | null;
          cost_buffer_micro_usd?: number;
          created_at?: string;
          execution_id?: string | null;
          id?: string;
          idempotency_key?: string | null;
          input_tokens?: number;
          internal_cost_micro_usd?: number;
          ledger_id?: string | null;
          markup_method?: Database["public"]["Enums"]["ao_markup_method"] | null;
          markup_value?: number | null;
          model_id?: string | null;
          one_credits_charged: number;
          one_credits_per_usd: number;
          org_id: string;
          output_tokens?: number;
          plan_slug?: string | null;
          pricing_engine_version?: number | null;
          pricing_rule_id?: string | null;
          pricing_rule_version?: number | null;
          pricing_snapshot?: Json;
          promotion_id?: string | null;
          provider_model_id?: string | null;
          provider_pricing_version?: number | null;
          provider_slug?: string | null;
          raw_provider_cost_micro_usd?: number;
          reasoning_tokens?: number;
          request_id?: string | null;
          requests?: number;
          reservation_id?: string | null;
          resource_type: string;
          retail_micro_usd?: number;
          routing_decision?: Json | null;
          source_app?: string;
          status?: string;
          thread_id?: string | null;
          tool_calls?: number;
          user_id?: string | null;
          workflow_id?: string | null;
          workspace_override_id?: string | null;
        };
        Update: {
          action_slug?: string | null;
          agent_id?: string | null;
          business_label?: string | null;
          cached_input_tokens?: number;
          core_ledger_entry_ids?: string[] | null;
          correlation_id?: string | null;
          cost_buffer_micro_usd?: number;
          created_at?: string;
          execution_id?: string | null;
          id?: string;
          idempotency_key?: string | null;
          input_tokens?: number;
          internal_cost_micro_usd?: number;
          ledger_id?: string | null;
          markup_method?: Database["public"]["Enums"]["ao_markup_method"] | null;
          markup_value?: number | null;
          model_id?: string | null;
          one_credits_charged?: number;
          one_credits_per_usd?: number;
          org_id?: string;
          output_tokens?: number;
          plan_slug?: string | null;
          pricing_engine_version?: number | null;
          pricing_rule_id?: string | null;
          pricing_rule_version?: number | null;
          pricing_snapshot?: Json;
          promotion_id?: string | null;
          provider_model_id?: string | null;
          provider_pricing_version?: number | null;
          provider_slug?: string | null;
          raw_provider_cost_micro_usd?: number;
          reasoning_tokens?: number;
          request_id?: string | null;
          requests?: number;
          reservation_id?: string | null;
          resource_type?: string;
          retail_micro_usd?: number;
          routing_decision?: Json | null;
          source_app?: string;
          status?: string;
          thread_id?: string | null;
          tool_calls?: number;
          user_id?: string | null;
          workflow_id?: string | null;
          workspace_override_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ao_usage_events_ledger_id_fkey";
            columns: ["ledger_id"];
            isOneToOne: false;
            referencedRelation: "ao_credit_ledger";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_usage_events_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_usage_events_pricing_rule_id_fkey";
            columns: ["pricing_rule_id"];
            isOneToOne: false;
            referencedRelation: "ao_pricing_rules";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_user_approval_prefs: {
        Row: {
          always_ask_categories: Json;
          mode: string;
          org_id: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          always_ask_categories?: Json;
          mode?: string;
          org_id: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          always_ask_categories?: Json;
          mode?: string;
          org_id?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_user_approval_prefs_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_user_intelligence_prefs: {
        Row: {
          active_constraint_id: string | null;
          active_master_plan_id: string | null;
          active_objective_id: string | null;
          active_project_id: string | null;
          active_run_id: string | null;
          active_work_item_id: string | null;
          authority_level: string;
          chat_mode: string;
          context_scope: string;
          intelligence_mode_enabled: boolean;
          last_active_at: string | null;
          org_id: string;
          snoozed_recommendations: Json;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          active_constraint_id?: string | null;
          active_master_plan_id?: string | null;
          active_objective_id?: string | null;
          active_project_id?: string | null;
          active_run_id?: string | null;
          active_work_item_id?: string | null;
          authority_level?: string;
          chat_mode?: string;
          context_scope?: string;
          intelligence_mode_enabled?: boolean;
          last_active_at?: string | null;
          org_id: string;
          snoozed_recommendations?: Json;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          active_constraint_id?: string | null;
          active_master_plan_id?: string | null;
          active_objective_id?: string | null;
          active_project_id?: string | null;
          active_run_id?: string | null;
          active_work_item_id?: string | null;
          authority_level?: string;
          chat_mode?: string;
          context_scope?: string;
          intelligence_mode_enabled?: boolean;
          last_active_at?: string | null;
          org_id?: string;
          snoozed_recommendations?: Json;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_user_intelligence_prefs_active_master_plan_id_fkey";
            columns: ["active_master_plan_id"];
            isOneToOne: false;
            referencedRelation: "ao_intel_master_plans";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_user_intelligence_prefs_active_run_id_fkey";
            columns: ["active_run_id"];
            isOneToOne: false;
            referencedRelation: "ao_playbook_runs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_user_intelligence_prefs_active_work_item_id_fkey";
            columns: ["active_work_item_id"];
            isOneToOne: false;
            referencedRelation: "ao_work_items";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_user_intelligence_prefs_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_user_roles: {
        Row: {
          created_at: string;
          id: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          role?: Database["public"]["Enums"]["app_role"];
          user_id?: string;
        };
        Relationships: [];
      };
      ao_v0_jobs: {
        Row: {
          artifact_id: string | null;
          created_at: string;
          demo_url: string | null;
          error: string | null;
          id: string;
          org_id: string;
          prompt: string;
          queue_message_id: string | null;
          status: string;
          thread_id: string | null;
          title: string;
          updated_at: string;
          user_id: string;
          v0_chat_id: string | null;
        };
        Insert: {
          artifact_id?: string | null;
          created_at?: string;
          demo_url?: string | null;
          error?: string | null;
          id?: string;
          org_id: string;
          prompt: string;
          queue_message_id?: string | null;
          status?: string;
          thread_id?: string | null;
          title: string;
          updated_at?: string;
          user_id: string;
          v0_chat_id?: string | null;
        };
        Update: {
          artifact_id?: string | null;
          created_at?: string;
          demo_url?: string | null;
          error?: string | null;
          id?: string;
          org_id?: string;
          prompt?: string;
          queue_message_id?: string | null;
          status?: string;
          thread_id?: string | null;
          title?: string;
          updated_at?: string;
          user_id?: string;
          v0_chat_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ao_v0_jobs_artifact_id_fkey";
            columns: ["artifact_id"];
            isOneToOne: false;
            referencedRelation: "ao_artifacts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_v0_jobs_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_v0_jobs_thread_id_fkey";
            columns: ["thread_id"];
            isOneToOne: false;
            referencedRelation: "ao_threads";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_v0_jobs_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_v0_previews: {
        Row: {
          artifact_id: string | null;
          created_at: string;
          created_by: string | null;
          demo_url: string | null;
          id: string;
          org_id: string;
          prompt: string | null;
          space_id: string | null;
          thread_id: string | null;
          updated_at: string;
          v0_chat_id: string;
          web_url: string | null;
        };
        Insert: {
          artifact_id?: string | null;
          created_at?: string;
          created_by?: string | null;
          demo_url?: string | null;
          id?: string;
          org_id: string;
          prompt?: string | null;
          space_id?: string | null;
          thread_id?: string | null;
          updated_at?: string;
          v0_chat_id: string;
          web_url?: string | null;
        };
        Update: {
          artifact_id?: string | null;
          created_at?: string;
          created_by?: string | null;
          demo_url?: string | null;
          id?: string;
          org_id?: string;
          prompt?: string | null;
          space_id?: string | null;
          thread_id?: string | null;
          updated_at?: string;
          v0_chat_id?: string;
          web_url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ao_v0_previews_artifact_id_fkey";
            columns: ["artifact_id"];
            isOneToOne: false;
            referencedRelation: "ao_artifacts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_v0_previews_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_v0_previews_space_id_fkey";
            columns: ["space_id"];
            isOneToOne: false;
            referencedRelation: "ao_spaces";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_v0_previews_thread_id_fkey";
            columns: ["thread_id"];
            isOneToOne: false;
            referencedRelation: "ao_threads";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_vault_credentials: {
        Row: {
          created_at: string;
          created_by: string | null;
          credential_ref: string;
          encrypted_secret: string;
          id: string;
          last_used_at: string | null;
          name: string;
          org_id: string;
          portal: string | null;
          scopes: string[];
          secret_kind: string;
          slug: string;
          status: string;
          updated_at: string;
          username_hint: string | null;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          credential_ref: string;
          encrypted_secret: string;
          id?: string;
          last_used_at?: string | null;
          name: string;
          org_id: string;
          portal?: string | null;
          scopes?: string[];
          secret_kind?: string;
          slug: string;
          status?: string;
          updated_at?: string;
          username_hint?: string | null;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          credential_ref?: string;
          encrypted_secret?: string;
          id?: string;
          last_used_at?: string | null;
          name?: string;
          org_id?: string;
          portal?: string | null;
          scopes?: string[];
          secret_kind?: string;
          slug?: string;
          status?: string;
          updated_at?: string;
          username_hint?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ao_vault_credentials_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_vault_credentials_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_vault_grants: {
        Row: {
          created_at: string;
          credential_id: string;
          expires_at: string | null;
          grant_type: string;
          granted_by: string | null;
          grantee_user_id: string | null;
          id: string;
          org_id: string;
          revoked_at: string | null;
          scopes: string[];
          skill_id: string | null;
        };
        Insert: {
          created_at?: string;
          credential_id: string;
          expires_at?: string | null;
          grant_type: string;
          granted_by?: string | null;
          grantee_user_id?: string | null;
          id?: string;
          org_id: string;
          revoked_at?: string | null;
          scopes?: string[];
          skill_id?: string | null;
        };
        Update: {
          created_at?: string;
          credential_id?: string;
          expires_at?: string | null;
          grant_type?: string;
          granted_by?: string | null;
          grantee_user_id?: string | null;
          id?: string;
          org_id?: string;
          revoked_at?: string | null;
          scopes?: string[];
          skill_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ao_vault_grants_credential_id_fkey";
            columns: ["credential_id"];
            isOneToOne: false;
            referencedRelation: "ao_vault_credentials";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_vault_grants_granted_by_fkey";
            columns: ["granted_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_vault_grants_grantee_user_id_fkey";
            columns: ["grantee_user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_vault_grants_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_vault_grants_skill_id_fkey";
            columns: ["skill_id"];
            isOneToOne: false;
            referencedRelation: "ao_skills";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_view_grantees: {
        Row: {
          created_at: string;
          granted_by: string | null;
          id: string;
          org_id: string;
          user_id: string;
          view_id: string;
        };
        Insert: {
          created_at?: string;
          granted_by?: string | null;
          id?: string;
          org_id: string;
          user_id: string;
          view_id: string;
        };
        Update: {
          created_at?: string;
          granted_by?: string | null;
          id?: string;
          org_id?: string;
          user_id?: string;
          view_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_view_grantees_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_view_grantees_view_id_fkey";
            columns: ["view_id"];
            isOneToOne: false;
            referencedRelation: "ao_views";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_views: {
        Row: {
          created_at: string;
          created_by: string;
          definition: Json;
          description: string | null;
          id: string;
          name: string;
          org_id: string;
          prompt_source: string | null;
          surface: string;
          updated_at: string;
          visibility: string;
        };
        Insert: {
          created_at?: string;
          created_by: string;
          definition?: Json;
          description?: string | null;
          id?: string;
          name: string;
          org_id: string;
          prompt_source?: string | null;
          surface?: string;
          updated_at?: string;
          visibility?: string;
        };
        Update: {
          created_at?: string;
          created_by?: string;
          definition?: Json;
          description?: string | null;
          id?: string;
          name?: string;
          org_id?: string;
          prompt_source?: string | null;
          surface?: string;
          updated_at?: string;
          visibility?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_views_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_wallet_recharge_rules: {
        Row: {
          charges_day_key: string | null;
          charges_today: number;
          created_at: string;
          enabled: boolean;
          last_charged_at: string | null;
          max_charges_per_day: number;
          org_id: string;
          pack_id: string;
          threshold_credits: number;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          charges_day_key?: string | null;
          charges_today?: number;
          created_at?: string;
          enabled?: boolean;
          last_charged_at?: string | null;
          max_charges_per_day?: number;
          org_id: string;
          pack_id?: string;
          threshold_credits?: number;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          charges_day_key?: string | null;
          charges_today?: number;
          created_at?: string;
          enabled?: boolean;
          last_charged_at?: string | null;
          max_charges_per_day?: number;
          org_id?: string;
          pack_id?: string;
          threshold_credits?: number;
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ao_wallet_recharge_rules_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: true;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_work_events: {
        Row: {
          actor_kind: string;
          actor_user_id: string | null;
          created_at: string;
          event_type: string;
          id: string;
          milestone_id: string | null;
          mutation_id: string | null;
          org_id: string;
          payload: Json;
          project_id: string | null;
          summary: string;
          work_item_id: string | null;
        };
        Insert: {
          actor_kind?: string;
          actor_user_id?: string | null;
          created_at?: string;
          event_type: string;
          id?: string;
          milestone_id?: string | null;
          mutation_id?: string | null;
          org_id: string;
          payload?: Json;
          project_id?: string | null;
          summary: string;
          work_item_id?: string | null;
        };
        Update: {
          actor_kind?: string;
          actor_user_id?: string | null;
          created_at?: string;
          event_type?: string;
          id?: string;
          milestone_id?: string | null;
          mutation_id?: string | null;
          org_id?: string;
          payload?: Json;
          project_id?: string | null;
          summary?: string;
          work_item_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ao_work_events_actor_user_id_fkey";
            columns: ["actor_user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_work_events_milestone_id_fkey";
            columns: ["milestone_id"];
            isOneToOne: false;
            referencedRelation: "ao_project_milestones";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_work_events_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_work_events_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "ao_intel_projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_work_events_work_item_id_fkey";
            columns: ["work_item_id"];
            isOneToOne: false;
            referencedRelation: "ao_work_items";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_work_evidence: {
        Row: {
          created_at: string;
          evidence_kind: Database["public"]["Enums"]["ao_work_evidence_kind"];
          id: string;
          org_id: string;
          project_id: string | null;
          ref_id: string | null;
          ref_table: string | null;
          submitted_by: string | null;
          summary: string | null;
          url: string | null;
          verified: boolean;
          work_item_id: string | null;
        };
        Insert: {
          created_at?: string;
          evidence_kind?: Database["public"]["Enums"]["ao_work_evidence_kind"];
          id?: string;
          org_id: string;
          project_id?: string | null;
          ref_id?: string | null;
          ref_table?: string | null;
          submitted_by?: string | null;
          summary?: string | null;
          url?: string | null;
          verified?: boolean;
          work_item_id?: string | null;
        };
        Update: {
          created_at?: string;
          evidence_kind?: Database["public"]["Enums"]["ao_work_evidence_kind"];
          id?: string;
          org_id?: string;
          project_id?: string | null;
          ref_id?: string | null;
          ref_table?: string | null;
          submitted_by?: string | null;
          summary?: string | null;
          url?: string | null;
          verified?: boolean;
          work_item_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ao_work_evidence_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_work_evidence_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "ao_intel_projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_work_evidence_submitted_by_fkey";
            columns: ["submitted_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_work_evidence_work_item_id_fkey";
            columns: ["work_item_id"];
            isOneToOne: false;
            referencedRelation: "ao_work_items";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_work_item_dependencies: {
        Row: {
          created_at: string;
          depends_on_work_item_id: string;
          id: string;
          kind: string;
          org_id: string;
          work_item_id: string;
        };
        Insert: {
          created_at?: string;
          depends_on_work_item_id: string;
          id?: string;
          kind?: string;
          org_id: string;
          work_item_id: string;
        };
        Update: {
          created_at?: string;
          depends_on_work_item_id?: string;
          id?: string;
          kind?: string;
          org_id?: string;
          work_item_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_work_item_dependencies_depends_on_work_item_id_fkey";
            columns: ["depends_on_work_item_id"];
            isOneToOne: false;
            referencedRelation: "ao_work_items";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_work_item_dependencies_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_work_item_dependencies_work_item_id_fkey";
            columns: ["work_item_id"];
            isOneToOne: false;
            referencedRelation: "ao_work_items";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_work_item_participants: {
        Row: {
          agent_id: string | null;
          automation_id: string | null;
          created_at: string;
          id: string;
          org_id: string;
          participant_kind: string;
          role: string;
          user_id: string | null;
          work_item_id: string;
          workflow_id: string | null;
        };
        Insert: {
          agent_id?: string | null;
          automation_id?: string | null;
          created_at?: string;
          id?: string;
          org_id: string;
          participant_kind: string;
          role?: string;
          user_id?: string | null;
          work_item_id: string;
          workflow_id?: string | null;
        };
        Update: {
          agent_id?: string | null;
          automation_id?: string | null;
          created_at?: string;
          id?: string;
          org_id?: string;
          participant_kind?: string;
          role?: string;
          user_id?: string | null;
          work_item_id?: string;
          workflow_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ao_work_item_participants_agent_id_fkey";
            columns: ["agent_id"];
            isOneToOne: false;
            referencedRelation: "ao_agents";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_work_item_participants_automation_id_fkey";
            columns: ["automation_id"];
            isOneToOne: false;
            referencedRelation: "ao_automations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_work_item_participants_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_work_item_participants_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_work_item_participants_work_item_id_fkey";
            columns: ["work_item_id"];
            isOneToOne: false;
            referencedRelation: "ao_work_items";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_work_item_participants_workflow_id_fkey";
            columns: ["workflow_id"];
            isOneToOne: false;
            referencedRelation: "ao_workflows";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_work_items: {
        Row: {
          acceptance_criteria: Json;
          approval_required: boolean;
          assignee_agent_id: string | null;
          assignee_automation_id: string | null;
          assignee_kind: Database["public"]["Enums"]["ao_work_assignee_kind"];
          assignee_ref: string | null;
          assignee_user_id: string | null;
          assignee_workflow_id: string | null;
          block_class: string | null;
          blocked_by_work_item_id: string | null;
          blocker_reason: string | null;
          claimed_at: string | null;
          claimed_by: string | null;
          commitment_state: Database["public"]["Enums"]["ao_work_commitment_state"];
          complexity_factors: Json;
          complexity_score: number | null;
          confidence: number | null;
          created_at: string;
          created_by: string | null;
          dedupe_key: string | null;
          definition_of_done: string | null;
          description: string | null;
          due_at: string | null;
          estimate_minutes: number | null;
          execution_contract: Json;
          execution_run_id: string | null;
          execution_run_kind: string | null;
          failure_count: number;
          id: string;
          inbox_approval_id: string | null;
          last_failure_at: string | null;
          last_readiness_at: string | null;
          milestone_id: string | null;
          objective_id: string | null;
          org_id: string;
          outcome_status: Database["public"]["Enums"]["ao_work_outcome_status"];
          owner_user_id: string | null;
          parent_work_item_id: string | null;
          priority: string;
          project_id: string | null;
          purpose: string | null;
          readiness_reasons: Json;
          required_evidence: Json;
          source_playbook_run_id: string | null;
          source_thread_id: string | null;
          status: Database["public"]["Enums"]["ao_work_item_status"];
          title: string;
          updated_at: string;
          verification_status: Database["public"]["Enums"]["ao_work_verification_status"];
          verification_steps: Json;
          verified_at: string | null;
          verified_by: string | null;
        };
        Insert: {
          acceptance_criteria?: Json;
          approval_required?: boolean;
          assignee_agent_id?: string | null;
          assignee_automation_id?: string | null;
          assignee_kind?: Database["public"]["Enums"]["ao_work_assignee_kind"];
          assignee_ref?: string | null;
          assignee_user_id?: string | null;
          assignee_workflow_id?: string | null;
          block_class?: string | null;
          blocked_by_work_item_id?: string | null;
          blocker_reason?: string | null;
          claimed_at?: string | null;
          claimed_by?: string | null;
          commitment_state?: Database["public"]["Enums"]["ao_work_commitment_state"];
          complexity_factors?: Json;
          complexity_score?: number | null;
          confidence?: number | null;
          created_at?: string;
          created_by?: string | null;
          dedupe_key?: string | null;
          definition_of_done?: string | null;
          description?: string | null;
          due_at?: string | null;
          estimate_minutes?: number | null;
          execution_contract?: Json;
          execution_run_id?: string | null;
          execution_run_kind?: string | null;
          failure_count?: number;
          id?: string;
          inbox_approval_id?: string | null;
          last_failure_at?: string | null;
          last_readiness_at?: string | null;
          milestone_id?: string | null;
          objective_id?: string | null;
          org_id: string;
          outcome_status?: Database["public"]["Enums"]["ao_work_outcome_status"];
          owner_user_id?: string | null;
          parent_work_item_id?: string | null;
          priority?: string;
          project_id?: string | null;
          purpose?: string | null;
          readiness_reasons?: Json;
          required_evidence?: Json;
          source_playbook_run_id?: string | null;
          source_thread_id?: string | null;
          status?: Database["public"]["Enums"]["ao_work_item_status"];
          title: string;
          updated_at?: string;
          verification_status?: Database["public"]["Enums"]["ao_work_verification_status"];
          verification_steps?: Json;
          verified_at?: string | null;
          verified_by?: string | null;
        };
        Update: {
          acceptance_criteria?: Json;
          approval_required?: boolean;
          assignee_agent_id?: string | null;
          assignee_automation_id?: string | null;
          assignee_kind?: Database["public"]["Enums"]["ao_work_assignee_kind"];
          assignee_ref?: string | null;
          assignee_user_id?: string | null;
          assignee_workflow_id?: string | null;
          block_class?: string | null;
          blocked_by_work_item_id?: string | null;
          blocker_reason?: string | null;
          claimed_at?: string | null;
          claimed_by?: string | null;
          commitment_state?: Database["public"]["Enums"]["ao_work_commitment_state"];
          complexity_factors?: Json;
          complexity_score?: number | null;
          confidence?: number | null;
          created_at?: string;
          created_by?: string | null;
          dedupe_key?: string | null;
          definition_of_done?: string | null;
          description?: string | null;
          due_at?: string | null;
          estimate_minutes?: number | null;
          execution_contract?: Json;
          execution_run_id?: string | null;
          execution_run_kind?: string | null;
          failure_count?: number;
          id?: string;
          inbox_approval_id?: string | null;
          last_failure_at?: string | null;
          last_readiness_at?: string | null;
          milestone_id?: string | null;
          objective_id?: string | null;
          org_id?: string;
          outcome_status?: Database["public"]["Enums"]["ao_work_outcome_status"];
          owner_user_id?: string | null;
          parent_work_item_id?: string | null;
          priority?: string;
          project_id?: string | null;
          purpose?: string | null;
          readiness_reasons?: Json;
          required_evidence?: Json;
          source_playbook_run_id?: string | null;
          source_thread_id?: string | null;
          status?: Database["public"]["Enums"]["ao_work_item_status"];
          title?: string;
          updated_at?: string;
          verification_status?: Database["public"]["Enums"]["ao_work_verification_status"];
          verification_steps?: Json;
          verified_at?: string | null;
          verified_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ao_work_items_assignee_agent_id_fkey";
            columns: ["assignee_agent_id"];
            isOneToOne: false;
            referencedRelation: "ao_agents";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_work_items_assignee_automation_id_fkey";
            columns: ["assignee_automation_id"];
            isOneToOne: false;
            referencedRelation: "ao_automations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_work_items_assignee_user_id_fkey";
            columns: ["assignee_user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_work_items_assignee_workflow_id_fkey";
            columns: ["assignee_workflow_id"];
            isOneToOne: false;
            referencedRelation: "ao_workflows";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_work_items_blocked_by_work_item_id_fkey";
            columns: ["blocked_by_work_item_id"];
            isOneToOne: false;
            referencedRelation: "ao_work_items";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_work_items_claimed_by_fkey";
            columns: ["claimed_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_work_items_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_work_items_inbox_approval_id_fkey";
            columns: ["inbox_approval_id"];
            isOneToOne: false;
            referencedRelation: "ao_inbox_items";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_work_items_milestone_id_fkey";
            columns: ["milestone_id"];
            isOneToOne: false;
            referencedRelation: "ao_project_milestones";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_work_items_objective_id_fkey";
            columns: ["objective_id"];
            isOneToOne: false;
            referencedRelation: "ao_objectives";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_work_items_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_work_items_owner_user_id_fkey";
            columns: ["owner_user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_work_items_parent_work_item_id_fkey";
            columns: ["parent_work_item_id"];
            isOneToOne: false;
            referencedRelation: "ao_work_items";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_work_items_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "ao_intel_projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_work_items_source_playbook_run_id_fkey";
            columns: ["source_playbook_run_id"];
            isOneToOne: false;
            referencedRelation: "ao_playbook_runs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_work_items_source_thread_id_fkey";
            columns: ["source_thread_id"];
            isOneToOne: false;
            referencedRelation: "ao_threads";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_work_items_verified_by_fkey";
            columns: ["verified_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_work_proposals: {
        Row: {
          applied_at: string | null;
          change_set: Json;
          created_at: string;
          created_by: string | null;
          decided_at: string | null;
          decided_by: string | null;
          id: string;
          inbox_item_id: string | null;
          kind: string;
          mutation_id: string | null;
          org_id: string;
          project_id: string | null;
          require_approval: boolean;
          source_refs: Json;
          status: string;
          summary: string | null;
          title: string;
          updated_at: string;
          work_item_id: string | null;
        };
        Insert: {
          applied_at?: string | null;
          change_set?: Json;
          created_at?: string;
          created_by?: string | null;
          decided_at?: string | null;
          decided_by?: string | null;
          id?: string;
          inbox_item_id?: string | null;
          kind: string;
          mutation_id?: string | null;
          org_id: string;
          project_id?: string | null;
          require_approval?: boolean;
          source_refs?: Json;
          status?: string;
          summary?: string | null;
          title: string;
          updated_at?: string;
          work_item_id?: string | null;
        };
        Update: {
          applied_at?: string | null;
          change_set?: Json;
          created_at?: string;
          created_by?: string | null;
          decided_at?: string | null;
          decided_by?: string | null;
          id?: string;
          inbox_item_id?: string | null;
          kind?: string;
          mutation_id?: string | null;
          org_id?: string;
          project_id?: string | null;
          require_approval?: boolean;
          source_refs?: Json;
          status?: string;
          summary?: string | null;
          title?: string;
          updated_at?: string;
          work_item_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ao_work_proposals_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_work_proposals_decided_by_fkey";
            columns: ["decided_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_work_proposals_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_work_proposals_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "ao_intel_projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_work_proposals_work_item_id_fkey";
            columns: ["work_item_id"];
            isOneToOne: false;
            referencedRelation: "ao_work_items";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_work_templates: {
        Row: {
          created_at: string;
          created_by: string | null;
          definition: Json;
          description: string | null;
          id: string;
          is_active: boolean;
          name: string;
          org_id: string | null;
          owner_kind: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          definition?: Json;
          description?: string | null;
          id?: string;
          is_active?: boolean;
          name: string;
          org_id?: string | null;
          owner_kind?: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          definition?: Json;
          description?: string | null;
          id?: string;
          is_active?: boolean;
          name?: string;
          org_id?: string | null;
          owner_kind?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_work_templates_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_work_templates_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_workflow_runs: {
        Row: {
          agent_id: string | null;
          created_at: string;
          ended_at: string | null;
          error: string | null;
          id: string;
          input: Json;
          kind: string;
          org_id: string;
          output: Json | null;
          started_at: string;
          status: string;
          vercel_run_id: string | null;
          workflow_id: string | null;
        };
        Insert: {
          agent_id?: string | null;
          created_at?: string;
          ended_at?: string | null;
          error?: string | null;
          id?: string;
          input?: Json;
          kind: string;
          org_id: string;
          output?: Json | null;
          started_at?: string;
          status?: string;
          vercel_run_id?: string | null;
          workflow_id?: string | null;
        };
        Update: {
          agent_id?: string | null;
          created_at?: string;
          ended_at?: string | null;
          error?: string | null;
          id?: string;
          input?: Json;
          kind?: string;
          org_id?: string;
          output?: Json | null;
          started_at?: string;
          status?: string;
          vercel_run_id?: string | null;
          workflow_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ao_workflow_runs_agent_id_fkey";
            columns: ["agent_id"];
            isOneToOne: false;
            referencedRelation: "ao_agents";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_workflow_runs_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_workflow_runs_workflow_id_fkey";
            columns: ["workflow_id"];
            isOneToOne: false;
            referencedRelation: "ao_workflows";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_workflows: {
        Row: {
          agent_id: string | null;
          config: Json;
          created_at: string;
          created_by: string | null;
          cron_expression: string;
          description: string | null;
          enabled: boolean;
          id: string;
          kind: string;
          last_run_at: string | null;
          name: string;
          next_run_at: string | null;
          org_id: string;
          timezone: string;
          updated_at: string;
        };
        Insert: {
          agent_id?: string | null;
          config?: Json;
          created_at?: string;
          created_by?: string | null;
          cron_expression?: string;
          description?: string | null;
          enabled?: boolean;
          id?: string;
          kind?: string;
          last_run_at?: string | null;
          name: string;
          next_run_at?: string | null;
          org_id: string;
          timezone?: string;
          updated_at?: string;
        };
        Update: {
          agent_id?: string | null;
          config?: Json;
          created_at?: string;
          created_by?: string | null;
          cron_expression?: string;
          description?: string | null;
          enabled?: boolean;
          id?: string;
          kind?: string;
          last_run_at?: string | null;
          name?: string;
          next_run_at?: string | null;
          org_id?: string;
          timezone?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_workflows_agent_id_fkey";
            columns: ["agent_id"];
            isOneToOne: false;
            referencedRelation: "ao_agents";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_workflows_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_workflows_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_workspace_app_grants: {
        Row: {
          app_id: string;
          created_at: string;
          granted_by: string | null;
          org_id: string;
          status: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          app_id: string;
          created_at?: string;
          granted_by?: string | null;
          org_id: string;
          status?: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          app_id?: string;
          created_at?: string;
          granted_by?: string | null;
          org_id?: string;
          status?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_workspace_app_grants_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      ao_workspace_member_permission_overrides: {
        Row: {
          created_at: string;
          created_by: string | null;
          granted: boolean;
          org_id: string;
          permission_key: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          granted: boolean;
          org_id: string;
          permission_key: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          granted?: boolean;
          org_id?: string;
          permission_key?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_workspace_member_permission_overrides_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ao_workspace_member_permission_overrides_permission_key_fkey";
            columns: ["permission_key"];
            isOneToOne: false;
            referencedRelation: "ao_workspace_permissions";
            referencedColumns: ["key"];
          },
        ];
      };
      ao_workspace_permissions: {
        Row: {
          category: string;
          created_at: string;
          description: string;
          key: string;
        };
        Insert: {
          category?: string;
          created_at?: string;
          description: string;
          key: string;
        };
        Update: {
          category?: string;
          created_at?: string;
          description?: string;
          key?: string;
        };
        Relationships: [];
      };
      ao_workspace_role_permissions: {
        Row: {
          permission_key: string;
          role: Database["public"]["Enums"]["ao_org_role"];
        };
        Insert: {
          permission_key: string;
          role: Database["public"]["Enums"]["ao_org_role"];
        };
        Update: {
          permission_key?: string;
          role?: Database["public"]["Enums"]["ao_org_role"];
        };
        Relationships: [
          {
            foreignKeyName: "ao_workspace_role_permissions_permission_key_fkey";
            columns: ["permission_key"];
            isOneToOne: false;
            referencedRelation: "ao_workspace_permissions";
            referencedColumns: ["key"];
          },
        ];
      };
      ao_workspace_transfers: {
        Row: {
          accepted_at: string | null;
          cancelled_at: string | null;
          completed_at: string | null;
          created_at: string;
          expires_at: string;
          from_user_id: string;
          id: string;
          initiated_at: string;
          metadata: Json;
          org_id: string;
          previous_owner_disposition: string;
          status: string;
          to_user_id: string;
          token: string;
          updated_at: string;
        };
        Insert: {
          accepted_at?: string | null;
          cancelled_at?: string | null;
          completed_at?: string | null;
          created_at?: string;
          expires_at?: string;
          from_user_id: string;
          id?: string;
          initiated_at?: string;
          metadata?: Json;
          org_id: string;
          previous_owner_disposition?: string;
          status?: string;
          to_user_id: string;
          token?: string;
          updated_at?: string;
        };
        Update: {
          accepted_at?: string | null;
          cancelled_at?: string | null;
          completed_at?: string | null;
          created_at?: string;
          expires_at?: string;
          from_user_id?: string;
          id?: string;
          initiated_at?: string;
          metadata?: Json;
          org_id?: string;
          previous_owner_disposition?: string;
          status?: string;
          to_user_id?: string;
          token?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ao_workspace_transfers_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      app_access: {
        Row: {
          app_id: string;
          granted_at: string;
          id: number;
          user_id: string;
        };
        Insert: {
          app_id: string;
          granted_at?: string;
          id?: never;
          user_id: string;
        };
        Update: {
          app_id?: string;
          granted_at?: string;
          id?: never;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "app_access_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      app_config: {
        Row: {
          description: string | null;
          key: string;
          updated_at: string;
          value: Json;
        };
        Insert: {
          description?: string | null;
          key: string;
          updated_at?: string;
          value: Json;
        };
        Update: {
          description?: string | null;
          key?: string;
          updated_at?: string;
          value?: Json;
        };
        Relationships: [];
      };
      app_users: {
        Row: {
          avatar_url: string | null;
          clerk_user_id: string | null;
          created_at: string;
          email: string;
          full_name: string | null;
          id: string;
          is_master_admin: boolean;
          role: string;
          updated_at: string;
        };
        Insert: {
          avatar_url?: string | null;
          clerk_user_id?: string | null;
          created_at?: string;
          email: string;
          full_name?: string | null;
          id?: string;
          is_master_admin?: boolean;
          role?: string;
          updated_at?: string;
        };
        Update: {
          avatar_url?: string | null;
          clerk_user_id?: string | null;
          created_at?: string;
          email?: string;
          full_name?: string | null;
          id?: string;
          is_master_admin?: boolean;
          role?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      appointments: {
        Row: {
          client_id: string | null;
          created_at: string;
          id: string;
          meeting_date: string;
          meeting_time: string;
          notes: string | null;
          organization_id: string | null;
          status: string;
          tax_pro_id: string | null;
          title: string;
          updated_at: string;
        };
        Insert: {
          client_id?: string | null;
          created_at?: string;
          id?: string;
          meeting_date: string;
          meeting_time: string;
          notes?: string | null;
          organization_id?: string | null;
          status?: string;
          tax_pro_id?: string | null;
          title: string;
          updated_at?: string;
        };
        Update: {
          client_id?: string | null;
          created_at?: string;
          id?: string;
          meeting_date?: string;
          meeting_time?: string;
          notes?: string | null;
          organization_id?: string | null;
          status?: string;
          tax_pro_id?: string | null;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "appointments_client_id_fkey";
            columns: ["client_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "appointments_tax_pro_id_fkey";
            columns: ["tax_pro_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "appointments_tenant_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      attempt_answers: {
        Row: {
          attempt_id: string;
          correct_answer: string;
          created_at: string;
          id: string;
          is_correct: boolean;
          question_id: string | null;
          question_snapshot: Json;
          selected_answer: string | null;
          time_spent_seconds: number | null;
        };
        Insert: {
          attempt_id: string;
          correct_answer: string;
          created_at?: string;
          id?: string;
          is_correct?: boolean;
          question_id?: string | null;
          question_snapshot: Json;
          selected_answer?: string | null;
          time_spent_seconds?: number | null;
        };
        Update: {
          attempt_id?: string;
          correct_answer?: string;
          created_at?: string;
          id?: string;
          is_correct?: boolean;
          question_id?: string | null;
          question_snapshot?: Json;
          selected_answer?: string | null;
          time_spent_seconds?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "attempt_answers_attempt_id_fkey";
            columns: ["attempt_id"];
            isOneToOne: false;
            referencedRelation: "quiz_attempts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "attempt_answers_question_id_fkey";
            columns: ["question_id"];
            isOneToOne: false;
            referencedRelation: "questions";
            referencedColumns: ["id"];
          },
        ];
      };
      attendance_records: {
        Row: {
          absence_notification_sent_at: string | null;
          check_in_method: string | null;
          checked_in_at: string | null;
          created_at: string;
          enrollment_id: string | null;
          hours_attended: number | null;
          id: string;
          instructor_verified_at: string | null;
          instructor_verified_by: string | null;
          marked_at: string | null;
          marked_by: string | null;
          notes: string | null;
          organization_id: string | null;
          override_by: string | null;
          override_reason: string | null;
          session_id: string;
          status: string;
          student_id: string | null;
          updated_at: string;
        };
        Insert: {
          absence_notification_sent_at?: string | null;
          check_in_method?: string | null;
          checked_in_at?: string | null;
          created_at?: string;
          enrollment_id?: string | null;
          hours_attended?: number | null;
          id?: string;
          instructor_verified_at?: string | null;
          instructor_verified_by?: string | null;
          marked_at?: string | null;
          marked_by?: string | null;
          notes?: string | null;
          organization_id?: string | null;
          override_by?: string | null;
          override_reason?: string | null;
          session_id: string;
          status?: string;
          student_id?: string | null;
          updated_at?: string;
        };
        Update: {
          absence_notification_sent_at?: string | null;
          check_in_method?: string | null;
          checked_in_at?: string | null;
          created_at?: string;
          enrollment_id?: string | null;
          hours_attended?: number | null;
          id?: string;
          instructor_verified_at?: string | null;
          instructor_verified_by?: string | null;
          marked_at?: string | null;
          marked_by?: string | null;
          notes?: string | null;
          organization_id?: string | null;
          override_by?: string | null;
          override_reason?: string | null;
          session_id?: string;
          status?: string;
          student_id?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "attendance_records_enrollment_id_fkey";
            columns: ["enrollment_id"];
            isOneToOne: false;
            referencedRelation: "enrollments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "attendance_records_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "attendance_records_session_id_fkey";
            columns: ["session_id"];
            isOneToOne: false;
            referencedRelation: "class_sessions";
            referencedColumns: ["id"];
          },
        ];
      };
      attendance_settings: {
        Row: {
          allow_kiosk_pin_backup: boolean;
          check_in_window_open_minutes: number;
          created_at: string;
          id: string;
          late_cutoff_minutes: number;
          notify_absence_email: boolean;
          notify_absence_sms: boolean;
          organization_id: string;
          qr_refresh_seconds: number;
          require_instructor_verification: boolean;
          updated_at: string;
        };
        Insert: {
          allow_kiosk_pin_backup?: boolean;
          check_in_window_open_minutes?: number;
          created_at?: string;
          id?: string;
          late_cutoff_minutes?: number;
          notify_absence_email?: boolean;
          notify_absence_sms?: boolean;
          organization_id: string;
          qr_refresh_seconds?: number;
          require_instructor_verification?: boolean;
          updated_at?: string;
        };
        Update: {
          allow_kiosk_pin_backup?: boolean;
          check_in_window_open_minutes?: number;
          created_at?: string;
          id?: string;
          late_cutoff_minutes?: number;
          notify_absence_email?: boolean;
          notify_absence_sms?: boolean;
          organization_id?: string;
          qr_refresh_seconds?: number;
          require_instructor_verification?: boolean;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "attendance_settings_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: true;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      attribution_events: {
        Row: {
          actor_user_id: string | null;
          context: string | null;
          created_at: string;
          detail: string | null;
          enrollment_id: string | null;
          event_type: string;
          id: string;
          lead_application_id: string | null;
          metadata: Json;
          new_value: string | null;
          previous_value: string | null;
          reason: string | null;
          user_id: string | null;
        };
        Insert: {
          actor_user_id?: string | null;
          context?: string | null;
          created_at?: string;
          detail?: string | null;
          enrollment_id?: string | null;
          event_type: string;
          id?: string;
          lead_application_id?: string | null;
          metadata?: Json;
          new_value?: string | null;
          previous_value?: string | null;
          reason?: string | null;
          user_id?: string | null;
        };
        Update: {
          actor_user_id?: string | null;
          context?: string | null;
          created_at?: string;
          detail?: string | null;
          enrollment_id?: string | null;
          event_type?: string;
          id?: string;
          lead_application_id?: string | null;
          metadata?: Json;
          new_value?: string | null;
          previous_value?: string | null;
          reason?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "attribution_events_enrollment_id_fkey";
            columns: ["enrollment_id"];
            isOneToOne: false;
            referencedRelation: "enrollments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "attribution_events_lead_application_id_fkey";
            columns: ["lead_application_id"];
            isOneToOne: false;
            referencedRelation: "lead_applications";
            referencedColumns: ["id"];
          },
        ];
      };
      audit_logs: {
        Row: {
          action: string;
          actor_id: string | null;
          created_at: string;
          details: string | null;
          id: string;
          metadata: Json | null;
          organization_id: string | null;
        };
        Insert: {
          action: string;
          actor_id?: string | null;
          created_at?: string;
          details?: string | null;
          id?: string;
          metadata?: Json | null;
          organization_id?: string | null;
        };
        Update: {
          action?: string;
          actor_id?: string | null;
          created_at?: string;
          details?: string | null;
          id?: string;
          metadata?: Json | null;
          organization_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "audit_logs_actor_id_fkey";
            columns: ["actor_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "audit_logs_tenant_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      auto_publish_settings: {
        Row: {
          audit_enabled: boolean;
          created_at: string;
          enabled: boolean;
          frequency: string;
          id: string;
          last_category_index: number;
          last_published_at: string | null;
          max_retries: number;
          posts_per_cycle: number;
          preferred_days: number[] | null;
          preferred_hour: number;
          updated_at: string;
        };
        Insert: {
          audit_enabled?: boolean;
          created_at?: string;
          enabled?: boolean;
          frequency?: string;
          id?: string;
          last_category_index?: number;
          last_published_at?: string | null;
          max_retries?: number;
          posts_per_cycle?: number;
          preferred_days?: number[] | null;
          preferred_hour?: number;
          updated_at?: string;
        };
        Update: {
          audit_enabled?: boolean;
          created_at?: string;
          enabled?: boolean;
          frequency?: string;
          id?: string;
          last_category_index?: number;
          last_published_at?: string | null;
          max_retries?: number;
          posts_per_cycle?: number;
          preferred_days?: number[] | null;
          preferred_hour?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      automation_triggers: {
        Row: {
          channel: string;
          created_at: string;
          error_message: string | null;
          id: string;
          lead_application_id: string | null;
          organization_id: string | null;
          payload: Json | null;
          program_id: string | null;
          sent_at: string | null;
          status: string;
          trigger_type: string;
          user_id: string;
        };
        Insert: {
          channel?: string;
          created_at?: string;
          error_message?: string | null;
          id?: string;
          lead_application_id?: string | null;
          organization_id?: string | null;
          payload?: Json | null;
          program_id?: string | null;
          sent_at?: string | null;
          status?: string;
          trigger_type: string;
          user_id: string;
        };
        Update: {
          channel?: string;
          created_at?: string;
          error_message?: string | null;
          id?: string;
          lead_application_id?: string | null;
          organization_id?: string | null;
          payload?: Json | null;
          program_id?: string | null;
          sent_at?: string | null;
          status?: string;
          trigger_type?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "automation_triggers_lead_application_id_fkey";
            columns: ["lead_application_id"];
            isOneToOne: false;
            referencedRelation: "lead_applications";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "automation_triggers_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "automation_triggers_program_id_fkey";
            columns: ["program_id"];
            isOneToOne: false;
            referencedRelation: "programs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "automation_triggers_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      backpack_events: {
        Row: {
          address: string | null;
          allow_waitlist: boolean;
          created_at: string;
          description: string | null;
          eligibility_text: string | null;
          event_date: string;
          id: string;
          image_url: string | null;
          location: string;
          pickup_times: Json;
          registration_open: boolean;
          slug: string;
          title: string;
          total_backpacks: number;
          updated_at: string;
          walkin_reserve: number;
        };
        Insert: {
          address?: string | null;
          allow_waitlist?: boolean;
          created_at?: string;
          description?: string | null;
          eligibility_text?: string | null;
          event_date: string;
          id?: string;
          image_url?: string | null;
          location?: string;
          pickup_times?: Json;
          registration_open?: boolean;
          slug: string;
          title: string;
          total_backpacks?: number;
          updated_at?: string;
          walkin_reserve?: number;
        };
        Update: {
          address?: string | null;
          allow_waitlist?: boolean;
          created_at?: string;
          description?: string | null;
          eligibility_text?: string | null;
          event_date?: string;
          id?: string;
          image_url?: string | null;
          location?: string;
          pickup_times?: Json;
          registration_open?: boolean;
          slug?: string;
          title?: string;
          total_backpacks?: number;
          updated_at?: string;
          walkin_reserve?: number;
        };
        Relationships: [];
      };
      backpack_registrations: {
        Row: {
          backpacks_requested: number;
          child_grade: string;
          child_name: string;
          confirmation_code: string;
          created_at: string;
          email: string;
          event_id: string;
          group_id: string;
          id: string;
          notes: string | null;
          parent_name: string;
          phone: string;
          picked_up_at: string | null;
          picked_up_by: string | null;
          pickup_time: string;
          school: string | null;
          sms_opt_in: boolean;
          status: string;
          updated_at: string;
        };
        Insert: {
          backpacks_requested?: number;
          child_grade: string;
          child_name: string;
          confirmation_code: string;
          created_at?: string;
          email: string;
          event_id: string;
          group_id?: string;
          id?: string;
          notes?: string | null;
          parent_name: string;
          phone: string;
          picked_up_at?: string | null;
          picked_up_by?: string | null;
          pickup_time: string;
          school?: string | null;
          sms_opt_in?: boolean;
          status?: string;
          updated_at?: string;
        };
        Update: {
          backpacks_requested?: number;
          child_grade?: string;
          child_name?: string;
          confirmation_code?: string;
          created_at?: string;
          email?: string;
          event_id?: string;
          group_id?: string;
          id?: string;
          notes?: string | null;
          parent_name?: string;
          phone?: string;
          picked_up_at?: string | null;
          picked_up_by?: string | null;
          pickup_time?: string;
          school?: string | null;
          sms_opt_in?: boolean;
          status?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "backpack_registrations_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "backpack_events";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "backpack_registrations_picked_up_by_fkey";
            columns: ["picked_up_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      blog_audit_log: {
        Row: {
          attempt_number: number;
          audit_result: string;
          authority_score: number | null;
          compliance_notes: string | null;
          created_at: string;
          has_index: boolean | null;
          id: string;
          issues: string[] | null;
          post_id: string | null;
          word_count: number | null;
        };
        Insert: {
          attempt_number?: number;
          audit_result: string;
          authority_score?: number | null;
          compliance_notes?: string | null;
          created_at?: string;
          has_index?: boolean | null;
          id?: string;
          issues?: string[] | null;
          post_id?: string | null;
          word_count?: number | null;
        };
        Update: {
          attempt_number?: number;
          audit_result?: string;
          authority_score?: number | null;
          compliance_notes?: string | null;
          created_at?: string;
          has_index?: boolean | null;
          id?: string;
          issues?: string[] | null;
          post_id?: string | null;
          word_count?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "blog_audit_log_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "blog_posts";
            referencedColumns: ["id"];
          },
        ];
      };
      blog_categories: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          name: string;
          slug: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name: string;
          slug: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name?: string;
          slug?: string;
        };
        Relationships: [];
      };
      blog_posts: {
        Row: {
          agent_type: string | null;
          author_name: string;
          author_role: string | null;
          category_id: string | null;
          content: string;
          created_at: string;
          excerpt: string | null;
          featured: boolean;
          featured_image: string | null;
          id: string;
          published_at: string | null;
          scheduled_at: string | null;
          seo_description: string | null;
          seo_keywords: string[] | null;
          seo_title: string | null;
          slug: string;
          status: string;
          subtitle: string | null;
          tags: string[] | null;
          title: string;
          updated_at: string;
        };
        Insert: {
          agent_type?: string | null;
          author_name?: string;
          author_role?: string | null;
          category_id?: string | null;
          content?: string;
          created_at?: string;
          excerpt?: string | null;
          featured?: boolean;
          featured_image?: string | null;
          id?: string;
          published_at?: string | null;
          scheduled_at?: string | null;
          seo_description?: string | null;
          seo_keywords?: string[] | null;
          seo_title?: string | null;
          slug: string;
          status?: string;
          subtitle?: string | null;
          tags?: string[] | null;
          title: string;
          updated_at?: string;
        };
        Update: {
          agent_type?: string | null;
          author_name?: string;
          author_role?: string | null;
          category_id?: string | null;
          content?: string;
          created_at?: string;
          excerpt?: string | null;
          featured?: boolean;
          featured_image?: string | null;
          id?: string;
          published_at?: string | null;
          scheduled_at?: string | null;
          seo_description?: string | null;
          seo_keywords?: string[] | null;
          seo_title?: string | null;
          slug?: string;
          status?: string;
          subtitle?: string | null;
          tags?: string[] | null;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "blog_posts_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "blog_categories";
            referencedColumns: ["id"];
          },
        ];
      };
      bundle_components: {
        Row: {
          access_type: Database["public"]["Enums"]["bundle_access_type"];
          auto_enroll: boolean;
          bundle_id: string;
          component_program_id: string;
          created_at: string;
          duration_months: number | null;
          id: string;
          price_override: number | null;
          sort_order: number;
          updated_at: string;
        };
        Insert: {
          access_type?: Database["public"]["Enums"]["bundle_access_type"];
          auto_enroll?: boolean;
          bundle_id: string;
          component_program_id: string;
          created_at?: string;
          duration_months?: number | null;
          id?: string;
          price_override?: number | null;
          sort_order?: number;
          updated_at?: string;
        };
        Update: {
          access_type?: Database["public"]["Enums"]["bundle_access_type"];
          auto_enroll?: boolean;
          bundle_id?: string;
          component_program_id?: string;
          created_at?: string;
          duration_months?: number | null;
          id?: string;
          price_override?: number | null;
          sort_order?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "bundle_components_bundle_id_fkey";
            columns: ["bundle_id"];
            isOneToOne: false;
            referencedRelation: "bundles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bundle_components_component_program_id_fkey";
            columns: ["component_program_id"];
            isOneToOne: false;
            referencedRelation: "programs";
            referencedColumns: ["id"];
          },
        ];
      };
      bundles: {
        Row: {
          active: boolean;
          consecutive_cohorts: boolean | null;
          created_at: string;
          default_installment_amount: number;
          deposit_amount: number;
          description: string | null;
          duration_label: string | null;
          excluded_features: Json | null;
          features: Json | null;
          id: string;
          interest_fee: number;
          legacy_variant_id: string | null;
          max_payments: number;
          name: string;
          organization_id: string | null;
          popular: boolean | null;
          practice_pass_count: number | null;
          practice_reserve_count: number | null;
          practice_weeks: number;
          price: number;
          sort_order: number;
          source_program_id: string;
          source_variant_id: string | null;
          updated_at: string;
        };
        Insert: {
          active?: boolean;
          consecutive_cohorts?: boolean | null;
          created_at?: string;
          default_installment_amount?: number;
          deposit_amount?: number;
          description?: string | null;
          duration_label?: string | null;
          excluded_features?: Json | null;
          features?: Json | null;
          id?: string;
          interest_fee?: number;
          legacy_variant_id?: string | null;
          max_payments?: number;
          name: string;
          organization_id?: string | null;
          popular?: boolean | null;
          practice_pass_count?: number | null;
          practice_reserve_count?: number | null;
          practice_weeks?: number;
          price?: number;
          sort_order?: number;
          source_program_id: string;
          source_variant_id?: string | null;
          updated_at?: string;
        };
        Update: {
          active?: boolean;
          consecutive_cohorts?: boolean | null;
          created_at?: string;
          default_installment_amount?: number;
          deposit_amount?: number;
          description?: string | null;
          duration_label?: string | null;
          excluded_features?: Json | null;
          features?: Json | null;
          id?: string;
          interest_fee?: number;
          legacy_variant_id?: string | null;
          max_payments?: number;
          name?: string;
          organization_id?: string | null;
          popular?: boolean | null;
          practice_pass_count?: number | null;
          practice_reserve_count?: number | null;
          practice_weeks?: number;
          price?: number;
          sort_order?: number;
          source_program_id?: string;
          source_variant_id?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "bundles_legacy_variant_id_fkey";
            columns: ["legacy_variant_id"];
            isOneToOne: false;
            referencedRelation: "program_variants";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bundles_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bundles_source_program_id_fkey";
            columns: ["source_program_id"];
            isOneToOne: false;
            referencedRelation: "programs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bundles_source_variant_id_fkey";
            columns: ["source_variant_id"];
            isOneToOne: false;
            referencedRelation: "program_variants";
            referencedColumns: ["id"];
          },
        ];
      };
      calendar_connections: {
        Row: {
          access_token: string | null;
          connected_at: string | null;
          created_at: string;
          id: string;
          organization_id: string | null;
          provider: string;
          refresh_token: string | null;
          status: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          access_token?: string | null;
          connected_at?: string | null;
          created_at?: string;
          id?: string;
          organization_id?: string | null;
          provider: string;
          refresh_token?: string | null;
          status?: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          access_token?: string | null;
          connected_at?: string | null;
          created_at?: string;
          id?: string;
          organization_id?: string | null;
          provider?: string;
          refresh_token?: string | null;
          status?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "calendar_connections_tenant_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "calendar_connections_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      calendar_holidays: {
        Row: {
          calendar_id: string;
          created_at: string;
          date: string;
          id: string;
          name: string;
          recurring: boolean;
        };
        Insert: {
          calendar_id: string;
          created_at?: string;
          date: string;
          id?: string;
          name: string;
          recurring?: boolean;
        };
        Update: {
          calendar_id?: string;
          created_at?: string;
          date?: string;
          id?: string;
          name?: string;
          recurring?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "calendar_holidays_calendar_id_fkey";
            columns: ["calendar_id"];
            isOneToOne: false;
            referencedRelation: "holiday_calendars";
            referencedColumns: ["id"];
          },
        ];
      };
      calendar_integrations: {
        Row: {
          active: boolean;
          config_json: Json;
          created_at: string;
          id: string;
          organization_id: string;
          type: string;
          updated_at: string;
        };
        Insert: {
          active?: boolean;
          config_json?: Json;
          created_at?: string;
          id?: string;
          organization_id: string;
          type: string;
          updated_at?: string;
        };
        Update: {
          active?: boolean;
          config_json?: Json;
          created_at?: string;
          id?: string;
          organization_id?: string;
          type?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "calendar_integrations_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      calendar_mappings: {
        Row: {
          calendar_integration_id: string;
          class_duration_hours: number | null;
          created_at: string;
          external_calendar_id: string | null;
          id: string;
          shift_name: string | null;
          variation_id: string;
        };
        Insert: {
          calendar_integration_id: string;
          class_duration_hours?: number | null;
          created_at?: string;
          external_calendar_id?: string | null;
          id?: string;
          shift_name?: string | null;
          variation_id: string;
        };
        Update: {
          calendar_integration_id?: string;
          class_duration_hours?: number | null;
          created_at?: string;
          external_calendar_id?: string | null;
          id?: string;
          shift_name?: string | null;
          variation_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "calendar_mappings_calendar_integration_id_fkey";
            columns: ["calendar_integration_id"];
            isOneToOne: false;
            referencedRelation: "calendar_integrations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "calendar_mappings_variation_id_fkey";
            columns: ["variation_id"];
            isOneToOne: false;
            referencedRelation: "program_variations";
            referencedColumns: ["id"];
          },
        ];
      };
      calendar_sync_jobs: {
        Row: {
          attempts: number;
          created_at: string;
          event_type: string;
          id: string;
          last_error: string | null;
          max_attempts: number;
          organization_id: string;
          payload: Json;
          processed_at: string | null;
          scheduled_for: string;
          status: string;
        };
        Insert: {
          attempts?: number;
          created_at?: string;
          event_type: string;
          id?: string;
          last_error?: string | null;
          max_attempts?: number;
          organization_id: string;
          payload?: Json;
          processed_at?: string | null;
          scheduled_for?: string;
          status?: string;
        };
        Update: {
          attempts?: number;
          created_at?: string;
          event_type?: string;
          id?: string;
          last_error?: string | null;
          max_attempts?: number;
          organization_id?: string;
          payload?: Json;
          processed_at?: string | null;
          scheduled_for?: string;
          status?: string;
        };
        Relationships: [
          {
            foreignKeyName: "calendar_sync_jobs_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      call_participants: {
        Row: {
          call_id: string;
          id: string;
          joined_at: string;
          left_at: string | null;
          user_id: string;
        };
        Insert: {
          call_id: string;
          id?: string;
          joined_at?: string;
          left_at?: string | null;
          user_id: string;
        };
        Update: {
          call_id?: string;
          id?: string;
          joined_at?: string;
          left_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "call_participants_call_id_fkey";
            columns: ["call_id"];
            isOneToOne: false;
            referencedRelation: "call_sessions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "call_participants_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      call_sessions: {
        Row: {
          call_type: Database["public"]["Enums"]["call_type"];
          conversation_id: string;
          duration_seconds: number | null;
          ended_at: string | null;
          id: string;
          started_at: string;
          started_by: string;
          status: Database["public"]["Enums"]["call_status"];
        };
        Insert: {
          call_type?: Database["public"]["Enums"]["call_type"];
          conversation_id: string;
          duration_seconds?: number | null;
          ended_at?: string | null;
          id?: string;
          started_at?: string;
          started_by: string;
          status?: Database["public"]["Enums"]["call_status"];
        };
        Update: {
          call_type?: Database["public"]["Enums"]["call_type"];
          conversation_id?: string;
          duration_seconds?: number | null;
          ended_at?: string | null;
          id?: string;
          started_at?: string;
          started_by?: string;
          status?: Database["public"]["Enums"]["call_status"];
        };
        Relationships: [
          {
            foreignKeyName: "call_sessions_conversation_id_fkey";
            columns: ["conversation_id"];
            isOneToOne: false;
            referencedRelation: "conversations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "call_sessions_started_by_fkey";
            columns: ["started_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      certificates: {
        Row: {
          certificate_number: string;
          course_id: string;
          enrollment_id: string | null;
          id: string;
          issued_at: string;
          program_name: string;
          student_name: string;
          user_id: string;
        };
        Insert: {
          certificate_number?: string;
          course_id: string;
          enrollment_id?: string | null;
          id?: string;
          issued_at?: string;
          program_name: string;
          student_name: string;
          user_id: string;
        };
        Update: {
          certificate_number?: string;
          course_id?: string;
          enrollment_id?: string | null;
          id?: string;
          issued_at?: string;
          program_name?: string;
          student_name?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "certificates_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "courses";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "certificates_enrollment_id_fkey";
            columns: ["enrollment_id"];
            isOneToOne: false;
            referencedRelation: "enrollments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "certificates_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      cf_platform_settings: {
        Row: {
          created_at: string;
          id: string;
          key: string;
          updated_at: string;
          value: Json;
        };
        Insert: {
          created_at?: string;
          id?: string;
          key: string;
          updated_at?: string;
          value?: Json;
        };
        Update: {
          created_at?: string;
          id?: string;
          key?: string;
          updated_at?: string;
          value?: Json;
        };
        Relationships: [];
      };
      cf_user_roles: {
        Row: {
          created_at: string;
          id: string;
          role: Database["public"]["Enums"]["cf_app_role"];
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          role: Database["public"]["Enums"]["cf_app_role"];
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          role?: Database["public"]["Enums"]["cf_app_role"];
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      chat_messages: {
        Row: {
          attachments: Json;
          content: string | null;
          created_at: string;
          id: string;
          metadata: Json;
          organization_id: string;
          parts: Json;
          role: string;
          thread_id: string;
          user_id: string | null;
        };
        Insert: {
          attachments?: Json;
          content?: string | null;
          created_at?: string;
          id?: string;
          metadata?: Json;
          organization_id: string;
          parts?: Json;
          role: string;
          thread_id: string;
          user_id?: string | null;
        };
        Update: {
          attachments?: Json;
          content?: string | null;
          created_at?: string;
          id?: string;
          metadata?: Json;
          organization_id?: string;
          parts?: Json;
          role?: string;
          thread_id?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "chat_messages_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "chat_messages_thread_id_fkey";
            columns: ["thread_id"];
            isOneToOne: false;
            referencedRelation: "chat_threads";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "chat_messages_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "app_users";
            referencedColumns: ["id"];
          },
        ];
      };
      chat_ownerships: {
        Row: {
          created_at: string;
          id: string;
          user_id: string;
          v0_chat_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          user_id: string;
          v0_chat_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          user_id?: string;
          v0_chat_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "chat_ownerships_user_id_users_id_fk";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      chat_threads: {
        Row: {
          created_at: string;
          id: string;
          organization_id: string;
          title: string | null;
          updated_at: string;
          user_id: string | null;
          visibility: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          organization_id: string;
          title?: string | null;
          updated_at?: string;
          user_id?: string | null;
          visibility?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          organization_id?: string;
          title?: string | null;
          updated_at?: string;
          user_id?: string | null;
          visibility?: string;
        };
        Relationships: [
          {
            foreignKeyName: "chat_threads_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "chat_threads_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "app_users";
            referencedColumns: ["id"];
          },
        ];
      };
      chroniis_board_presentations: {
        Row: {
          automations: Json;
          columns: Json;
          created_at: string;
          groups: Json;
          id: string;
          org_id: string;
          project_id: string;
          updated_at: string;
          views: Json;
        };
        Insert: {
          automations?: Json;
          columns?: Json;
          created_at?: string;
          groups?: Json;
          id?: string;
          org_id: string;
          project_id: string;
          updated_at?: string;
          views?: Json;
        };
        Update: {
          automations?: Json;
          columns?: Json;
          created_at?: string;
          groups?: Json;
          id?: string;
          org_id?: string;
          project_id?: string;
          updated_at?: string;
          views?: Json;
        };
        Relationships: [
          {
            foreignKeyName: "chroniis_board_presentations_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "chroniis_board_presentations_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "ao_intel_projects";
            referencedColumns: ["id"];
          },
        ];
      };
      class_sessions: {
        Row: {
          classroom: string | null;
          cohort_id: string | null;
          created_at: string;
          end_time: string;
          id: string;
          instructor_name: string | null;
          notes: string | null;
          organization_id: string | null;
          program_id: string;
          room_id: string | null;
          schedule_version: number | null;
          session_date: string;
          session_type: string;
          start_time: string;
          status: string;
          updated_at: string;
          zoom_link: string | null;
        };
        Insert: {
          classroom?: string | null;
          cohort_id?: string | null;
          created_at?: string;
          end_time: string;
          id?: string;
          instructor_name?: string | null;
          notes?: string | null;
          organization_id?: string | null;
          program_id: string;
          room_id?: string | null;
          schedule_version?: number | null;
          session_date: string;
          session_type?: string;
          start_time: string;
          status?: string;
          updated_at?: string;
          zoom_link?: string | null;
        };
        Update: {
          classroom?: string | null;
          cohort_id?: string | null;
          created_at?: string;
          end_time?: string;
          id?: string;
          instructor_name?: string | null;
          notes?: string | null;
          organization_id?: string | null;
          program_id?: string;
          room_id?: string | null;
          schedule_version?: number | null;
          session_date?: string;
          session_type?: string;
          start_time?: string;
          status?: string;
          updated_at?: string;
          zoom_link?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "class_sessions_cohort_id_fkey";
            columns: ["cohort_id"];
            isOneToOne: false;
            referencedRelation: "cohorts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "class_sessions_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "class_sessions_program_id_fkey";
            columns: ["program_id"];
            isOneToOne: false;
            referencedRelation: "programs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "class_sessions_room_id_fkey";
            columns: ["room_id"];
            isOneToOne: false;
            referencedRelation: "rooms";
            referencedColumns: ["id"];
          },
        ];
      };
      classrooms: {
        Row: {
          active: boolean;
          capacity: number;
          created_at: string;
          description: string | null;
          id: string;
          location: string | null;
          name: string;
          organization_id: string | null;
          sort_order: number;
          updated_at: string;
        };
        Insert: {
          active?: boolean;
          capacity?: number;
          created_at?: string;
          description?: string | null;
          id?: string;
          location?: string | null;
          name: string;
          organization_id?: string | null;
          sort_order?: number;
          updated_at?: string;
        };
        Update: {
          active?: boolean;
          capacity?: number;
          created_at?: string;
          description?: string | null;
          id?: string;
          location?: string | null;
          name?: string;
          organization_id?: string | null;
          sort_order?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "classrooms_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      clerk_import_queue: {
        Row: {
          attempted_at: string | null;
          clerk_user_id: string | null;
          email: string;
          error: string | null;
          first_name: string | null;
          http_status: number | null;
          last_name: string | null;
          status: string;
          user_id: string;
        };
        Insert: {
          attempted_at?: string | null;
          clerk_user_id?: string | null;
          email: string;
          error?: string | null;
          first_name?: string | null;
          http_status?: number | null;
          last_name?: string | null;
          status?: string;
          user_id: string;
        };
        Update: {
          attempted_at?: string | null;
          clerk_user_id?: string | null;
          email?: string;
          error?: string | null;
          first_name?: string | null;
          http_status?: number | null;
          last_name?: string | null;
          status?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      client_assignments: {
        Row: {
          client_id: string | null;
          created_at: string | null;
          id: string;
          status: string | null;
          taxpro_id: string | null;
        };
        Insert: {
          client_id?: string | null;
          created_at?: string | null;
          id?: string;
          status?: string | null;
          taxpro_id?: string | null;
        };
        Update: {
          client_id?: string | null;
          created_at?: string | null;
          id?: string;
          status?: string | null;
          taxpro_id?: string | null;
        };
        Relationships: [];
      };
      client_error_logs: {
        Row: {
          ai_attempted_at: string | null;
          ai_diagnosis: string | null;
          ai_suggested_fix: string | null;
          context: Json | null;
          error_type: string;
          first_seen_at: string;
          id: string;
          last_notified_at_occurrence: number;
          last_remediation_at: string | null;
          last_seen_at: string;
          message: string;
          occurrence_count: number;
          recommended_action: string | null;
          remediation_count: number;
          resolved_at: string | null;
          resolved_by: string | null;
          route: string | null;
          session_id: string | null;
          source: string | null;
          stack: string | null;
          status: string;
          user_agent: string | null;
          user_id: string | null;
        };
        Insert: {
          ai_attempted_at?: string | null;
          ai_diagnosis?: string | null;
          ai_suggested_fix?: string | null;
          context?: Json | null;
          error_type?: string;
          first_seen_at?: string;
          id?: string;
          last_notified_at_occurrence?: number;
          last_remediation_at?: string | null;
          last_seen_at?: string;
          message: string;
          occurrence_count?: number;
          recommended_action?: string | null;
          remediation_count?: number;
          resolved_at?: string | null;
          resolved_by?: string | null;
          route?: string | null;
          session_id?: string | null;
          source?: string | null;
          stack?: string | null;
          status?: string;
          user_agent?: string | null;
          user_id?: string | null;
        };
        Update: {
          ai_attempted_at?: string | null;
          ai_diagnosis?: string | null;
          ai_suggested_fix?: string | null;
          context?: Json | null;
          error_type?: string;
          first_seen_at?: string;
          id?: string;
          last_notified_at_occurrence?: number;
          last_remediation_at?: string | null;
          last_seen_at?: string;
          message?: string;
          occurrence_count?: number;
          recommended_action?: string | null;
          remediation_count?: number;
          resolved_at?: string | null;
          resolved_by?: string | null;
          route?: string | null;
          session_id?: string | null;
          source?: string | null;
          stack?: string | null;
          status?: string;
          user_agent?: string | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
      cohort_instructor_assignments: {
        Row: {
          created_at: string;
          effective_end_date: string | null;
          effective_start_date: string;
          generated_cohort_id: string;
          id: string;
          instructor_id: string;
          organization_id: string;
        };
        Insert: {
          created_at?: string;
          effective_end_date?: string | null;
          effective_start_date: string;
          generated_cohort_id: string;
          id?: string;
          instructor_id: string;
          organization_id: string;
        };
        Update: {
          created_at?: string;
          effective_end_date?: string | null;
          effective_start_date?: string;
          generated_cohort_id?: string;
          id?: string;
          instructor_id?: string;
          organization_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "cohort_instructor_assignments_generated_cohort_id_fkey";
            columns: ["generated_cohort_id"];
            isOneToOne: false;
            referencedRelation: "generated_cohorts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "cohort_instructor_assignments_instructor_id_fkey";
            columns: ["instructor_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "cohort_instructor_assignments_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      cohort_instructors: {
        Row: {
          cohort_id: string;
          created_at: string;
          id: string;
          instructor_id: string;
          organization_id: string | null;
          role: string;
        };
        Insert: {
          cohort_id: string;
          created_at?: string;
          id?: string;
          instructor_id: string;
          organization_id?: string | null;
          role?: string;
        };
        Update: {
          cohort_id?: string;
          created_at?: string;
          id?: string;
          instructor_id?: string;
          organization_id?: string | null;
          role?: string;
        };
        Relationships: [
          {
            foreignKeyName: "cohort_instructors_cohort_id_fkey";
            columns: ["cohort_id"];
            isOneToOne: false;
            referencedRelation: "cohorts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "cohort_instructors_instructor_id_fkey";
            columns: ["instructor_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "cohort_instructors_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      cohort_session_overrides: {
        Row: {
          created_at: string;
          created_by: string | null;
          id: string;
          new_date: string | null;
          new_duration: number | null;
          new_start_time: string | null;
          override_type: string;
          reason: string | null;
          session_id: string;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          id?: string;
          new_date?: string | null;
          new_duration?: number | null;
          new_start_time?: string | null;
          override_type: string;
          reason?: string | null;
          session_id: string;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          id?: string;
          new_date?: string | null;
          new_duration?: number | null;
          new_start_time?: string | null;
          override_type?: string;
          reason?: string | null;
          session_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "cohort_session_overrides_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "cohort_session_overrides_session_id_fkey";
            columns: ["session_id"];
            isOneToOne: false;
            referencedRelation: "cohort_sessions";
            referencedColumns: ["id"];
          },
        ];
      };
      cohort_sessions: {
        Row: {
          cohort_id: string;
          date: string;
          duration_hours: number;
          id: string;
          lesson_plan_id: string | null;
          session_number: number;
          session_type: string;
          start_time: string;
          timezone: string;
        };
        Insert: {
          cohort_id: string;
          date: string;
          duration_hours: number;
          id?: string;
          lesson_plan_id?: string | null;
          session_number: number;
          session_type?: string;
          start_time: string;
          timezone?: string;
        };
        Update: {
          cohort_id?: string;
          date?: string;
          duration_hours?: number;
          id?: string;
          lesson_plan_id?: string | null;
          session_number?: number;
          session_type?: string;
          start_time?: string;
          timezone?: string;
        };
        Relationships: [
          {
            foreignKeyName: "cohort_sessions_cohort_id_fkey";
            columns: ["cohort_id"];
            isOneToOne: false;
            referencedRelation: "cohorts";
            referencedColumns: ["id"];
          },
        ];
      };
      cohorts: {
        Row: {
          classroom_id: string | null;
          created_at: string;
          created_via: string | null;
          curriculum_hours_snapshot: number;
          end_date: string | null;
          enrolled_count: number;
          event_time: string | null;
          generated: boolean;
          generator_version: number;
          ghl_event_id: string | null;
          id: string;
          locked: boolean;
          max_seats: number;
          organization_id: string | null;
          program_id: string;
          schedule_tag: string | null;
          schedule_tag_override: boolean;
          schedule_template_id: string | null;
          schedule_version: number;
          start_date: string;
          status: string;
          template_snapshot: Json;
          updated_at: string;
          variation_id: string | null;
        };
        Insert: {
          classroom_id?: string | null;
          created_at?: string;
          created_via?: string | null;
          curriculum_hours_snapshot: number;
          end_date?: string | null;
          enrolled_count?: number;
          event_time?: string | null;
          generated?: boolean;
          generator_version?: number;
          ghl_event_id?: string | null;
          id?: string;
          locked?: boolean;
          max_seats?: number;
          organization_id?: string | null;
          program_id: string;
          schedule_tag?: string | null;
          schedule_tag_override?: boolean;
          schedule_template_id?: string | null;
          schedule_version?: number;
          start_date: string;
          status?: string;
          template_snapshot?: Json;
          updated_at?: string;
          variation_id?: string | null;
        };
        Update: {
          classroom_id?: string | null;
          created_at?: string;
          created_via?: string | null;
          curriculum_hours_snapshot?: number;
          end_date?: string | null;
          enrolled_count?: number;
          event_time?: string | null;
          generated?: boolean;
          generator_version?: number;
          ghl_event_id?: string | null;
          id?: string;
          locked?: boolean;
          max_seats?: number;
          organization_id?: string | null;
          program_id?: string;
          schedule_tag?: string | null;
          schedule_tag_override?: boolean;
          schedule_template_id?: string | null;
          schedule_version?: number;
          start_date?: string;
          status?: string;
          template_snapshot?: Json;
          updated_at?: string;
          variation_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "cohorts_classroom_id_fkey";
            columns: ["classroom_id"];
            isOneToOne: false;
            referencedRelation: "classrooms";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "cohorts_classroom_id_fkey";
            columns: ["classroom_id"];
            isOneToOne: false;
            referencedRelation: "v_classroom_load";
            referencedColumns: ["classroom_id"];
          },
          {
            foreignKeyName: "cohorts_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "cohorts_program_id_fkey";
            columns: ["program_id"];
            isOneToOne: false;
            referencedRelation: "programs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "cohorts_schedule_template_id_fkey";
            columns: ["schedule_template_id"];
            isOneToOne: false;
            referencedRelation: "schedule_templates";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "cohorts_variation_id_fkey";
            columns: ["variation_id"];
            isOneToOne: false;
            referencedRelation: "program_variations";
            referencedColumns: ["id"];
          },
        ];
      };
      community_messages: {
        Row: {
          attachments: Json | null;
          content: string | null;
          conversation_id: string;
          created_at: string;
          deleted_at: string | null;
          id: string;
          is_edited: boolean;
          reply_to_id: string | null;
          sender_id: string;
          type: Database["public"]["Enums"]["message_type"];
          updated_at: string;
        };
        Insert: {
          attachments?: Json | null;
          content?: string | null;
          conversation_id: string;
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          is_edited?: boolean;
          reply_to_id?: string | null;
          sender_id: string;
          type?: Database["public"]["Enums"]["message_type"];
          updated_at?: string;
        };
        Update: {
          attachments?: Json | null;
          content?: string | null;
          conversation_id?: string;
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          is_edited?: boolean;
          reply_to_id?: string | null;
          sender_id?: string;
          type?: Database["public"]["Enums"]["message_type"];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "community_messages_conversation_id_fkey";
            columns: ["conversation_id"];
            isOneToOne: false;
            referencedRelation: "conversations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "community_messages_reply_to_id_fkey";
            columns: ["reply_to_id"];
            isOneToOne: false;
            referencedRelation: "community_messages";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "community_messages_sender_id_fkey";
            columns: ["sender_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      components: {
        Row: {
          code: string | null;
          compiled_css: string | null;
          component_names: Json;
          component_slug: string;
          created_at: string | null;
          demo_code: string | null;
          demo_dependencies: Json | null;
          demo_direct_registry_dependencies: Json | null;
          dependencies: Json | null;
          description: string | null;
          direct_registry_dependencies: Json | null;
          downloads_count: number | null;
          global_css_extension: string | null;
          id: number;
          is_paid: boolean | null;
          is_public: boolean | null;
          likes_count: number | null;
          name: string;
          payment_url: string | null;
          preview_url: string;
          tailwind_config_extension: string | null;
          updated_at: string | null;
        };
        Insert: {
          code?: string | null;
          compiled_css?: string | null;
          component_names: Json;
          component_slug: string;
          created_at?: string | null;
          demo_code?: string | null;
          demo_dependencies?: Json | null;
          demo_direct_registry_dependencies?: Json | null;
          dependencies?: Json | null;
          description?: string | null;
          direct_registry_dependencies?: Json | null;
          downloads_count?: number | null;
          global_css_extension?: string | null;
          id: number;
          is_paid?: boolean | null;
          is_public?: boolean | null;
          likes_count?: number | null;
          name: string;
          payment_url?: string | null;
          preview_url: string;
          tailwind_config_extension?: string | null;
          updated_at?: string | null;
        };
        Update: {
          code?: string | null;
          compiled_css?: string | null;
          component_names?: Json;
          component_slug?: string;
          created_at?: string | null;
          demo_code?: string | null;
          demo_dependencies?: Json | null;
          demo_direct_registry_dependencies?: Json | null;
          dependencies?: Json | null;
          description?: string | null;
          direct_registry_dependencies?: Json | null;
          downloads_count?: number | null;
          global_css_extension?: string | null;
          id?: number;
          is_paid?: boolean | null;
          is_public?: boolean | null;
          likes_count?: number | null;
          name?: string;
          payment_url?: string | null;
          preview_url?: string;
          tailwind_config_extension?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      connected_accounts: {
        Row: {
          created_at: string;
          external_user_id: string | null;
          id: string;
          metadata: Json;
          organization_id: string;
          provider: string;
          provider_account_id: string | null;
          status: string;
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          external_user_id?: string | null;
          id?: string;
          metadata?: Json;
          organization_id: string;
          provider: string;
          provider_account_id?: string | null;
          status?: string;
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          external_user_id?: string | null;
          id?: string;
          metadata?: Json;
          organization_id?: string;
          provider?: string;
          provider_account_id?: string | null;
          status?: string;
          updated_at?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "connected_accounts_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "connected_accounts_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "app_users";
            referencedColumns: ["id"];
          },
        ];
      };
      conversation_members: {
        Row: {
          conversation_id: string;
          id: string;
          is_muted: boolean;
          joined_at: string;
          last_read_at: string;
          notifications_enabled: boolean;
          role: Database["public"]["Enums"]["member_role"];
          user_id: string;
        };
        Insert: {
          conversation_id: string;
          id?: string;
          is_muted?: boolean;
          joined_at?: string;
          last_read_at?: string;
          notifications_enabled?: boolean;
          role?: Database["public"]["Enums"]["member_role"];
          user_id: string;
        };
        Update: {
          conversation_id?: string;
          id?: string;
          is_muted?: boolean;
          joined_at?: string;
          last_read_at?: string;
          notifications_enabled?: boolean;
          role?: Database["public"]["Enums"]["member_role"];
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "conversation_members_conversation_id_fkey";
            columns: ["conversation_id"];
            isOneToOne: false;
            referencedRelation: "conversations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "conversation_members_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      conversations: {
        Row: {
          avatar_url: string | null;
          cohort_id: string | null;
          created_at: string;
          created_by: string | null;
          description: string | null;
          id: string;
          is_archived: boolean;
          name: string | null;
          pinned_message_id: string | null;
          program_id: string | null;
          type: Database["public"]["Enums"]["conversation_type"];
          updated_at: string;
        };
        Insert: {
          avatar_url?: string | null;
          cohort_id?: string | null;
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          id?: string;
          is_archived?: boolean;
          name?: string | null;
          pinned_message_id?: string | null;
          program_id?: string | null;
          type: Database["public"]["Enums"]["conversation_type"];
          updated_at?: string;
        };
        Update: {
          avatar_url?: string | null;
          cohort_id?: string | null;
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          id?: string;
          is_archived?: boolean;
          name?: string | null;
          pinned_message_id?: string | null;
          program_id?: string | null;
          type?: Database["public"]["Enums"]["conversation_type"];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "conversations_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "conversations_program_id_fkey";
            columns: ["program_id"];
            isOneToOne: false;
            referencedRelation: "programs";
            referencedColumns: ["id"];
          },
        ];
      };
      course_sections: {
        Row: {
          course_id: string;
          created_at: string;
          id: string;
          sequence_order: number;
          title: string;
        };
        Insert: {
          course_id: string;
          created_at?: string;
          id?: string;
          sequence_order?: number;
          title: string;
        };
        Update: {
          course_id?: string;
          created_at?: string;
          id?: string;
          sequence_order?: number;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "course_sections_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "courses";
            referencedColumns: ["id"];
          },
        ];
      };
      courses: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          organization_id: string | null;
          program_id: string;
          status: string;
          thumbnail_url: string | null;
          title: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          organization_id?: string | null;
          program_id: string;
          status?: string;
          thumbnail_url?: string | null;
          title: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          organization_id?: string | null;
          program_id?: string;
          status?: string;
          thumbnail_url?: string | null;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "courses_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "courses_program_id_fkey";
            columns: ["program_id"];
            isOneToOne: false;
            referencedRelation: "programs";
            referencedColumns: ["id"];
          },
        ];
      };
      crm_appointments: {
        Row: {
          appointment_type: string;
          created_at: string;
          ghl_appointment_id: string | null;
          ghl_contact_id: string | null;
          id: string;
          integration_id: string | null;
          lead_application_id: string | null;
          metadata: Json;
          order_id: string | null;
          profile_id: string | null;
          scheduled_at: string;
          source: string | null;
          status: string;
          updated_at: string;
        };
        Insert: {
          appointment_type?: string;
          created_at?: string;
          ghl_appointment_id?: string | null;
          ghl_contact_id?: string | null;
          id?: string;
          integration_id?: string | null;
          lead_application_id?: string | null;
          metadata?: Json;
          order_id?: string | null;
          profile_id?: string | null;
          scheduled_at: string;
          source?: string | null;
          status?: string;
          updated_at?: string;
        };
        Update: {
          appointment_type?: string;
          created_at?: string;
          ghl_appointment_id?: string | null;
          ghl_contact_id?: string | null;
          id?: string;
          integration_id?: string | null;
          lead_application_id?: string | null;
          metadata?: Json;
          order_id?: string | null;
          profile_id?: string | null;
          scheduled_at?: string;
          source?: string | null;
          status?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "crm_appointments_integration_id_fkey";
            columns: ["integration_id"];
            isOneToOne: false;
            referencedRelation: "integrations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "crm_appointments_lead_application_id_fkey";
            columns: ["lead_application_id"];
            isOneToOne: false;
            referencedRelation: "lead_applications";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "crm_appointments_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "crm_appointments_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      crm_enroll_retry_queue: {
        Row: {
          attempt_count: number;
          created_at: string;
          email: string | null;
          error_reason: string;
          id: string;
          last_attempt_at: string | null;
          last_error: string | null;
          max_attempts: number;
          next_attempt_at: string;
          payload: Json;
          program_code: string | null;
          resolved_enrollment_id: string | null;
          status: string;
          target_date: string | null;
          updated_at: string;
        };
        Insert: {
          attempt_count?: number;
          created_at?: string;
          email?: string | null;
          error_reason: string;
          id?: string;
          last_attempt_at?: string | null;
          last_error?: string | null;
          max_attempts?: number;
          next_attempt_at?: string;
          payload: Json;
          program_code?: string | null;
          resolved_enrollment_id?: string | null;
          status?: string;
          target_date?: string | null;
          updated_at?: string;
        };
        Update: {
          attempt_count?: number;
          created_at?: string;
          email?: string | null;
          error_reason?: string;
          id?: string;
          last_attempt_at?: string | null;
          last_error?: string | null;
          max_attempts?: number;
          next_attempt_at?: string;
          payload?: Json;
          program_code?: string | null;
          resolved_enrollment_id?: string | null;
          status?: string;
          target_date?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "crm_enroll_retry_queue_resolved_enrollment_id_fkey";
            columns: ["resolved_enrollment_id"];
            isOneToOne: false;
            referencedRelation: "enrollments";
            referencedColumns: ["id"];
          },
        ];
      };
      cta_config: {
        Row: {
          admin_notes: string | null;
          created_at: string;
          destination_target: string;
          destination_type: Database["public"]["Enums"]["cta_destination_type"];
          display_label: string;
          flow_id: string | null;
          flow_variant: string | null;
          headline_template: string | null;
          id: string;
          internal_name: string;
          is_active: boolean;
          organization_id: string | null;
          page_scope: string[];
          program_scope: string[];
          sort_order: number;
          subheadline_template: string | null;
          tracking_event_name: string;
          updated_at: string;
        };
        Insert: {
          admin_notes?: string | null;
          created_at?: string;
          destination_target: string;
          destination_type: Database["public"]["Enums"]["cta_destination_type"];
          display_label: string;
          flow_id?: string | null;
          flow_variant?: string | null;
          headline_template?: string | null;
          id?: string;
          internal_name: string;
          is_active?: boolean;
          organization_id?: string | null;
          page_scope?: string[];
          program_scope?: string[];
          sort_order?: number;
          subheadline_template?: string | null;
          tracking_event_name: string;
          updated_at?: string;
        };
        Update: {
          admin_notes?: string | null;
          created_at?: string;
          destination_target?: string;
          destination_type?: Database["public"]["Enums"]["cta_destination_type"];
          display_label?: string;
          flow_id?: string | null;
          flow_variant?: string | null;
          headline_template?: string | null;
          id?: string;
          internal_name?: string;
          is_active?: boolean;
          organization_id?: string | null;
          page_scope?: string[];
          program_scope?: string[];
          sort_order?: number;
          subheadline_template?: string | null;
          tracking_event_name?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "cta_config_flow_id_fkey";
            columns: ["flow_id"];
            isOneToOne: false;
            referencedRelation: "flows";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "cta_config_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      discount_codes: {
        Row: {
          active: boolean;
          amount_off: number | null;
          approved_by: string | null;
          code: string;
          created_at: string;
          created_by: string | null;
          description: string | null;
          id: string;
          percent_off: number | null;
        };
        Insert: {
          active?: boolean;
          amount_off?: number | null;
          approved_by?: string | null;
          code: string;
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          id?: string;
          percent_off?: number | null;
        };
        Update: {
          active?: boolean;
          amount_off?: number | null;
          approved_by?: string | null;
          code?: string;
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          id?: string;
          percent_off?: number | null;
        };
        Relationships: [];
      };
      documents: {
        Row: {
          category: string;
          client_id: string | null;
          created_at: string;
          file_name: string;
          file_type: string | null;
          file_url: string;
          id: string;
          organization_id: string | null;
          status: string;
          updated_at: string;
          uploaded_by: string;
        };
        Insert: {
          category?: string;
          client_id?: string | null;
          created_at?: string;
          file_name: string;
          file_type?: string | null;
          file_url: string;
          id?: string;
          organization_id?: string | null;
          status?: string;
          updated_at?: string;
          uploaded_by: string;
        };
        Update: {
          category?: string;
          client_id?: string | null;
          created_at?: string;
          file_name?: string;
          file_type?: string | null;
          file_url?: string;
          id?: string;
          organization_id?: string | null;
          status?: string;
          updated_at?: string;
          uploaded_by?: string;
        };
        Relationships: [
          {
            foreignKeyName: "documents_client_id_fkey";
            columns: ["client_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "documents_tenant_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "documents_uploaded_by_fkey";
            columns: ["uploaded_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      email_templates: {
        Row: {
          body_html: string;
          body_text: string;
          created_at: string;
          id: string;
          is_active: boolean;
          name: string;
          organization_id: string | null;
          subject: string;
          updated_at: string;
          variables: Json;
        };
        Insert: {
          body_html?: string;
          body_text?: string;
          created_at?: string;
          id?: string;
          is_active?: boolean;
          name: string;
          organization_id?: string | null;
          subject: string;
          updated_at?: string;
          variables?: Json;
        };
        Update: {
          body_html?: string;
          body_text?: string;
          created_at?: string;
          id?: string;
          is_active?: boolean;
          name?: string;
          organization_id?: string | null;
          subject?: string;
          updated_at?: string;
          variables?: Json;
        };
        Relationships: [
          {
            foreignKeyName: "email_templates_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      enrollment_agreements: {
        Row: {
          content_snapshot: Json;
          created_at: string;
          document_id: string;
          enrollment_id: string | null;
          id: string;
          institution_rep_name: string | null;
          institution_rep_signed_at: string | null;
          ip_address: string | null;
          order_id: string | null;
          organization_id: string | null;
          pdf_url: string | null;
          signed_at: string;
          student_name: string;
          template_id: string | null;
          template_version: string;
          user_id: string | null;
        };
        Insert: {
          content_snapshot?: Json;
          created_at?: string;
          document_id: string;
          enrollment_id?: string | null;
          id?: string;
          institution_rep_name?: string | null;
          institution_rep_signed_at?: string | null;
          ip_address?: string | null;
          order_id?: string | null;
          organization_id?: string | null;
          pdf_url?: string | null;
          signed_at?: string;
          student_name: string;
          template_id?: string | null;
          template_version?: string;
          user_id?: string | null;
        };
        Update: {
          content_snapshot?: Json;
          created_at?: string;
          document_id?: string;
          enrollment_id?: string | null;
          id?: string;
          institution_rep_name?: string | null;
          institution_rep_signed_at?: string | null;
          ip_address?: string | null;
          order_id?: string | null;
          organization_id?: string | null;
          pdf_url?: string | null;
          signed_at?: string;
          student_name?: string;
          template_id?: string | null;
          template_version?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "enrollment_agreements_enrollment_id_fkey";
            columns: ["enrollment_id"];
            isOneToOne: false;
            referencedRelation: "enrollments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "enrollment_agreements_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "enrollment_agreements_template_id_fkey";
            columns: ["template_id"];
            isOneToOne: false;
            referencedRelation: "agreement_templates";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "enrollment_agreements_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      enrollment_applications: {
        Row: {
          accepted_at: string | null;
          applied_at: string | null;
          cohort_id: string | null;
          created_at: string;
          email: string;
          enrolled_at: string | null;
          first_name: string | null;
          id: string;
          last_name: string | null;
          notes: string | null;
          organization_id: string | null;
          phone: string | null;
          program_id: string;
          status: string;
          updated_at: string;
          user_id: string | null;
          variation_id: string | null;
        };
        Insert: {
          accepted_at?: string | null;
          applied_at?: string | null;
          cohort_id?: string | null;
          created_at?: string;
          email: string;
          enrolled_at?: string | null;
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
          notes?: string | null;
          organization_id?: string | null;
          phone?: string | null;
          program_id: string;
          status?: string;
          updated_at?: string;
          user_id?: string | null;
          variation_id?: string | null;
        };
        Update: {
          accepted_at?: string | null;
          applied_at?: string | null;
          cohort_id?: string | null;
          created_at?: string;
          email?: string;
          enrolled_at?: string | null;
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
          notes?: string | null;
          organization_id?: string | null;
          phone?: string | null;
          program_id?: string;
          status?: string;
          updated_at?: string;
          user_id?: string | null;
          variation_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "enrollment_applications_cohort_id_fkey";
            columns: ["cohort_id"];
            isOneToOne: false;
            referencedRelation: "cohorts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "enrollment_applications_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "enrollment_applications_program_id_fkey";
            columns: ["program_id"];
            isOneToOne: false;
            referencedRelation: "programs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "enrollment_applications_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "enrollment_applications_variation_id_fkey";
            columns: ["variation_id"];
            isOneToOne: false;
            referencedRelation: "program_variations";
            referencedColumns: ["id"];
          },
        ];
      };
      enrollment_keys: {
        Row: {
          code: string;
          created_at: string;
          expires_at: string;
          id: string;
          issued_at: string;
          notes: string | null;
          organization_id: string | null;
          owner_user_id: string;
          program_id: string;
          redeemed_at: string | null;
          redeemed_cohort_id: string | null;
          redeemed_enrollment_id: string | null;
          revoked_at: string | null;
          revoked_reason: string | null;
          source: Database["public"]["Enums"]["enrollment_key_source"];
          source_enrollment_id: string | null;
          source_order_id: string | null;
          status: Database["public"]["Enums"]["enrollment_key_status"];
          updated_at: string;
          value_cents: number;
          variant_id: string | null;
        };
        Insert: {
          code: string;
          created_at?: string;
          expires_at?: string;
          id?: string;
          issued_at?: string;
          notes?: string | null;
          organization_id?: string | null;
          owner_user_id: string;
          program_id: string;
          redeemed_at?: string | null;
          redeemed_cohort_id?: string | null;
          redeemed_enrollment_id?: string | null;
          revoked_at?: string | null;
          revoked_reason?: string | null;
          source: Database["public"]["Enums"]["enrollment_key_source"];
          source_enrollment_id?: string | null;
          source_order_id?: string | null;
          status?: Database["public"]["Enums"]["enrollment_key_status"];
          updated_at?: string;
          value_cents?: number;
          variant_id?: string | null;
        };
        Update: {
          code?: string;
          created_at?: string;
          expires_at?: string;
          id?: string;
          issued_at?: string;
          notes?: string | null;
          organization_id?: string | null;
          owner_user_id?: string;
          program_id?: string;
          redeemed_at?: string | null;
          redeemed_cohort_id?: string | null;
          redeemed_enrollment_id?: string | null;
          revoked_at?: string | null;
          revoked_reason?: string | null;
          source?: Database["public"]["Enums"]["enrollment_key_source"];
          source_enrollment_id?: string | null;
          source_order_id?: string | null;
          status?: Database["public"]["Enums"]["enrollment_key_status"];
          updated_at?: string;
          value_cents?: number;
          variant_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "enrollment_keys_program_id_fkey";
            columns: ["program_id"];
            isOneToOne: false;
            referencedRelation: "programs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "enrollment_keys_redeemed_cohort_id_fkey";
            columns: ["redeemed_cohort_id"];
            isOneToOne: false;
            referencedRelation: "cohorts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "enrollment_keys_redeemed_enrollment_id_fkey";
            columns: ["redeemed_enrollment_id"];
            isOneToOne: false;
            referencedRelation: "enrollments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "enrollment_keys_source_enrollment_id_fkey";
            columns: ["source_enrollment_id"];
            isOneToOne: false;
            referencedRelation: "enrollments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "enrollment_keys_variant_id_fkey";
            columns: ["variant_id"];
            isOneToOne: false;
            referencedRelation: "program_variants";
            referencedColumns: ["id"];
          },
        ];
      };
      enrollments: {
        Row: {
          actual_end_date: string | null;
          amount_paid: number;
          bundle_id: string | null;
          certificate_url: string | null;
          certification_status: string;
          cohort_id: string | null;
          created_at: string;
          declared_source: string | null;
          discount_amount: number;
          enrollment_channel: string | null;
          enrollment_date: string;
          enrollment_kind: string;
          eventbrite_attendee_id: string | null;
          expected_end_date: string | null;
          flow_id: string | null;
          id: string;
          import_batch_id: string | null;
          instructor_name: string | null;
          lead_application_id: string | null;
          list_price: number;
          notes: string | null;
          organization_id: string | null;
          parent_enrollment_id: string | null;
          pass_number: number | null;
          payment_status: string;
          pending_reserve_key: boolean;
          program_id: string;
          progress_pct: number;
          reservation_expires_at: string | null;
          reservation_extended: boolean | null;
          reserved_at: string | null;
          status: string;
          subscription_expires_at: string | null;
          subscription_started_at: string | null;
          subscription_type: string | null;
          suspended: boolean;
          suspended_at: string | null;
          suspended_by: string | null;
          suspended_reason: string | null;
          total_tuition: number;
          trusted_source: string | null;
          trusted_source_reason: string | null;
          updated_at: string;
          user_id: string;
          variant_id: string | null;
        };
        Insert: {
          actual_end_date?: string | null;
          amount_paid?: number;
          bundle_id?: string | null;
          certificate_url?: string | null;
          certification_status?: string;
          cohort_id?: string | null;
          created_at?: string;
          declared_source?: string | null;
          discount_amount?: number;
          enrollment_channel?: string | null;
          enrollment_date?: string;
          enrollment_kind?: string;
          eventbrite_attendee_id?: string | null;
          expected_end_date?: string | null;
          flow_id?: string | null;
          id?: string;
          import_batch_id?: string | null;
          instructor_name?: string | null;
          lead_application_id?: string | null;
          list_price?: number;
          notes?: string | null;
          organization_id?: string | null;
          parent_enrollment_id?: string | null;
          pass_number?: number | null;
          payment_status?: string;
          pending_reserve_key?: boolean;
          program_id: string;
          progress_pct?: number;
          reservation_expires_at?: string | null;
          reservation_extended?: boolean | null;
          reserved_at?: string | null;
          status?: string;
          subscription_expires_at?: string | null;
          subscription_started_at?: string | null;
          subscription_type?: string | null;
          suspended?: boolean;
          suspended_at?: string | null;
          suspended_by?: string | null;
          suspended_reason?: string | null;
          total_tuition?: number;
          trusted_source?: string | null;
          trusted_source_reason?: string | null;
          updated_at?: string;
          user_id: string;
          variant_id?: string | null;
        };
        Update: {
          actual_end_date?: string | null;
          amount_paid?: number;
          bundle_id?: string | null;
          certificate_url?: string | null;
          certification_status?: string;
          cohort_id?: string | null;
          created_at?: string;
          declared_source?: string | null;
          discount_amount?: number;
          enrollment_channel?: string | null;
          enrollment_date?: string;
          enrollment_kind?: string;
          eventbrite_attendee_id?: string | null;
          expected_end_date?: string | null;
          flow_id?: string | null;
          id?: string;
          import_batch_id?: string | null;
          instructor_name?: string | null;
          lead_application_id?: string | null;
          list_price?: number;
          notes?: string | null;
          organization_id?: string | null;
          parent_enrollment_id?: string | null;
          pass_number?: number | null;
          payment_status?: string;
          pending_reserve_key?: boolean;
          program_id?: string;
          progress_pct?: number;
          reservation_expires_at?: string | null;
          reservation_extended?: boolean | null;
          reserved_at?: string | null;
          status?: string;
          subscription_expires_at?: string | null;
          subscription_started_at?: string | null;
          subscription_type?: string | null;
          suspended?: boolean;
          suspended_at?: string | null;
          suspended_by?: string | null;
          suspended_reason?: string | null;
          total_tuition?: number;
          trusted_source?: string | null;
          trusted_source_reason?: string | null;
          updated_at?: string;
          user_id?: string;
          variant_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "enrollments_bundle_id_fkey";
            columns: ["bundle_id"];
            isOneToOne: false;
            referencedRelation: "bundles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "enrollments_cohort_id_fkey";
            columns: ["cohort_id"];
            isOneToOne: false;
            referencedRelation: "cohorts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "enrollments_flow_id_fkey";
            columns: ["flow_id"];
            isOneToOne: false;
            referencedRelation: "flows";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "enrollments_import_batch_id_fkey";
            columns: ["import_batch_id"];
            isOneToOne: false;
            referencedRelation: "import_batches";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "enrollments_lead_application_id_fkey";
            columns: ["lead_application_id"];
            isOneToOne: false;
            referencedRelation: "lead_applications";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "enrollments_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "enrollments_parent_enrollment_id_fkey";
            columns: ["parent_enrollment_id"];
            isOneToOne: false;
            referencedRelation: "enrollments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "enrollments_program_id_fkey";
            columns: ["program_id"];
            isOneToOne: false;
            referencedRelation: "programs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "enrollments_variant_id_fkey";
            columns: ["variant_id"];
            isOneToOne: false;
            referencedRelation: "program_variants";
            referencedColumns: ["id"];
          },
        ];
      };
      error_alert_config: {
        Row: {
          auto_diagnose_enabled: boolean;
          auto_remediate_enabled: boolean;
          baseline_hours: number;
          cooldown_minutes: number;
          created_at: string;
          email_recipients: string[];
          enabled: boolean;
          generic_webhook_url: string | null;
          id: string;
          last_alert_at: string | null;
          per_error_notify_thresholds: number[];
          slack_webhook_url: string | null;
          spike_multiplier: number;
          threshold_count: number;
          updated_at: string;
          window_minutes: number;
        };
        Insert: {
          auto_diagnose_enabled?: boolean;
          auto_remediate_enabled?: boolean;
          baseline_hours?: number;
          cooldown_minutes?: number;
          created_at?: string;
          email_recipients?: string[];
          enabled?: boolean;
          generic_webhook_url?: string | null;
          id?: string;
          last_alert_at?: string | null;
          per_error_notify_thresholds?: number[];
          slack_webhook_url?: string | null;
          spike_multiplier?: number;
          threshold_count?: number;
          updated_at?: string;
          window_minutes?: number;
        };
        Update: {
          auto_diagnose_enabled?: boolean;
          auto_remediate_enabled?: boolean;
          baseline_hours?: number;
          cooldown_minutes?: number;
          created_at?: string;
          email_recipients?: string[];
          enabled?: boolean;
          generic_webhook_url?: string | null;
          id?: string;
          last_alert_at?: string | null;
          per_error_notify_thresholds?: number[];
          slack_webhook_url?: string | null;
          spike_multiplier?: number;
          threshold_count?: number;
          updated_at?: string;
          window_minutes?: number;
        };
        Relationships: [];
      };
      error_alert_events: {
        Row: {
          alert_type: string;
          baseline_avg: number | null;
          channel_results: Json;
          channels_notified: string[];
          error_count: number;
          id: string;
          notes: string | null;
          sample_errors: Json;
          triggered_at: string;
          window_minutes: number;
        };
        Insert: {
          alert_type: string;
          baseline_avg?: number | null;
          channel_results?: Json;
          channels_notified?: string[];
          error_count: number;
          id?: string;
          notes?: string | null;
          sample_errors?: Json;
          triggered_at?: string;
          window_minutes: number;
        };
        Update: {
          alert_type?: string;
          baseline_avg?: number | null;
          channel_results?: Json;
          channels_notified?: string[];
          error_count?: number;
          id?: string;
          notes?: string | null;
          sample_errors?: Json;
          triggered_at?: string;
          window_minutes?: number;
        };
        Relationships: [];
      };
      flow_completion_events: {
        Row: {
          attribution: Json | null;
          created_at: string;
          flow_id: string;
          flow_name: string | null;
          flow_variant: string | null;
          id: string;
          last_step_id: string | null;
          last_step_index: number | null;
          last_step_type: string | null;
          metadata: Json;
          organization_id: string | null;
          outcome: string;
          reason: string | null;
          redirect_url: string | null;
          session_id: string | null;
          total_steps: number | null;
          user_id: string | null;
          user_status: string | null;
        };
        Insert: {
          attribution?: Json | null;
          created_at?: string;
          flow_id: string;
          flow_name?: string | null;
          flow_variant?: string | null;
          id?: string;
          last_step_id?: string | null;
          last_step_index?: number | null;
          last_step_type?: string | null;
          metadata?: Json;
          organization_id?: string | null;
          outcome: string;
          reason?: string | null;
          redirect_url?: string | null;
          session_id?: string | null;
          total_steps?: number | null;
          user_id?: string | null;
          user_status?: string | null;
        };
        Update: {
          attribution?: Json | null;
          created_at?: string;
          flow_id?: string;
          flow_name?: string | null;
          flow_variant?: string | null;
          id?: string;
          last_step_id?: string | null;
          last_step_index?: number | null;
          last_step_type?: string | null;
          metadata?: Json;
          organization_id?: string | null;
          outcome?: string;
          reason?: string | null;
          redirect_url?: string | null;
          session_id?: string | null;
          total_steps?: number | null;
          user_id?: string | null;
          user_status?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "flow_completion_events_flow_id_fkey";
            columns: ["flow_id"];
            isOneToOne: false;
            referencedRelation: "flows";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "flow_completion_events_last_step_id_fkey";
            columns: ["last_step_id"];
            isOneToOne: false;
            referencedRelation: "flow_steps";
            referencedColumns: ["id"];
          },
        ];
      };
      flow_conditions: {
        Row: {
          action: string;
          created_at: string;
          flow_id: string;
          id: string;
          if_step_id: string;
          if_value: string;
          redirect_url: string | null;
          sort_order: number;
          target_step_id: string | null;
        };
        Insert: {
          action: string;
          created_at?: string;
          flow_id: string;
          id?: string;
          if_step_id: string;
          if_value: string;
          redirect_url?: string | null;
          sort_order?: number;
          target_step_id?: string | null;
        };
        Update: {
          action?: string;
          created_at?: string;
          flow_id?: string;
          id?: string;
          if_step_id?: string;
          if_value?: string;
          redirect_url?: string | null;
          sort_order?: number;
          target_step_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "flow_conditions_flow_id_fkey";
            columns: ["flow_id"];
            isOneToOne: false;
            referencedRelation: "flows";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "flow_conditions_if_step_id_fkey";
            columns: ["if_step_id"];
            isOneToOne: false;
            referencedRelation: "flow_steps";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "flow_conditions_target_step_id_fkey";
            columns: ["target_step_id"];
            isOneToOne: false;
            referencedRelation: "flow_steps";
            referencedColumns: ["id"];
          },
        ];
      };
      flow_signatures: {
        Row: {
          acknowledgments: Json;
          agreement_template_id: string | null;
          created_at: string;
          flow_id: string | null;
          id: string;
          ip_address: string | null;
          signature_text: string;
          signed_at: string;
          step_id: string | null;
          template_version: number | null;
          user_agent: string | null;
          user_id: string | null;
        };
        Insert: {
          acknowledgments?: Json;
          agreement_template_id?: string | null;
          created_at?: string;
          flow_id?: string | null;
          id?: string;
          ip_address?: string | null;
          signature_text: string;
          signed_at?: string;
          step_id?: string | null;
          template_version?: number | null;
          user_agent?: string | null;
          user_id?: string | null;
        };
        Update: {
          acknowledgments?: Json;
          agreement_template_id?: string | null;
          created_at?: string;
          flow_id?: string | null;
          id?: string;
          ip_address?: string | null;
          signature_text?: string;
          signed_at?: string;
          step_id?: string | null;
          template_version?: number | null;
          user_agent?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "flow_signatures_agreement_template_id_fkey";
            columns: ["agreement_template_id"];
            isOneToOne: false;
            referencedRelation: "agreement_templates";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "flow_signatures_flow_id_fkey";
            columns: ["flow_id"];
            isOneToOne: false;
            referencedRelation: "flows";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "flow_signatures_step_id_fkey";
            columns: ["step_id"];
            isOneToOne: false;
            referencedRelation: "flow_steps";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "flow_signatures_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      flow_step_options: {
        Row: {
          created_at: string;
          disqualifies: boolean;
          id: string;
          label: string;
          sort_order: number;
          step_id: string;
          value: string;
        };
        Insert: {
          created_at?: string;
          disqualifies?: boolean;
          id?: string;
          label: string;
          sort_order?: number;
          step_id: string;
          value: string;
        };
        Update: {
          created_at?: string;
          disqualifies?: boolean;
          id?: string;
          label?: string;
          sort_order?: number;
          step_id?: string;
          value?: string;
        };
        Relationships: [
          {
            foreignKeyName: "flow_step_options_step_id_fkey";
            columns: ["step_id"];
            isOneToOne: false;
            referencedRelation: "flow_steps";
            referencedColumns: ["id"];
          },
        ];
      };
      flow_steps: {
        Row: {
          config: Json;
          created_at: string;
          flow_id: string;
          id: string;
          is_required: boolean;
          step_order: number;
          step_type: string;
          subtitle: string | null;
          title: string;
        };
        Insert: {
          config?: Json;
          created_at?: string;
          flow_id: string;
          id?: string;
          is_required?: boolean;
          step_order: number;
          step_type: string;
          subtitle?: string | null;
          title: string;
        };
        Update: {
          config?: Json;
          created_at?: string;
          flow_id?: string;
          id?: string;
          is_required?: boolean;
          step_order?: number;
          step_type?: string;
          subtitle?: string | null;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "flow_steps_flow_id_fkey";
            columns: ["flow_id"];
            isOneToOne: false;
            referencedRelation: "flows";
            referencedColumns: ["id"];
          },
        ];
      };
      flows: {
        Row: {
          completion_redirect_url: string | null;
          created_at: string;
          description: string | null;
          flow_type: string;
          id: string;
          is_active: boolean;
          is_default: boolean;
          is_template: boolean;
          name: string;
          organization_id: string | null;
          slug: string | null;
          updated_at: string;
        };
        Insert: {
          completion_redirect_url?: string | null;
          created_at?: string;
          description?: string | null;
          flow_type?: string;
          id?: string;
          is_active?: boolean;
          is_default?: boolean;
          is_template?: boolean;
          name: string;
          organization_id?: string | null;
          slug?: string | null;
          updated_at?: string;
        };
        Update: {
          completion_redirect_url?: string | null;
          created_at?: string;
          description?: string | null;
          flow_type?: string;
          id?: string;
          is_active?: boolean;
          is_default?: boolean;
          is_template?: boolean;
          name?: string;
          organization_id?: string | null;
          slug?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "flows_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      funnel_errors: {
        Row: {
          calendar_id: string | null;
          created_at: string;
          details: Json | null;
          error_type: string;
          filtered_count: number | null;
          id: string;
          program_code: string | null;
          program_id: string | null;
          schedule_filter: string | null;
          slot_count: number | null;
          start_date_count: number | null;
          user_agent: string | null;
        };
        Insert: {
          calendar_id?: string | null;
          created_at?: string;
          details?: Json | null;
          error_type: string;
          filtered_count?: number | null;
          id?: string;
          program_code?: string | null;
          program_id?: string | null;
          schedule_filter?: string | null;
          slot_count?: number | null;
          start_date_count?: number | null;
          user_agent?: string | null;
        };
        Update: {
          calendar_id?: string | null;
          created_at?: string;
          details?: Json | null;
          error_type?: string;
          filtered_count?: number | null;
          id?: string;
          program_code?: string | null;
          program_id?: string | null;
          schedule_filter?: string | null;
          slot_count?: number | null;
          start_date_count?: number | null;
          user_agent?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "funnel_errors_program_id_fkey";
            columns: ["program_id"];
            isOneToOne: false;
            referencedRelation: "programs";
            referencedColumns: ["id"];
          },
        ];
      };
      generated_cohorts: {
        Row: {
          committed_cohort_id: string | null;
          created_at: string;
          end_date: string;
          generation_run_id: string | null;
          id: string;
          organization_id: string;
          pattern_id: string;
          program_id: string;
          rotation_index: number;
          scheduled_hours: number;
          start_date: string;
          status: string;
          time_block_end: string;
          time_block_start: string;
          updated_at: string;
        };
        Insert: {
          committed_cohort_id?: string | null;
          created_at?: string;
          end_date: string;
          generation_run_id?: string | null;
          id?: string;
          organization_id: string;
          pattern_id: string;
          program_id: string;
          rotation_index?: number;
          scheduled_hours: number;
          start_date: string;
          status?: string;
          time_block_end: string;
          time_block_start: string;
          updated_at?: string;
        };
        Update: {
          committed_cohort_id?: string | null;
          created_at?: string;
          end_date?: string;
          generation_run_id?: string | null;
          id?: string;
          organization_id?: string;
          pattern_id?: string;
          program_id?: string;
          rotation_index?: number;
          scheduled_hours?: number;
          start_date?: string;
          status?: string;
          time_block_end?: string;
          time_block_start?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "generated_cohorts_committed_cohort_id_fkey";
            columns: ["committed_cohort_id"];
            isOneToOne: false;
            referencedRelation: "cohorts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "generated_cohorts_generation_run_id_fkey";
            columns: ["generation_run_id"];
            isOneToOne: false;
            referencedRelation: "generation_runs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "generated_cohorts_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "generated_cohorts_pattern_id_fkey";
            columns: ["pattern_id"];
            isOneToOne: false;
            referencedRelation: "schedule_patterns";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "generated_cohorts_program_id_fkey";
            columns: ["program_id"];
            isOneToOne: false;
            referencedRelation: "programs";
            referencedColumns: ["id"];
          },
        ];
      };
      generation_runs: {
        Row: {
          cohorts_generated: number;
          horizon_date: string;
          id: string;
          input_hash: string;
          organization_id: string;
          output_hash: string;
          pattern_id: string | null;
          ran_at: string;
          triggered_by: string;
        };
        Insert: {
          cohorts_generated?: number;
          horizon_date: string;
          id?: string;
          input_hash: string;
          organization_id: string;
          output_hash: string;
          pattern_id?: string | null;
          ran_at?: string;
          triggered_by?: string;
        };
        Update: {
          cohorts_generated?: number;
          horizon_date?: string;
          id?: string;
          input_hash?: string;
          organization_id?: string;
          output_hash?: string;
          pattern_id?: string | null;
          ran_at?: string;
          triggered_by?: string;
        };
        Relationships: [
          {
            foreignKeyName: "fk_generation_runs_pattern";
            columns: ["pattern_id"];
            isOneToOne: false;
            referencedRelation: "schedule_patterns";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "generation_runs_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      ghl_calendar_mappings: {
        Row: {
          active: boolean;
          cohort_frequency_anchor_date: string | null;
          cohort_frequency_weeks: number;
          cohort_start_days: number[] | null;
          created_at: string;
          ghl_calendar_id: string;
          ghl_calendar_name: string | null;
          id: string;
          label: string | null;
          program_id: string;
          schedule_slot: string | null;
          updated_at: string;
          variation: string | null;
        };
        Insert: {
          active?: boolean;
          cohort_frequency_anchor_date?: string | null;
          cohort_frequency_weeks?: number;
          cohort_start_days?: number[] | null;
          created_at?: string;
          ghl_calendar_id: string;
          ghl_calendar_name?: string | null;
          id?: string;
          label?: string | null;
          program_id: string;
          schedule_slot?: string | null;
          updated_at?: string;
          variation?: string | null;
        };
        Update: {
          active?: boolean;
          cohort_frequency_anchor_date?: string | null;
          cohort_frequency_weeks?: number;
          cohort_start_days?: number[] | null;
          created_at?: string;
          ghl_calendar_id?: string;
          ghl_calendar_name?: string | null;
          id?: string;
          label?: string | null;
          program_id?: string;
          schedule_slot?: string | null;
          updated_at?: string;
          variation?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ghl_calendar_mappings_program_id_fkey";
            columns: ["program_id"];
            isOneToOne: false;
            referencedRelation: "programs";
            referencedColumns: ["id"];
          },
        ];
      };
      ghl_connections: {
        Row: {
          access_token: string | null;
          connected_at: string | null;
          created_at: string;
          id: string;
          location_id: string | null;
          organization_id: string;
          refresh_token: string | null;
          status: string;
          updated_at: string;
        };
        Insert: {
          access_token?: string | null;
          connected_at?: string | null;
          created_at?: string;
          id?: string;
          location_id?: string | null;
          organization_id: string;
          refresh_token?: string | null;
          status?: string;
          updated_at?: string;
        };
        Update: {
          access_token?: string | null;
          connected_at?: string | null;
          created_at?: string;
          id?: string;
          location_id?: string | null;
          organization_id?: string;
          refresh_token?: string | null;
          status?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ghl_connections_tenant_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      holiday_calendars: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          name: string;
          organization_id: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name: string;
          organization_id: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name?: string;
          organization_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "holiday_calendars_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      holidays: {
        Row: {
          created_at: string;
          date: string;
          id: string;
          name: string;
          organization_id: string | null;
          recurring: boolean;
        };
        Insert: {
          created_at?: string;
          date: string;
          id?: string;
          name: string;
          organization_id?: string | null;
          recurring?: boolean;
        };
        Update: {
          created_at?: string;
          date?: string;
          id?: string;
          name?: string;
          organization_id?: string | null;
          recurring?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "holidays_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      ig_blocks: {
        Row: {
          blocked_id: string;
          blocker_id: string;
          created_at: string;
        };
        Insert: {
          blocked_id: string;
          blocker_id: string;
          created_at?: string;
        };
        Update: {
          blocked_id?: string;
          blocker_id?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      ig_bookmarks: {
        Row: {
          created_at: string;
          id: string;
          post_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          post_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          post_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ig_bookmarks_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "ig_posts";
            referencedColumns: ["id"];
          },
        ];
      };
      ig_comments: {
        Row: {
          body: string;
          created_at: string;
          id: string;
          post_id: string;
          user_id: string;
        };
        Insert: {
          body: string;
          created_at?: string;
          id?: string;
          post_id: string;
          user_id: string;
        };
        Update: {
          body?: string;
          created_at?: string;
          id?: string;
          post_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ig_comments_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "ig_posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ig_comments_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "ig_profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      ig_connections: {
        Row: {
          consent_given_at: string | null;
          created_at: string;
          from_user_id: string;
          id: string;
          kind: string;
          status: string;
          to_user_id: string;
          updated_at: string;
        };
        Insert: {
          consent_given_at?: string | null;
          created_at?: string;
          from_user_id: string;
          id?: string;
          kind?: string;
          status?: string;
          to_user_id: string;
          updated_at?: string;
        };
        Update: {
          consent_given_at?: string | null;
          created_at?: string;
          from_user_id?: string;
          id?: string;
          kind?: string;
          status?: string;
          to_user_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ig_connections_from_user_id_fkey";
            columns: ["from_user_id"];
            isOneToOne: false;
            referencedRelation: "ig_profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ig_connections_to_user_id_fkey";
            columns: ["to_user_id"];
            isOneToOne: false;
            referencedRelation: "ig_profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      ig_drafts: {
        Row: {
          body: string;
          created_at: string;
          id: string;
          parent_id: string | null;
          quoted_post_id: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          body?: string;
          created_at?: string;
          id?: string;
          parent_id?: string | null;
          quoted_post_id?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          body?: string;
          created_at?: string;
          id?: string;
          parent_id?: string | null;
          quoted_post_id?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      ig_follows: {
        Row: {
          created_at: string;
          follower_id: string;
          following_id: string;
        };
        Insert: {
          created_at?: string;
          follower_id: string;
          following_id: string;
        };
        Update: {
          created_at?: string;
          follower_id?: string;
          following_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ig_follows_follower_id_fkey";
            columns: ["follower_id"];
            isOneToOne: false;
            referencedRelation: "ig_profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ig_follows_following_id_fkey";
            columns: ["following_id"];
            isOneToOne: false;
            referencedRelation: "ig_profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      ig_hashtags: {
        Row: {
          created_at: string;
          id: string;
          tag: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          tag: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          tag?: string;
        };
        Relationships: [];
      };
      ig_likes: {
        Row: {
          created_at: string;
          id: string;
          post_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          post_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          post_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ig_likes_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "ig_posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ig_likes_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "ig_profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      ig_mixer_attendees: {
        Row: {
          floor_status: string;
          id: string;
          joined_at: string;
          left_at: string | null;
          mixer_id: string;
          role: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          floor_status?: string;
          id?: string;
          joined_at?: string;
          left_at?: string | null;
          mixer_id: string;
          role?: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          floor_status?: string;
          id?: string;
          joined_at?: string;
          left_at?: string | null;
          mixer_id?: string;
          role?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ig_mixer_attendees_mixer_id_fkey";
            columns: ["mixer_id"];
            isOneToOne: false;
            referencedRelation: "ig_mixers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ig_mixer_attendees_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "ig_profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      ig_mixer_conversation_requests: {
        Row: {
          completed_at: string | null;
          created_at: string;
          from_user_id: string;
          id: string;
          listening_policy: string;
          livekit_room_name: string | null;
          mixer_id: string;
          status: string;
          to_user_id: string;
          updated_at: string;
        };
        Insert: {
          completed_at?: string | null;
          created_at?: string;
          from_user_id: string;
          id?: string;
          listening_policy?: string;
          livekit_room_name?: string | null;
          mixer_id: string;
          status?: string;
          to_user_id: string;
          updated_at?: string;
        };
        Update: {
          completed_at?: string | null;
          created_at?: string;
          from_user_id?: string;
          id?: string;
          listening_policy?: string;
          livekit_room_name?: string | null;
          mixer_id?: string;
          status?: string;
          to_user_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ig_mixer_conversation_requests_from_user_id_fkey";
            columns: ["from_user_id"];
            isOneToOne: false;
            referencedRelation: "ig_profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ig_mixer_conversation_requests_mixer_id_fkey";
            columns: ["mixer_id"];
            isOneToOne: false;
            referencedRelation: "ig_mixers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ig_mixer_conversation_requests_to_user_id_fkey";
            columns: ["to_user_id"];
            isOneToOne: false;
            referencedRelation: "ig_profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      ig_mixer_feedback: {
        Row: {
          conversation_id: string;
          created_at: string;
          from_user_id: string;
          id: string;
          to_user_id: string;
          would_talk_again: boolean;
        };
        Insert: {
          conversation_id: string;
          created_at?: string;
          from_user_id: string;
          id?: string;
          to_user_id: string;
          would_talk_again: boolean;
        };
        Update: {
          conversation_id?: string;
          created_at?: string;
          from_user_id?: string;
          id?: string;
          to_user_id?: string;
          would_talk_again?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "ig_mixer_feedback_conversation_id_fkey";
            columns: ["conversation_id"];
            isOneToOne: false;
            referencedRelation: "ig_mixer_conversation_requests";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ig_mixer_feedback_from_user_id_fkey";
            columns: ["from_user_id"];
            isOneToOne: false;
            referencedRelation: "ig_profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ig_mixer_feedback_to_user_id_fkey";
            columns: ["to_user_id"];
            isOneToOne: false;
            referencedRelation: "ig_profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      ig_mixers: {
        Row: {
          capacity: number | null;
          cover_url: string | null;
          created_at: string;
          description: string | null;
          ends_at: string | null;
          host_id: string;
          id: string;
          livekit_stage_room: string;
          mixer_type: string;
          starts_at: string | null;
          status: string;
          title: string;
          updated_at: string;
          visibility: string;
        };
        Insert: {
          capacity?: number | null;
          cover_url?: string | null;
          created_at?: string;
          description?: string | null;
          ends_at?: string | null;
          host_id: string;
          id?: string;
          livekit_stage_room: string;
          mixer_type?: string;
          starts_at?: string | null;
          status?: string;
          title: string;
          updated_at?: string;
          visibility?: string;
        };
        Update: {
          capacity?: number | null;
          cover_url?: string | null;
          created_at?: string;
          description?: string | null;
          ends_at?: string | null;
          host_id?: string;
          id?: string;
          livekit_stage_room?: string;
          mixer_type?: string;
          starts_at?: string | null;
          status?: string;
          title?: string;
          updated_at?: string;
          visibility?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ig_mixers_host_id_fkey";
            columns: ["host_id"];
            isOneToOne: false;
            referencedRelation: "ig_profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      ig_muted_words: {
        Row: {
          created_at: string;
          expires_at: string | null;
          id: string;
          user_id: string;
          word: string;
        };
        Insert: {
          created_at?: string;
          expires_at?: string | null;
          id?: string;
          user_id: string;
          word: string;
        };
        Update: {
          created_at?: string;
          expires_at?: string | null;
          id?: string;
          user_id?: string;
          word?: string;
        };
        Relationships: [];
      };
      ig_mutes: {
        Row: {
          created_at: string;
          muted_id: string;
          muter_id: string;
        };
        Insert: {
          created_at?: string;
          muted_id: string;
          muter_id: string;
        };
        Update: {
          created_at?: string;
          muted_id?: string;
          muter_id?: string;
        };
        Relationships: [];
      };
      ig_notifications: {
        Row: {
          actor_id: string;
          created_at: string;
          id: string;
          kind: string;
          post_id: string | null;
          read_at: string | null;
          recipient_id: string;
        };
        Insert: {
          actor_id: string;
          created_at?: string;
          id?: string;
          kind: string;
          post_id?: string | null;
          read_at?: string | null;
          recipient_id: string;
        };
        Update: {
          actor_id?: string;
          created_at?: string;
          id?: string;
          kind?: string;
          post_id?: string | null;
          read_at?: string | null;
          recipient_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ig_notifications_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "ig_posts";
            referencedColumns: ["id"];
          },
        ];
      };
      ig_poll_options: {
        Row: {
          id: string;
          label: string;
          poll_id: string;
          position: number;
        };
        Insert: {
          id?: string;
          label: string;
          poll_id: string;
          position: number;
        };
        Update: {
          id?: string;
          label?: string;
          poll_id?: string;
          position?: number;
        };
        Relationships: [
          {
            foreignKeyName: "ig_poll_options_poll_id_fkey";
            columns: ["poll_id"];
            isOneToOne: false;
            referencedRelation: "ig_polls";
            referencedColumns: ["id"];
          },
        ];
      };
      ig_poll_votes: {
        Row: {
          created_at: string;
          option_id: string;
          poll_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          option_id: string;
          poll_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          option_id?: string;
          poll_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ig_poll_votes_option_id_fkey";
            columns: ["option_id"];
            isOneToOne: false;
            referencedRelation: "ig_poll_options";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ig_poll_votes_poll_id_fkey";
            columns: ["poll_id"];
            isOneToOne: false;
            referencedRelation: "ig_polls";
            referencedColumns: ["id"];
          },
        ];
      };
      ig_polls: {
        Row: {
          created_at: string;
          ends_at: string;
          id: string;
          post_id: string;
        };
        Insert: {
          created_at?: string;
          ends_at: string;
          id?: string;
          post_id: string;
        };
        Update: {
          created_at?: string;
          ends_at?: string;
          id?: string;
          post_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ig_polls_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: true;
            referencedRelation: "ig_posts";
            referencedColumns: ["id"];
          },
        ];
      };
      ig_post_hashtags: {
        Row: {
          created_at: string;
          hashtag_id: string;
          post_id: string;
        };
        Insert: {
          created_at?: string;
          hashtag_id: string;
          post_id: string;
        };
        Update: {
          created_at?: string;
          hashtag_id?: string;
          post_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ig_post_hashtags_hashtag_id_fkey";
            columns: ["hashtag_id"];
            isOneToOne: false;
            referencedRelation: "ig_hashtags";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ig_post_hashtags_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "ig_posts";
            referencedColumns: ["id"];
          },
        ];
      };
      ig_posts: {
        Row: {
          caption: string | null;
          created_at: string;
          edit_count: number;
          edited_at: string | null;
          id: string;
          image_path: string | null;
          is_pinned: boolean;
          media_paths: string[];
          parent_id: string | null;
          quoted_post_id: string | null;
          reply_policy: string;
          scheduled_at: string | null;
          updated_at: string;
          user_id: string;
          view_count: number;
        };
        Insert: {
          caption?: string | null;
          created_at?: string;
          edit_count?: number;
          edited_at?: string | null;
          id?: string;
          image_path?: string | null;
          is_pinned?: boolean;
          media_paths?: string[];
          parent_id?: string | null;
          quoted_post_id?: string | null;
          reply_policy?: string;
          scheduled_at?: string | null;
          updated_at?: string;
          user_id: string;
          view_count?: number;
        };
        Update: {
          caption?: string | null;
          created_at?: string;
          edit_count?: number;
          edited_at?: string | null;
          id?: string;
          image_path?: string | null;
          is_pinned?: boolean;
          media_paths?: string[];
          parent_id?: string | null;
          quoted_post_id?: string | null;
          reply_policy?: string;
          scheduled_at?: string | null;
          updated_at?: string;
          user_id?: string;
          view_count?: number;
        };
        Relationships: [
          {
            foreignKeyName: "ig_posts_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "ig_posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ig_posts_quoted_post_id_fkey";
            columns: ["quoted_post_id"];
            isOneToOne: false;
            referencedRelation: "ig_posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ig_posts_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "ig_profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      ig_profile_affiliations: {
        Row: {
          created_at: string;
          id: string;
          org_id: string;
          profile_id: string;
          updated_at: string;
          visible: boolean;
        };
        Insert: {
          created_at?: string;
          id?: string;
          org_id: string;
          profile_id: string;
          updated_at?: string;
          visible?: boolean;
        };
        Update: {
          created_at?: string;
          id?: string;
          org_id?: string;
          profile_id?: string;
          updated_at?: string;
          visible?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "ig_profile_affiliations_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ig_profile_affiliations_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "ig_profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      ig_profiles: {
        Row: {
          availability: string | null;
          avatar_url: string | null;
          banner_url: string | null;
          bio: string | null;
          created_at: string;
          discoverable: boolean;
          display_name: string | null;
          goals: string[];
          id: string;
          interests: string[];
          is_demo: boolean;
          languages: string[];
          links: Json;
          location_privacy: string;
          location_region: string | null;
          looking_for: string[];
          onboarding_completed_at: string | null;
          one_id: string | null;
          profile_visibility: string;
          skills: string[];
          updated_at: string;
          username: string;
        };
        Insert: {
          availability?: string | null;
          avatar_url?: string | null;
          banner_url?: string | null;
          bio?: string | null;
          created_at?: string;
          discoverable?: boolean;
          display_name?: string | null;
          goals?: string[];
          id: string;
          interests?: string[];
          is_demo?: boolean;
          languages?: string[];
          links?: Json;
          location_privacy?: string;
          location_region?: string | null;
          looking_for?: string[];
          onboarding_completed_at?: string | null;
          one_id?: string | null;
          profile_visibility?: string;
          skills?: string[];
          updated_at?: string;
          username: string;
        };
        Update: {
          availability?: string | null;
          avatar_url?: string | null;
          banner_url?: string | null;
          bio?: string | null;
          created_at?: string;
          discoverable?: boolean;
          display_name?: string | null;
          goals?: string[];
          id?: string;
          interests?: string[];
          is_demo?: boolean;
          languages?: string[];
          links?: Json;
          location_privacy?: string;
          location_region?: string | null;
          looking_for?: string[];
          onboarding_completed_at?: string | null;
          one_id?: string | null;
          profile_visibility?: string;
          skills?: string[];
          updated_at?: string;
          username?: string;
        };
        Relationships: [];
      };
      ig_rate_limits: {
        Row: {
          action: string;
          count: number;
          id: string;
          user_id: string;
          window_start: string;
        };
        Insert: {
          action: string;
          count?: number;
          id?: string;
          user_id: string;
          window_start?: string;
        };
        Update: {
          action?: string;
          count?: number;
          id?: string;
          user_id?: string;
          window_start?: string;
        };
        Relationships: [];
      };
      ig_reports: {
        Row: {
          created_at: string;
          details: string | null;
          id: string;
          post_id: string | null;
          reason: string;
          reported_user_id: string | null;
          reporter_id: string;
          status: string;
        };
        Insert: {
          created_at?: string;
          details?: string | null;
          id?: string;
          post_id?: string | null;
          reason: string;
          reported_user_id?: string | null;
          reporter_id: string;
          status?: string;
        };
        Update: {
          created_at?: string;
          details?: string | null;
          id?: string;
          post_id?: string | null;
          reason?: string;
          reported_user_id?: string | null;
          reporter_id?: string;
          status?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ig_reports_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "ig_posts";
            referencedColumns: ["id"];
          },
        ];
      };
      ig_reposts: {
        Row: {
          created_at: string;
          id: string;
          post_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          post_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          post_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ig_reposts_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "ig_posts";
            referencedColumns: ["id"];
          },
        ];
      };
      import_batch_rows: {
        Row: {
          account_created: boolean;
          batch_id: string;
          created_at: string;
          email: string | null;
          enrollment_id: string | null;
          error_message: string | null;
          eventbrite_attendee_id: string | null;
          first_name: string | null;
          id: string;
          input: Json;
          last_name: string | null;
          outcome: Database["public"]["Enums"]["import_row_outcome"];
          phone: string | null;
          row_index: number;
          updated_at: string;
          user_id: string | null;
          welcome_email_sent: boolean;
        };
        Insert: {
          account_created?: boolean;
          batch_id: string;
          created_at?: string;
          email?: string | null;
          enrollment_id?: string | null;
          error_message?: string | null;
          eventbrite_attendee_id?: string | null;
          first_name?: string | null;
          id?: string;
          input?: Json;
          last_name?: string | null;
          outcome?: Database["public"]["Enums"]["import_row_outcome"];
          phone?: string | null;
          row_index: number;
          updated_at?: string;
          user_id?: string | null;
          welcome_email_sent?: boolean;
        };
        Update: {
          account_created?: boolean;
          batch_id?: string;
          created_at?: string;
          email?: string | null;
          enrollment_id?: string | null;
          error_message?: string | null;
          eventbrite_attendee_id?: string | null;
          first_name?: string | null;
          id?: string;
          input?: Json;
          last_name?: string | null;
          outcome?: Database["public"]["Enums"]["import_row_outcome"];
          phone?: string | null;
          row_index?: number;
          updated_at?: string;
          user_id?: string | null;
          welcome_email_sent?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "import_batch_rows_batch_id_fkey";
            columns: ["batch_id"];
            isOneToOne: false;
            referencedRelation: "import_batches";
            referencedColumns: ["id"];
          },
        ];
      };
      import_batches: {
        Row: {
          cohort_id: string;
          completed_at: string | null;
          created_at: string;
          error_message: string | null;
          failed_count: number;
          id: string;
          imported_by: string;
          options: Json;
          organization_id: string | null;
          program_id: string;
          rolled_back_at: string | null;
          skipped_count: number;
          source: Database["public"]["Enums"]["import_batch_source"];
          source_ref: string | null;
          started_at: string | null;
          status: Database["public"]["Enums"]["import_batch_status"];
          succeeded_count: number;
          total_rows: number;
          updated_at: string;
        };
        Insert: {
          cohort_id: string;
          completed_at?: string | null;
          created_at?: string;
          error_message?: string | null;
          failed_count?: number;
          id?: string;
          imported_by: string;
          options?: Json;
          organization_id?: string | null;
          program_id: string;
          rolled_back_at?: string | null;
          skipped_count?: number;
          source: Database["public"]["Enums"]["import_batch_source"];
          source_ref?: string | null;
          started_at?: string | null;
          status?: Database["public"]["Enums"]["import_batch_status"];
          succeeded_count?: number;
          total_rows?: number;
          updated_at?: string;
        };
        Update: {
          cohort_id?: string;
          completed_at?: string | null;
          created_at?: string;
          error_message?: string | null;
          failed_count?: number;
          id?: string;
          imported_by?: string;
          options?: Json;
          organization_id?: string | null;
          program_id?: string;
          rolled_back_at?: string | null;
          skipped_count?: number;
          source?: Database["public"]["Enums"]["import_batch_source"];
          source_ref?: string | null;
          started_at?: string | null;
          status?: Database["public"]["Enums"]["import_batch_status"];
          succeeded_count?: number;
          total_rows?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "import_batches_cohort_id_fkey";
            columns: ["cohort_id"];
            isOneToOne: false;
            referencedRelation: "cohorts";
            referencedColumns: ["id"];
          },
        ];
      };
      inbox_canned_responses: {
        Row: {
          content: string;
          created_at: string;
          id: string;
          org_id: string;
          short_code: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          id?: string;
          org_id: string;
          short_code: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: string;
          org_id?: string;
          short_code?: string;
        };
        Relationships: [
          {
            foreignKeyName: "inbox_canned_responses_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      inbox_contact_inboxes: {
        Row: {
          contact_id: string;
          created_at: string;
          id: string;
          inbox_id: string;
          source_id: string | null;
        };
        Insert: {
          contact_id: string;
          created_at?: string;
          id?: string;
          inbox_id: string;
          source_id?: string | null;
        };
        Update: {
          contact_id?: string;
          created_at?: string;
          id?: string;
          inbox_id?: string;
          source_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "inbox_contact_inboxes_contact_id_fkey";
            columns: ["contact_id"];
            isOneToOne: false;
            referencedRelation: "inbox_contacts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "inbox_contact_inboxes_inbox_id_fkey";
            columns: ["inbox_id"];
            isOneToOne: false;
            referencedRelation: "inbox_inboxes";
            referencedColumns: ["id"];
          },
        ];
      };
      inbox_contacts: {
        Row: {
          created_at: string;
          custom_attrs: Json;
          email: string | null;
          id: string;
          last_activity_at: string | null;
          name: string | null;
          org_id: string;
          phone: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          custom_attrs?: Json;
          email?: string | null;
          id?: string;
          last_activity_at?: string | null;
          name?: string | null;
          org_id: string;
          phone?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string;
          custom_attrs?: Json;
          email?: string | null;
          id?: string;
          last_activity_at?: string | null;
          name?: string | null;
          org_id?: string;
          phone?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "inbox_contacts_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "inbox_contacts_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      inbox_conversation_labels: {
        Row: {
          conversation_id: string;
          label_id: string;
        };
        Insert: {
          conversation_id: string;
          label_id: string;
        };
        Update: {
          conversation_id?: string;
          label_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "inbox_conversation_labels_conversation_id_fkey";
            columns: ["conversation_id"];
            isOneToOne: false;
            referencedRelation: "inbox_conversations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "inbox_conversation_labels_label_id_fkey";
            columns: ["label_id"];
            isOneToOne: false;
            referencedRelation: "inbox_labels";
            referencedColumns: ["id"];
          },
        ];
      };
      inbox_conversations: {
        Row: {
          assignee_id: string | null;
          contact_id: string;
          created_at: string;
          id: string;
          inbox_id: string;
          last_activity_at: string;
          org_id: string;
          priority: string | null;
          snoozed_until: string | null;
          status: string;
        };
        Insert: {
          assignee_id?: string | null;
          contact_id: string;
          created_at?: string;
          id?: string;
          inbox_id: string;
          last_activity_at?: string;
          org_id: string;
          priority?: string | null;
          snoozed_until?: string | null;
          status?: string;
        };
        Update: {
          assignee_id?: string | null;
          contact_id?: string;
          created_at?: string;
          id?: string;
          inbox_id?: string;
          last_activity_at?: string;
          org_id?: string;
          priority?: string | null;
          snoozed_until?: string | null;
          status?: string;
        };
        Relationships: [
          {
            foreignKeyName: "inbox_conversations_assignee_id_fkey";
            columns: ["assignee_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "inbox_conversations_contact_id_fkey";
            columns: ["contact_id"];
            isOneToOne: false;
            referencedRelation: "inbox_contacts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "inbox_conversations_inbox_id_fkey";
            columns: ["inbox_id"];
            isOneToOne: false;
            referencedRelation: "inbox_inboxes";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "inbox_conversations_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      inbox_inboxes: {
        Row: {
          channel_config: Json;
          channel_type: string;
          created_at: string;
          enabled: boolean;
          id: string;
          name: string;
          org_id: string;
          website_token: string | null;
        };
        Insert: {
          channel_config?: Json;
          channel_type: string;
          created_at?: string;
          enabled?: boolean;
          id?: string;
          name: string;
          org_id: string;
          website_token?: string | null;
        };
        Update: {
          channel_config?: Json;
          channel_type?: string;
          created_at?: string;
          enabled?: boolean;
          id?: string;
          name?: string;
          org_id?: string;
          website_token?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "inbox_inboxes_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      inbox_labels: {
        Row: {
          color: string;
          created_at: string;
          id: string;
          org_id: string;
          title: string;
        };
        Insert: {
          color?: string;
          created_at?: string;
          id?: string;
          org_id: string;
          title: string;
        };
        Update: {
          color?: string;
          created_at?: string;
          id?: string;
          org_id?: string;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "inbox_labels_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      inbox_messages: {
        Row: {
          content: string | null;
          content_type: string;
          conversation_id: string;
          created_at: string;
          id: string;
          metadata: Json;
          org_id: string;
          private: boolean;
          sender_id: string | null;
          sender_type: string;
        };
        Insert: {
          content?: string | null;
          content_type?: string;
          conversation_id: string;
          created_at?: string;
          id?: string;
          metadata?: Json;
          org_id: string;
          private?: boolean;
          sender_id?: string | null;
          sender_type: string;
        };
        Update: {
          content?: string | null;
          content_type?: string;
          conversation_id?: string;
          created_at?: string;
          id?: string;
          metadata?: Json;
          org_id?: string;
          private?: boolean;
          sender_id?: string | null;
          sender_type?: string;
        };
        Relationships: [
          {
            foreignKeyName: "inbox_messages_conversation_id_fkey";
            columns: ["conversation_id"];
            isOneToOne: false;
            referencedRelation: "inbox_conversations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "inbox_messages_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "inbox_messages_sender_id_fkey";
            columns: ["sender_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      inbox_outbox_events: {
        Row: {
          created_at: string;
          delivered_at: string | null;
          event_type: string;
          id: string;
          org_id: string;
          payload: Json;
          target_apps: string[];
        };
        Insert: {
          created_at?: string;
          delivered_at?: string | null;
          event_type: string;
          id?: string;
          org_id: string;
          payload: Json;
          target_apps?: string[];
        };
        Update: {
          created_at?: string;
          delivered_at?: string | null;
          event_type?: string;
          id?: string;
          org_id?: string;
          payload?: Json;
          target_apps?: string[];
        };
        Relationships: [
          {
            foreignKeyName: "inbox_outbox_events_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      inbox_profiles: {
        Row: {
          availability: string;
          avatar_url: string | null;
          created_at: string;
          display_name: string | null;
          id: string;
          one_id: string | null;
          updated_at: string;
        };
        Insert: {
          availability?: string;
          avatar_url?: string | null;
          created_at?: string;
          display_name?: string | null;
          id: string;
          one_id?: string | null;
          updated_at?: string;
        };
        Update: {
          availability?: string;
          avatar_url?: string | null;
          created_at?: string;
          display_name?: string | null;
          id?: string;
          one_id?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "inbox_profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      inbox_workspace_links: {
        Row: {
          created_at: string;
          org_id: string;
          settings: Json;
        };
        Insert: {
          created_at?: string;
          org_id: string;
          settings?: Json;
        };
        Update: {
          created_at?: string;
          org_id?: string;
          settings?: Json;
        };
        Relationships: [
          {
            foreignKeyName: "inbox_workspace_links_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: true;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      instructor_assignments: {
        Row: {
          cohort_id: string | null;
          created_at: string;
          id: string;
          program_id: string;
          user_id: string;
        };
        Insert: {
          cohort_id?: string | null;
          created_at?: string;
          id?: string;
          program_id: string;
          user_id: string;
        };
        Update: {
          cohort_id?: string | null;
          created_at?: string;
          id?: string;
          program_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "instructor_assignments_cohort_id_fkey";
            columns: ["cohort_id"];
            isOneToOne: false;
            referencedRelation: "cohorts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "instructor_assignments_program_id_fkey";
            columns: ["program_id"];
            isOneToOne: false;
            referencedRelation: "programs";
            referencedColumns: ["id"];
          },
        ];
      };
      integration_credentials: {
        Row: {
          api_key_secret_id: string | null;
          api_token_secret_id: string | null;
          integration_id: string;
          oauth_access_token_secret_id: string | null;
          oauth_expires_at: string | null;
          oauth_refresh_token_secret_id: string | null;
          updated_at: string;
        };
        Insert: {
          api_key_secret_id?: string | null;
          api_token_secret_id?: string | null;
          integration_id: string;
          oauth_access_token_secret_id?: string | null;
          oauth_expires_at?: string | null;
          oauth_refresh_token_secret_id?: string | null;
          updated_at?: string;
        };
        Update: {
          api_key_secret_id?: string | null;
          api_token_secret_id?: string | null;
          integration_id?: string;
          oauth_access_token_secret_id?: string | null;
          oauth_expires_at?: string | null;
          oauth_refresh_token_secret_id?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "integration_credentials_integration_id_fkey";
            columns: ["integration_id"];
            isOneToOne: true;
            referencedRelation: "integrations";
            referencedColumns: ["id"];
          },
        ];
      };
      integration_field_mappings: {
        Row: {
          created_at: string;
          external_field_id: string;
          external_field_name: string | null;
          field_kind: string;
          ghi_field: string;
          integration_id: string;
        };
        Insert: {
          created_at?: string;
          external_field_id: string;
          external_field_name?: string | null;
          field_kind?: string;
          ghi_field: string;
          integration_id: string;
        };
        Update: {
          created_at?: string;
          external_field_id?: string;
          external_field_name?: string | null;
          field_kind?: string;
          ghi_field?: string;
          integration_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "integration_field_mappings_integration_id_fkey";
            columns: ["integration_id"];
            isOneToOne: false;
            referencedRelation: "integrations";
            referencedColumns: ["id"];
          },
        ];
      };
      integrations: {
        Row: {
          agreement_stage_id: string | null;
          appointment_stage_id: string | null;
          base_url: string | null;
          booking_timezone: string;
          calendar_sync_enabled: boolean;
          contact_app_base_url: string;
          contact_default_source: string;
          created_at: string;
          default_calendar_id: string | null;
          enabled: boolean;
          enrolled_stage_id: string | null;
          enrollment_pipeline_id: string | null;
          enrollment_stage_id: string | null;
          id: string;
          inbound_webhook_secret: string;
          invoice_sync_enabled: boolean;
          lead_captured_webhook_url: string | null;
          lead_nobook_webhook_url: string | null;
          location_id: string | null;
          name: string | null;
          organization_id: string | null;
          outbound_webhook_enabled: boolean;
          outbound_webhook_url: string | null;
          payment_sync_enabled: boolean;
          provider: string;
          qualified_stage_id: string | null;
          referral_webhook_url: string | null;
          updated_at: string;
        };
        Insert: {
          agreement_stage_id?: string | null;
          appointment_stage_id?: string | null;
          base_url?: string | null;
          booking_timezone?: string;
          calendar_sync_enabled?: boolean;
          contact_app_base_url?: string;
          contact_default_source?: string;
          created_at?: string;
          default_calendar_id?: string | null;
          enabled?: boolean;
          enrolled_stage_id?: string | null;
          enrollment_pipeline_id?: string | null;
          enrollment_stage_id?: string | null;
          id?: string;
          inbound_webhook_secret: string;
          invoice_sync_enabled?: boolean;
          lead_captured_webhook_url?: string | null;
          lead_nobook_webhook_url?: string | null;
          location_id?: string | null;
          name?: string | null;
          organization_id?: string | null;
          outbound_webhook_enabled?: boolean;
          outbound_webhook_url?: string | null;
          payment_sync_enabled?: boolean;
          provider: string;
          qualified_stage_id?: string | null;
          referral_webhook_url?: string | null;
          updated_at?: string;
        };
        Update: {
          agreement_stage_id?: string | null;
          appointment_stage_id?: string | null;
          base_url?: string | null;
          booking_timezone?: string;
          calendar_sync_enabled?: boolean;
          contact_app_base_url?: string;
          contact_default_source?: string;
          created_at?: string;
          default_calendar_id?: string | null;
          enabled?: boolean;
          enrolled_stage_id?: string | null;
          enrollment_pipeline_id?: string | null;
          enrollment_stage_id?: string | null;
          id?: string;
          inbound_webhook_secret?: string;
          invoice_sync_enabled?: boolean;
          lead_captured_webhook_url?: string | null;
          lead_nobook_webhook_url?: string | null;
          location_id?: string | null;
          name?: string | null;
          organization_id?: string | null;
          outbound_webhook_enabled?: boolean;
          outbound_webhook_url?: string | null;
          payment_sync_enabled?: boolean;
          provider?: string;
          qualified_stage_id?: string | null;
          referral_webhook_url?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "integrations_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      invoice_links: {
        Row: {
          amount_paid_synced: number;
          amount_total: number;
          created_at: string;
          ghl_contact_id: string | null;
          ghl_invoice_id: string;
          id: string;
          integration_id: string;
          invoice_id: string | null;
          last_error: string | null;
          last_inbound_at: string | null;
          last_outbound_at: string | null;
          order_id: string | null;
          status: string;
          store_purchase_id: string | null;
          updated_at: string;
        };
        Insert: {
          amount_paid_synced?: number;
          amount_total?: number;
          created_at?: string;
          ghl_contact_id?: string | null;
          ghl_invoice_id: string;
          id?: string;
          integration_id: string;
          invoice_id?: string | null;
          last_error?: string | null;
          last_inbound_at?: string | null;
          last_outbound_at?: string | null;
          order_id?: string | null;
          status?: string;
          store_purchase_id?: string | null;
          updated_at?: string;
        };
        Update: {
          amount_paid_synced?: number;
          amount_total?: number;
          created_at?: string;
          ghl_contact_id?: string | null;
          ghl_invoice_id?: string;
          id?: string;
          integration_id?: string;
          invoice_id?: string | null;
          last_error?: string | null;
          last_inbound_at?: string | null;
          last_outbound_at?: string | null;
          order_id?: string | null;
          status?: string;
          store_purchase_id?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "invoice_links_integration_id_fkey";
            columns: ["integration_id"];
            isOneToOne: false;
            referencedRelation: "integrations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "invoice_links_invoice_id_fkey";
            columns: ["invoice_id"];
            isOneToOne: true;
            referencedRelation: "invoices";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "invoice_links_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: true;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "invoice_links_store_purchase_id_fkey";
            columns: ["store_purchase_id"];
            isOneToOne: true;
            referencedRelation: "store_purchases";
            referencedColumns: ["id"];
          },
        ];
      };
      invoice_payment_links: {
        Row: {
          amount: number;
          created_at: string;
          direction: string;
          ghl_invoice_id: string;
          ghl_payment_id: string | null;
          id: string;
          installment_id: string | null;
          integration_id: string;
          order_id: string | null;
          our_payment_log_id: string | null;
          store_purchase_id: string | null;
        };
        Insert: {
          amount: number;
          created_at?: string;
          direction: string;
          ghl_invoice_id: string;
          ghl_payment_id?: string | null;
          id?: string;
          installment_id?: string | null;
          integration_id: string;
          order_id?: string | null;
          our_payment_log_id?: string | null;
          store_purchase_id?: string | null;
        };
        Update: {
          amount?: number;
          created_at?: string;
          direction?: string;
          ghl_invoice_id?: string;
          ghl_payment_id?: string | null;
          id?: string;
          installment_id?: string | null;
          integration_id?: string;
          order_id?: string | null;
          our_payment_log_id?: string | null;
          store_purchase_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "invoice_payment_links_installment_id_fkey";
            columns: ["installment_id"];
            isOneToOne: false;
            referencedRelation: "payment_plan_installments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "invoice_payment_links_integration_id_fkey";
            columns: ["integration_id"];
            isOneToOne: false;
            referencedRelation: "integrations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "invoice_payment_links_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "invoice_payment_links_our_payment_log_id_fkey";
            columns: ["our_payment_log_id"];
            isOneToOne: false;
            referencedRelation: "payment_logs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "invoice_payment_links_store_purchase_id_fkey";
            columns: ["store_purchase_id"];
            isOneToOne: false;
            referencedRelation: "store_purchases";
            referencedColumns: ["id"];
          },
        ];
      };
      invoices: {
        Row: {
          amount_due: number | null;
          amount_paid: number;
          amount_total: number;
          created_at: string;
          created_by: string | null;
          currency: string;
          description: string | null;
          due_date: string | null;
          id: string;
          invoice_number: string;
          issued_at: string | null;
          line_items: Json;
          metadata: Json;
          notes: string | null;
          order_id: string | null;
          organization_id: string | null;
          paid_at: string | null;
          public_token: string;
          recipient_email: string | null;
          recipient_name: string | null;
          sent_at: string | null;
          status: string;
          store_purchase_id: string | null;
          title: string;
          updated_at: string;
          user_id: string | null;
          voided_at: string | null;
        };
        Insert: {
          amount_due?: number | null;
          amount_paid?: number;
          amount_total: number;
          created_at?: string;
          created_by?: string | null;
          currency?: string;
          description?: string | null;
          due_date?: string | null;
          id?: string;
          invoice_number: string;
          issued_at?: string | null;
          line_items?: Json;
          metadata?: Json;
          notes?: string | null;
          order_id?: string | null;
          organization_id?: string | null;
          paid_at?: string | null;
          public_token: string;
          recipient_email?: string | null;
          recipient_name?: string | null;
          sent_at?: string | null;
          status?: string;
          store_purchase_id?: string | null;
          title: string;
          updated_at?: string;
          user_id?: string | null;
          voided_at?: string | null;
        };
        Update: {
          amount_due?: number | null;
          amount_paid?: number;
          amount_total?: number;
          created_at?: string;
          created_by?: string | null;
          currency?: string;
          description?: string | null;
          due_date?: string | null;
          id?: string;
          invoice_number?: string;
          issued_at?: string | null;
          line_items?: Json;
          metadata?: Json;
          notes?: string | null;
          order_id?: string | null;
          organization_id?: string | null;
          paid_at?: string | null;
          public_token?: string;
          recipient_email?: string | null;
          recipient_name?: string | null;
          sent_at?: string | null;
          status?: string;
          store_purchase_id?: string | null;
          title?: string;
          updated_at?: string;
          user_id?: string | null;
          voided_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "invoices_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "invoices_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "invoices_store_purchase_id_fkey";
            columns: ["store_purchase_id"];
            isOneToOne: false;
            referencedRelation: "store_purchases";
            referencedColumns: ["id"];
          },
        ];
      };
      kb_activity_logs: {
        Row: {
          action: string;
          created_at: string | null;
          details: Json | null;
          entity_id: string | null;
          entity_type: string;
          id: string;
          project_id: string;
          user_id: string;
        };
        Insert: {
          action: string;
          created_at?: string | null;
          details?: Json | null;
          entity_id?: string | null;
          entity_type: string;
          id?: string;
          project_id: string;
          user_id: string;
        };
        Update: {
          action?: string;
          created_at?: string | null;
          details?: Json | null;
          entity_id?: string | null;
          entity_type?: string;
          id?: string;
          project_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "kb_activity_logs_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "kb_projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "kb_activity_logs_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      kb_bookmarks: {
        Row: {
          created_at: string | null;
          id: string;
          project_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          project_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          project_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "kb_bookmarks_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "kb_projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "kb_bookmarks_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      kb_columns: {
        Row: {
          created_at: string | null;
          created_by: string | null;
          id: string;
          name: string;
          position: number;
          project_id: string;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          created_at?: string | null;
          created_by?: string | null;
          id?: string;
          name: string;
          position: number;
          project_id: string;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          created_at?: string | null;
          created_by?: string | null;
          id?: string;
          name?: string;
          position?: number;
          project_id?: string;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "kb_columns_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "kb_profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "kb_columns_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "kb_projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "kb_columns_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "kb_profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      kb_notifications: {
        Row: {
          created_at: string | null;
          data: Json | null;
          id: string;
          message: string;
          read: boolean | null;
          title: string;
          type: string;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          data?: Json | null;
          id?: string;
          message: string;
          read?: boolean | null;
          title: string;
          type: string;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          data?: Json | null;
          id?: string;
          message?: string;
          read?: boolean | null;
          title?: string;
          type?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "kb_notifications_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      kb_profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string | null;
          email: string;
          full_name: string | null;
          id: string;
          one_id: string | null;
          stripe_customer_id: string | null;
          subscription_status: Database["public"]["Enums"]["kb_subscription_status"] | null;
          updated_at: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string | null;
          email: string;
          full_name?: string | null;
          id: string;
          one_id?: string | null;
          stripe_customer_id?: string | null;
          subscription_status?: Database["public"]["Enums"]["kb_subscription_status"] | null;
          updated_at?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string | null;
          email?: string;
          full_name?: string | null;
          id?: string;
          one_id?: string | null;
          stripe_customer_id?: string | null;
          subscription_status?: Database["public"]["Enums"]["kb_subscription_status"] | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "kb_profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      kb_project_members: {
        Row: {
          created_at: string | null;
          id: string;
          project_id: string;
          role: Database["public"]["Enums"]["kb_project_member_role"] | null;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          project_id: string;
          role?: Database["public"]["Enums"]["kb_project_member_role"] | null;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          project_id?: string;
          role?: Database["public"]["Enums"]["kb_project_member_role"] | null;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "kb_project_members_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "kb_projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "kb_project_members_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      kb_projects: {
        Row: {
          created_at: string | null;
          created_by: string | null;
          description: string | null;
          id: string;
          name: string;
          public_share_token: string | null;
          slug: string | null;
          updated_at: string | null;
          updated_by: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          created_by?: string | null;
          description?: string | null;
          id?: string;
          name: string;
          public_share_token?: string | null;
          slug?: string | null;
          updated_at?: string | null;
          updated_by?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          created_by?: string | null;
          description?: string | null;
          id?: string;
          name?: string;
          public_share_token?: string | null;
          slug?: string | null;
          updated_at?: string | null;
          updated_by?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "kb_projects_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "kb_profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "kb_projects_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "kb_profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "kb_projects_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      kb_stripe_customers: {
        Row: {
          created_at: string | null;
          customer_id: string;
          deleted_at: string | null;
          id: number;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          customer_id: string;
          deleted_at?: string | null;
          id?: number;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          customer_id?: string;
          deleted_at?: string | null;
          id?: number;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "kb_stripe_customers_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      kb_stripe_orders: {
        Row: {
          amount_subtotal: number;
          amount_total: number;
          checkout_session_id: string;
          created_at: string | null;
          currency: string;
          customer_id: string;
          deleted_at: string | null;
          id: number;
          payment_intent_id: string;
          payment_status: string;
          status: Database["public"]["Enums"]["kb_stripe_order_status"] | null;
          updated_at: string | null;
        };
        Insert: {
          amount_subtotal: number;
          amount_total: number;
          checkout_session_id: string;
          created_at?: string | null;
          currency: string;
          customer_id: string;
          deleted_at?: string | null;
          id?: number;
          payment_intent_id: string;
          payment_status: string;
          status?: Database["public"]["Enums"]["kb_stripe_order_status"] | null;
          updated_at?: string | null;
        };
        Update: {
          amount_subtotal?: number;
          amount_total?: number;
          checkout_session_id?: string;
          created_at?: string | null;
          currency?: string;
          customer_id?: string;
          deleted_at?: string | null;
          id?: number;
          payment_intent_id?: string;
          payment_status?: string;
          status?: Database["public"]["Enums"]["kb_stripe_order_status"] | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      kb_stripe_subscriptions: {
        Row: {
          cancel_at_period_end: boolean | null;
          created_at: string | null;
          current_period_end: number | null;
          current_period_start: number | null;
          customer_id: string;
          deleted_at: string | null;
          id: number;
          payment_method_brand: string | null;
          payment_method_last4: string | null;
          price_id: string | null;
          status: Database["public"]["Enums"]["kb_stripe_subscription_status"];
          subscription_id: string | null;
          updated_at: string | null;
        };
        Insert: {
          cancel_at_period_end?: boolean | null;
          created_at?: string | null;
          current_period_end?: number | null;
          current_period_start?: number | null;
          customer_id: string;
          deleted_at?: string | null;
          id?: number;
          payment_method_brand?: string | null;
          payment_method_last4?: string | null;
          price_id?: string | null;
          status: Database["public"]["Enums"]["kb_stripe_subscription_status"];
          subscription_id?: string | null;
          updated_at?: string | null;
        };
        Update: {
          cancel_at_period_end?: boolean | null;
          created_at?: string | null;
          current_period_end?: number | null;
          current_period_start?: number | null;
          customer_id?: string;
          deleted_at?: string | null;
          id?: number;
          payment_method_brand?: string | null;
          payment_method_last4?: string | null;
          price_id?: string | null;
          status?: Database["public"]["Enums"]["kb_stripe_subscription_status"];
          subscription_id?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      kb_task_comments: {
        Row: {
          content: string;
          created_at: string | null;
          id: string;
          task_id: string;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          content: string;
          created_at?: string | null;
          id?: string;
          task_id: string;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          content?: string;
          created_at?: string | null;
          id?: string;
          task_id?: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "kb_task_comments_task_id_fkey";
            columns: ["task_id"];
            isOneToOne: false;
            referencedRelation: "kb_tasks";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "kb_task_comments_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      kb_tasks: {
        Row: {
          assigned_to: string | null;
          column_id: string;
          created_at: string | null;
          created_by: string | null;
          description: string | null;
          due_date: string | null;
          id: string;
          is_done: boolean | null;
          position: number;
          priority: Database["public"]["Enums"]["kb_task_priority"] | null;
          title: string;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          assigned_to?: string | null;
          column_id: string;
          created_at?: string | null;
          created_by?: string | null;
          description?: string | null;
          due_date?: string | null;
          id?: string;
          is_done?: boolean | null;
          position: number;
          priority?: Database["public"]["Enums"]["kb_task_priority"] | null;
          title: string;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          assigned_to?: string | null;
          column_id?: string;
          created_at?: string | null;
          created_by?: string | null;
          description?: string | null;
          due_date?: string | null;
          id?: string;
          is_done?: boolean | null;
          position?: number;
          priority?: Database["public"]["Enums"]["kb_task_priority"] | null;
          title?: string;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "kb_tasks_assigned_to_fkey";
            columns: ["assigned_to"];
            isOneToOne: false;
            referencedRelation: "kb_profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "kb_tasks_column_id_fkey";
            columns: ["column_id"];
            isOneToOne: false;
            referencedRelation: "kb_columns";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "kb_tasks_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "kb_profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "kb_tasks_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "kb_profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      kiosk_assignments: {
        Row: {
          created_at: string;
          id: string;
          is_active: boolean;
          kiosk_user_id: string;
          location_name: string | null;
          organization_id: string;
          room_id: string | null;
          room_name: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          is_active?: boolean;
          kiosk_user_id: string;
          location_name?: string | null;
          organization_id: string;
          room_id?: string | null;
          room_name?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          is_active?: boolean;
          kiosk_user_id?: string;
          location_name?: string | null;
          organization_id?: string;
          room_id?: string | null;
          room_name?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "kiosk_assignments_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "kiosk_assignments_room_id_fkey";
            columns: ["room_id"];
            isOneToOne: false;
            referencedRelation: "rooms";
            referencedColumns: ["id"];
          },
        ];
      };
      lead_applications: {
        Row: {
          appointment_booked_at: string | null;
          appointment_id: string | null;
          created_at: string;
          declared_source: string | null;
          declared_source_detail: string | null;
          enrollment_completed_at: string | null;
          enrollment_started_at: string | null;
          entry_cta_id: string | null;
          entry_cta_label: string | null;
          entry_cta_name: string | null;
          entry_flow_variant: string | null;
          entry_page_type: string | null;
          entry_page_url: string | null;
          entry_program: string | null;
          entry_timestamp: string | null;
          fbclid: string | null;
          flow_id: string | null;
          gad_campaign_id: string | null;
          gbraid: string | null;
          gclid: string | null;
          id: string;
          notes: string | null;
          organization_id: string | null;
          portal_created_at: string | null;
          preview_booked_at: string | null;
          program_id: string | null;
          referral_code: string | null;
          referral_id: string | null;
          referrer: string | null;
          source: string | null;
          status: string;
          updated_at: string;
          user_id: string;
          utm_campaign: string | null;
          utm_content: string | null;
          utm_medium: string | null;
          utm_source: string | null;
          utm_term: string | null;
          wbraid: string | null;
        };
        Insert: {
          appointment_booked_at?: string | null;
          appointment_id?: string | null;
          created_at?: string;
          declared_source?: string | null;
          declared_source_detail?: string | null;
          enrollment_completed_at?: string | null;
          enrollment_started_at?: string | null;
          entry_cta_id?: string | null;
          entry_cta_label?: string | null;
          entry_cta_name?: string | null;
          entry_flow_variant?: string | null;
          entry_page_type?: string | null;
          entry_page_url?: string | null;
          entry_program?: string | null;
          entry_timestamp?: string | null;
          fbclid?: string | null;
          flow_id?: string | null;
          gad_campaign_id?: string | null;
          gbraid?: string | null;
          gclid?: string | null;
          id?: string;
          notes?: string | null;
          organization_id?: string | null;
          portal_created_at?: string | null;
          preview_booked_at?: string | null;
          program_id?: string | null;
          referral_code?: string | null;
          referral_id?: string | null;
          referrer?: string | null;
          source?: string | null;
          status?: string;
          updated_at?: string;
          user_id: string;
          utm_campaign?: string | null;
          utm_content?: string | null;
          utm_medium?: string | null;
          utm_source?: string | null;
          utm_term?: string | null;
          wbraid?: string | null;
        };
        Update: {
          appointment_booked_at?: string | null;
          appointment_id?: string | null;
          created_at?: string;
          declared_source?: string | null;
          declared_source_detail?: string | null;
          enrollment_completed_at?: string | null;
          enrollment_started_at?: string | null;
          entry_cta_id?: string | null;
          entry_cta_label?: string | null;
          entry_cta_name?: string | null;
          entry_flow_variant?: string | null;
          entry_page_type?: string | null;
          entry_page_url?: string | null;
          entry_program?: string | null;
          entry_timestamp?: string | null;
          fbclid?: string | null;
          flow_id?: string | null;
          gad_campaign_id?: string | null;
          gbraid?: string | null;
          gclid?: string | null;
          id?: string;
          notes?: string | null;
          organization_id?: string | null;
          portal_created_at?: string | null;
          preview_booked_at?: string | null;
          program_id?: string | null;
          referral_code?: string | null;
          referral_id?: string | null;
          referrer?: string | null;
          source?: string | null;
          status?: string;
          updated_at?: string;
          user_id?: string;
          utm_campaign?: string | null;
          utm_content?: string | null;
          utm_medium?: string | null;
          utm_source?: string | null;
          utm_term?: string | null;
          wbraid?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "lead_applications_entry_cta_id_fkey";
            columns: ["entry_cta_id"];
            isOneToOne: false;
            referencedRelation: "cta_config";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "lead_applications_flow_id_fkey";
            columns: ["flow_id"];
            isOneToOne: false;
            referencedRelation: "flows";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "lead_applications_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "lead_applications_program_id_fkey";
            columns: ["program_id"];
            isOneToOne: false;
            referencedRelation: "programs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "lead_applications_referral_code_fkey";
            columns: ["referral_code"];
            isOneToOne: false;
            referencedRelation: "referral_codes";
            referencedColumns: ["code"];
          },
          {
            foreignKeyName: "lead_applications_referral_id_fkey";
            columns: ["referral_id"];
            isOneToOne: false;
            referencedRelation: "referrals";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "lead_applications_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      lead_assignments: {
        Row: {
          assignee_user_id: string | null;
          created_at: string;
          first_contacted_at: string | null;
          id: string;
          notes: string | null;
          organization_id: string | null;
          profile_id: string;
          updated_at: string;
        };
        Insert: {
          assignee_user_id?: string | null;
          created_at?: string;
          first_contacted_at?: string | null;
          id?: string;
          notes?: string | null;
          organization_id?: string | null;
          profile_id: string;
          updated_at?: string;
        };
        Update: {
          assignee_user_id?: string | null;
          created_at?: string;
          first_contacted_at?: string | null;
          id?: string;
          notes?: string | null;
          organization_id?: string | null;
          profile_id?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      lead_center_saved_views: {
        Row: {
          created_at: string;
          filters: Json;
          id: string;
          name: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          filters?: Json;
          id?: string;
          name: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          filters?: Json;
          id?: string;
          name?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      leads: {
        Row: {
          alt_emails: string[];
          alt_phones: string[];
          attribution_session_id: string | null;
          created_at: string;
          email: string;
          external_contact_id: string | null;
          fbclid: string | null;
          followup_queued_at: string | null;
          gad_campaign_id: string | null;
          gclid: string | null;
          ghl_synced_at: string | null;
          id: string;
          meta_ad_id: string | null;
          meta_adset_id: string | null;
          meta_campaign_id: string | null;
          meta_created_at: string | null;
          meta_form_id: string | null;
          meta_lead_id: string | null;
          name: string;
          phone: string;
          program: string;
          program_id: string | null;
          source: string | null;
          utm_campaign: string | null;
          utm_content: string | null;
          utm_medium: string | null;
          utm_source: string | null;
          utm_term: string | null;
        };
        Insert: {
          alt_emails?: string[];
          alt_phones?: string[];
          attribution_session_id?: string | null;
          created_at?: string;
          email: string;
          external_contact_id?: string | null;
          fbclid?: string | null;
          followup_queued_at?: string | null;
          gad_campaign_id?: string | null;
          gclid?: string | null;
          ghl_synced_at?: string | null;
          id?: string;
          meta_ad_id?: string | null;
          meta_adset_id?: string | null;
          meta_campaign_id?: string | null;
          meta_created_at?: string | null;
          meta_form_id?: string | null;
          meta_lead_id?: string | null;
          name: string;
          phone: string;
          program: string;
          program_id?: string | null;
          source?: string | null;
          utm_campaign?: string | null;
          utm_content?: string | null;
          utm_medium?: string | null;
          utm_source?: string | null;
          utm_term?: string | null;
        };
        Update: {
          alt_emails?: string[];
          alt_phones?: string[];
          attribution_session_id?: string | null;
          created_at?: string;
          email?: string;
          external_contact_id?: string | null;
          fbclid?: string | null;
          followup_queued_at?: string | null;
          gad_campaign_id?: string | null;
          gclid?: string | null;
          ghl_synced_at?: string | null;
          id?: string;
          meta_ad_id?: string | null;
          meta_adset_id?: string | null;
          meta_campaign_id?: string | null;
          meta_created_at?: string | null;
          meta_form_id?: string | null;
          meta_lead_id?: string | null;
          name?: string;
          phone?: string;
          program?: string;
          program_id?: string | null;
          source?: string | null;
          utm_campaign?: string | null;
          utm_content?: string | null;
          utm_medium?: string | null;
          utm_source?: string | null;
          utm_term?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "leads_program_id_fkey";
            columns: ["program_id"];
            isOneToOne: false;
            referencedRelation: "programs";
            referencedColumns: ["id"];
          },
        ];
      };
      lesson_progress: {
        Row: {
          completed_at: string | null;
          created_at: string;
          id: string;
          lesson_id: string;
          quiz_score: number | null;
          user_id: string;
        };
        Insert: {
          completed_at?: string | null;
          created_at?: string;
          id?: string;
          lesson_id: string;
          quiz_score?: number | null;
          user_id: string;
        };
        Update: {
          completed_at?: string | null;
          created_at?: string;
          id?: string;
          lesson_id?: string;
          quiz_score?: number | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "lesson_progress_lesson_id_fkey";
            columns: ["lesson_id"];
            isOneToOne: false;
            referencedRelation: "lessons";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "lesson_progress_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      lessons: {
        Row: {
          content_body: string | null;
          content_url: string | null;
          created_at: string;
          duration_minutes: number | null;
          id: string;
          quiz_template_id: string | null;
          section_id: string;
          sequence_order: number;
          status: string;
          title: string;
          type: string;
        };
        Insert: {
          content_body?: string | null;
          content_url?: string | null;
          created_at?: string;
          duration_minutes?: number | null;
          id?: string;
          quiz_template_id?: string | null;
          section_id: string;
          sequence_order?: number;
          status?: string;
          title: string;
          type?: string;
        };
        Update: {
          content_body?: string | null;
          content_url?: string | null;
          created_at?: string;
          duration_minutes?: number | null;
          id?: string;
          quiz_template_id?: string | null;
          section_id?: string;
          sequence_order?: number;
          status?: string;
          title?: string;
          type?: string;
        };
        Relationships: [
          {
            foreignKeyName: "lessons_quiz_template_id_fkey";
            columns: ["quiz_template_id"];
            isOneToOne: false;
            referencedRelation: "quiz_templates";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "lessons_section_id_fkey";
            columns: ["section_id"];
            isOneToOne: false;
            referencedRelation: "course_sections";
            referencedColumns: ["id"];
          },
        ];
      };
      marketing_ad_spend: {
        Row: {
          amount: number;
          campaign_id: string | null;
          campaign_name: string | null;
          clicks: number | null;
          created_at: string;
          id: string;
          impressions: number | null;
          platform: string;
          source: string;
          spend_date: string;
          updated_at: string;
        };
        Insert: {
          amount?: number;
          campaign_id?: string | null;
          campaign_name?: string | null;
          clicks?: number | null;
          created_at?: string;
          id?: string;
          impressions?: number | null;
          platform: string;
          source?: string;
          spend_date: string;
          updated_at?: string;
        };
        Update: {
          amount?: number;
          campaign_id?: string | null;
          campaign_name?: string | null;
          clicks?: number | null;
          created_at?: string;
          id?: string;
          impressions?: number | null;
          platform?: string;
          source?: string;
          spend_date?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      meetings: {
        Row: {
          appointment_id: string | null;
          created_at: string;
          ended_at: string | null;
          host_id: string;
          id: string;
          meeting_url: string | null;
          organization_id: string | null;
          started_at: string | null;
          status: string;
          updated_at: string;
        };
        Insert: {
          appointment_id?: string | null;
          created_at?: string;
          ended_at?: string | null;
          host_id: string;
          id?: string;
          meeting_url?: string | null;
          organization_id?: string | null;
          started_at?: string | null;
          status?: string;
          updated_at?: string;
        };
        Update: {
          appointment_id?: string | null;
          created_at?: string;
          ended_at?: string | null;
          host_id?: string;
          id?: string;
          meeting_url?: string | null;
          organization_id?: string | null;
          started_at?: string | null;
          status?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "meetings_appointment_id_fkey";
            columns: ["appointment_id"];
            isOneToOne: false;
            referencedRelation: "appointments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "meetings_host_id_fkey";
            columns: ["host_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "meetings_tenant_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      memberships: {
        Row: {
          created_at: string;
          id: string;
          organization_id: string;
          role: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          organization_id: string;
          role?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          organization_id?: string;
          role?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tenant_members_tenant_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tenant_members_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      message_reactions: {
        Row: {
          created_at: string;
          emoji: string;
          id: string;
          message_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          emoji: string;
          id?: string;
          message_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          emoji?: string;
          id?: string;
          message_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "message_reactions_message_id_fkey";
            columns: ["message_id"];
            isOneToOne: false;
            referencedRelation: "community_messages";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "message_reactions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      messages: {
        Row: {
          content: string;
          created_at: string;
          id: string;
          organization_id: string | null;
          read: boolean;
          recipient_id: string;
          sender_id: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          id?: string;
          organization_id?: string | null;
          read?: boolean;
          recipient_id: string;
          sender_id: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: string;
          organization_id?: string | null;
          read?: boolean;
          recipient_id?: string;
          sender_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "messages_recipient_id_fkey";
            columns: ["recipient_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "messages_sender_id_fkey";
            columns: ["sender_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "messages_tenant_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      notification_preferences: {
        Row: {
          announcement_notifications: boolean;
          call_notifications: boolean;
          dm_notifications: boolean;
          email_notifications: boolean;
          feed_notifications: boolean;
          space_notifications: boolean;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          announcement_notifications?: boolean;
          call_notifications?: boolean;
          dm_notifications?: boolean;
          email_notifications?: boolean;
          feed_notifications?: boolean;
          space_notifications?: boolean;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          announcement_notifications?: boolean;
          call_notifications?: boolean;
          dm_notifications?: boolean;
          email_notifications?: boolean;
          feed_notifications?: boolean;
          space_notifications?: boolean;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "notification_preferences_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      onboarding_steps: {
        Row: {
          completed: boolean;
          completed_at: string | null;
          created_at: string;
          enrollment_id: string;
          id: string;
          step_key: string;
          step_label: string;
        };
        Insert: {
          completed?: boolean;
          completed_at?: string | null;
          created_at?: string;
          enrollment_id: string;
          id?: string;
          step_key: string;
          step_label: string;
        };
        Update: {
          completed?: boolean;
          completed_at?: string | null;
          created_at?: string;
          enrollment_id?: string;
          id?: string;
          step_key?: string;
          step_label?: string;
        };
        Relationships: [
          {
            foreignKeyName: "onboarding_steps_enrollment_id_fkey";
            columns: ["enrollment_id"];
            isOneToOne: false;
            referencedRelation: "enrollments";
            referencedColumns: ["id"];
          },
        ];
      };
      one_id_app_activations: {
        Row: {
          activation_kind: string;
          app_id: string;
          first_seen_at: string;
          last_seen_at: string;
          user_id: string;
        };
        Insert: {
          activation_kind?: string;
          app_id: string;
          first_seen_at?: string;
          last_seen_at?: string;
          user_id: string;
        };
        Update: {
          activation_kind?: string;
          app_id?: string;
          first_seen_at?: string;
          last_seen_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      one_id_profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          display_name: string | null;
          one_id: string;
          primary_workspace_id: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          display_name?: string | null;
          one_id: string;
          primary_workspace_id?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          display_name?: string | null;
          one_id?: string;
          primary_workspace_id?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "one_id_profiles_primary_workspace_id_fkey";
            columns: ["primary_workspace_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      oneos_events: {
        Row: {
          created_at: string;
          id: string;
          kind: string;
          payload: Json;
          related_project_id: string | null;
          related_task_id: string | null;
          thread_id: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          kind: string;
          payload?: Json;
          related_project_id?: string | null;
          related_task_id?: string | null;
          thread_id?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          kind?: string;
          payload?: Json;
          related_project_id?: string | null;
          related_task_id?: string | null;
          thread_id?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "oneos_events_related_project_id_fkey";
            columns: ["related_project_id"];
            isOneToOne: false;
            referencedRelation: "oneos_projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "oneos_events_related_task_id_fkey";
            columns: ["related_task_id"];
            isOneToOne: false;
            referencedRelation: "oneos_tasks";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "oneos_events_thread_id_fkey";
            columns: ["thread_id"];
            isOneToOne: false;
            referencedRelation: "oneos_threads";
            referencedColumns: ["id"];
          },
        ];
      };
      oneos_messages: {
        Row: {
          content: string;
          created_at: string;
          id: string;
          parts: Json;
          role: string;
          thread_id: string;
          user_id: string;
        };
        Insert: {
          content?: string;
          created_at?: string;
          id?: string;
          parts?: Json;
          role: string;
          thread_id: string;
          user_id: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: string;
          parts?: Json;
          role?: string;
          thread_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "oneos_messages_thread_id_fkey";
            columns: ["thread_id"];
            isOneToOne: false;
            referencedRelation: "oneos_threads";
            referencedColumns: ["id"];
          },
        ];
      };
      oneos_projects: {
        Row: {
          ai_summary: string | null;
          category: string | null;
          created_at: string;
          id: string;
          notes: string | null;
          priority: number;
          status: string;
          title: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          ai_summary?: string | null;
          category?: string | null;
          created_at?: string;
          id?: string;
          notes?: string | null;
          priority?: number;
          status?: string;
          title: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          ai_summary?: string | null;
          category?: string | null;
          created_at?: string;
          id?: string;
          notes?: string | null;
          priority?: number;
          status?: string;
          title?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      oneos_tasks: {
        Row: {
          category: string;
          completed_at: string | null;
          created_at: string;
          due_date: string | null;
          id: string;
          notes: string | null;
          priority: number;
          project_id: string | null;
          source_message_id: string | null;
          status: string;
          tags: string[];
          thread_id: string | null;
          title: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          category?: string;
          completed_at?: string | null;
          created_at?: string;
          due_date?: string | null;
          id?: string;
          notes?: string | null;
          priority?: number;
          project_id?: string | null;
          source_message_id?: string | null;
          status?: string;
          tags?: string[];
          thread_id?: string | null;
          title: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          category?: string;
          completed_at?: string | null;
          created_at?: string;
          due_date?: string | null;
          id?: string;
          notes?: string | null;
          priority?: number;
          project_id?: string | null;
          source_message_id?: string | null;
          status?: string;
          tags?: string[];
          thread_id?: string | null;
          title?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "oneos_tasks_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "oneos_projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "oneos_tasks_thread_id_fkey";
            columns: ["thread_id"];
            isOneToOne: false;
            referencedRelation: "oneos_threads";
            referencedColumns: ["id"];
          },
        ];
      };
      oneos_threads: {
        Row: {
          created_at: string;
          id: string;
          last_message_at: string;
          title: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          last_message_at?: string;
          title?: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          last_message_at?: string;
          title?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      order_customers: {
        Row: {
          address: string | null;
          city: string | null;
          created_at: string;
          email: string;
          first_name: string;
          id: string;
          last_name: string;
          order_id: string;
          phone: string;
          state: string | null;
          zip: string | null;
        };
        Insert: {
          address?: string | null;
          city?: string | null;
          created_at?: string;
          email: string;
          first_name: string;
          id?: string;
          last_name: string;
          order_id: string;
          phone: string;
          state?: string | null;
          zip?: string | null;
        };
        Update: {
          address?: string | null;
          city?: string | null;
          created_at?: string;
          email?: string;
          first_name?: string;
          id?: string;
          last_name?: string;
          order_id?: string;
          phone?: string;
          state?: string | null;
          zip?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "order_customers_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
        ];
      };
      orders: {
        Row: {
          auto_charge_enabled: boolean;
          bundle_id: string | null;
          cohort_id: string | null;
          created_at: string;
          deposit_paid: number;
          discount_amount: number;
          flow_id: string | null;
          ghl_calendar_booked: boolean;
          id: string;
          lead_application_id: string | null;
          line_items: Json;
          list_price: number;
          order_status: string;
          payment_option: string;
          payment_status: string;
          program_id: string;
          reservation_expires_at: string | null;
          reserved_at: string | null;
          salesflow_invoice_id: string | null;
          salesflow_synced: boolean;
          square_card_id: string | null;
          square_customer_id: string | null;
          start_date_pending: boolean;
          total_amount: number;
          updated_at: string;
          user_id: string | null;
          variant_id: string | null;
        };
        Insert: {
          auto_charge_enabled?: boolean;
          bundle_id?: string | null;
          cohort_id?: string | null;
          created_at?: string;
          deposit_paid?: number;
          discount_amount?: number;
          flow_id?: string | null;
          ghl_calendar_booked?: boolean;
          id?: string;
          lead_application_id?: string | null;
          line_items?: Json;
          list_price?: number;
          order_status?: string;
          payment_option?: string;
          payment_status?: string;
          program_id: string;
          reservation_expires_at?: string | null;
          reserved_at?: string | null;
          salesflow_invoice_id?: string | null;
          salesflow_synced?: boolean;
          square_card_id?: string | null;
          square_customer_id?: string | null;
          start_date_pending?: boolean;
          total_amount?: number;
          updated_at?: string;
          user_id?: string | null;
          variant_id?: string | null;
        };
        Update: {
          auto_charge_enabled?: boolean;
          bundle_id?: string | null;
          cohort_id?: string | null;
          created_at?: string;
          deposit_paid?: number;
          discount_amount?: number;
          flow_id?: string | null;
          ghl_calendar_booked?: boolean;
          id?: string;
          lead_application_id?: string | null;
          line_items?: Json;
          list_price?: number;
          order_status?: string;
          payment_option?: string;
          payment_status?: string;
          program_id?: string;
          reservation_expires_at?: string | null;
          reserved_at?: string | null;
          salesflow_invoice_id?: string | null;
          salesflow_synced?: boolean;
          square_card_id?: string | null;
          square_customer_id?: string | null;
          start_date_pending?: boolean;
          total_amount?: number;
          updated_at?: string;
          user_id?: string | null;
          variant_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "orders_bundle_id_fkey";
            columns: ["bundle_id"];
            isOneToOne: false;
            referencedRelation: "bundles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "orders_cohort_id_fkey";
            columns: ["cohort_id"];
            isOneToOne: false;
            referencedRelation: "cohorts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "orders_flow_id_fkey";
            columns: ["flow_id"];
            isOneToOne: false;
            referencedRelation: "flows";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "orders_lead_application_id_fkey";
            columns: ["lead_application_id"];
            isOneToOne: false;
            referencedRelation: "lead_applications";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "orders_program_id_fkey";
            columns: ["program_id"];
            isOneToOne: false;
            referencedRelation: "programs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "orders_variant_id_fkey";
            columns: ["variant_id"];
            isOneToOne: false;
            referencedRelation: "program_variants";
            referencedColumns: ["id"];
          },
        ];
      };
      organization_invites: {
        Row: {
          accepted_at: string | null;
          created_at: string;
          email: string;
          id: string;
          invited_by: string;
          organization_id: string;
          role: string;
        };
        Insert: {
          accepted_at?: string | null;
          created_at?: string;
          email: string;
          id?: string;
          invited_by: string;
          organization_id: string;
          role?: string;
        };
        Update: {
          accepted_at?: string | null;
          created_at?: string;
          email?: string;
          id?: string;
          invited_by?: string;
          organization_id?: string;
          role?: string;
        };
        Relationships: [
          {
            foreignKeyName: "organization_invites_invited_by_fkey";
            columns: ["invited_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "organization_invites_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      organization_members: {
        Row: {
          clerk_org_id: string;
          clerk_user_id: string | null;
          created_at: string;
          id: string;
          organization_id: string;
          role: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          clerk_org_id: string;
          clerk_user_id?: string | null;
          created_at?: string;
          id?: string;
          organization_id: string;
          role?: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          clerk_org_id?: string;
          clerk_user_id?: string | null;
          created_at?: string;
          id?: string;
          organization_id?: string;
          role?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "organization_members_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      organizations: {
        Row: {
          clerk_org_id: string | null;
          created_at: string | null;
          id: string;
          logo_url: string | null;
          max_clients: number;
          name: string;
          oneid_org_id: string | null;
          owner_id: string | null;
          platform_flags: Json | null;
          primary_color: string | null;
          school_name: string | null;
          slug: string | null;
          status: string;
          subscription_tier: string;
          support_email: string | null;
          timezone: string;
          updated_at: string;
        };
        Insert: {
          clerk_org_id?: string | null;
          created_at?: string | null;
          id?: string;
          logo_url?: string | null;
          max_clients?: number;
          name: string;
          oneid_org_id?: string | null;
          owner_id?: string | null;
          platform_flags?: Json | null;
          primary_color?: string | null;
          school_name?: string | null;
          slug?: string | null;
          status?: string;
          subscription_tier?: string;
          support_email?: string | null;
          timezone?: string;
          updated_at?: string;
        };
        Update: {
          clerk_org_id?: string | null;
          created_at?: string | null;
          id?: string;
          logo_url?: string | null;
          max_clients?: number;
          name?: string;
          oneid_org_id?: string | null;
          owner_id?: string | null;
          platform_flags?: Json | null;
          primary_color?: string | null;
          school_name?: string | null;
          slug?: string | null;
          status?: string;
          subscription_tier?: string;
          support_email?: string | null;
          timezone?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "organizations_owner_id_fkey";
            columns: ["owner_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      os_chats: {
        Row: {
          created_at: string;
          created_by: string | null;
          files: Json;
          id: string;
          optimization_mode: string;
          org_id: string;
          sources: Json;
          title: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          files?: Json;
          id: string;
          optimization_mode?: string;
          org_id: string;
          sources?: Json;
          title: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          files?: Json;
          id?: string;
          optimization_mode?: string;
          org_id?: string;
          sources?: Json;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "os_chats_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      os_guest_search_usage: {
        Row: {
          claimed_at: string | null;
          created_at: string;
          expires_at: string | null;
          searches_used: number;
          user_id: string;
        };
        Insert: {
          claimed_at?: string | null;
          created_at?: string;
          expires_at?: string | null;
          searches_used?: number;
          user_id: string;
        };
        Update: {
          claimed_at?: string | null;
          created_at?: string;
          expires_at?: string | null;
          searches_used?: number;
          user_id?: string;
        };
        Relationships: [];
      };
      os_messages: {
        Row: {
          chat_id: string;
          created_at: string;
          created_by: string | null;
          credits_used: number;
          id: string;
          message_id: string;
          model: string | null;
          org_id: string;
          query: string;
          response_blocks: Json;
          status: string;
        };
        Insert: {
          chat_id: string;
          created_at?: string;
          created_by?: string | null;
          credits_used?: number;
          id?: string;
          message_id: string;
          model?: string | null;
          org_id: string;
          query: string;
          response_blocks?: Json;
          status?: string;
        };
        Update: {
          chat_id?: string;
          created_at?: string;
          created_by?: string | null;
          credits_used?: number;
          id?: string;
          message_id?: string;
          model?: string | null;
          org_id?: string;
          query?: string;
          response_blocks?: Json;
          status?: string;
        };
        Relationships: [
          {
            foreignKeyName: "os_messages_chat_id_fkey";
            columns: ["chat_id"];
            isOneToOne: false;
            referencedRelation: "os_chats";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "os_messages_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      os_uploads: {
        Row: {
          chat_id: string | null;
          created_at: string;
          created_by: string | null;
          id: string;
          mime: string | null;
          name: string;
          org_id: string;
          storage_path: string;
        };
        Insert: {
          chat_id?: string | null;
          created_at?: string;
          created_by?: string | null;
          id?: string;
          mime?: string | null;
          name: string;
          org_id: string;
          storage_path: string;
        };
        Update: {
          chat_id?: string | null;
          created_at?: string;
          created_by?: string | null;
          id?: string;
          mime?: string | null;
          name?: string;
          org_id?: string;
          storage_path?: string;
        };
        Relationships: [
          {
            foreignKeyName: "os_uploads_chat_id_fkey";
            columns: ["chat_id"];
            isOneToOne: false;
            referencedRelation: "os_chats";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "os_uploads_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "ao_orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      outbound_webhook_logs: {
        Row: {
          attempt_count: number;
          created_at: string;
          id: string;
          last_attempt_at: string | null;
          lead_application_id: string | null;
          lead_id: string | null;
          order_id: string | null;
          payload_json: Json | null;
          response_body: string | null;
          response_status: number | null;
          status: string;
          webhook_type: string;
        };
        Insert: {
          attempt_count?: number;
          created_at?: string;
          id?: string;
          last_attempt_at?: string | null;
          lead_application_id?: string | null;
          lead_id?: string | null;
          order_id?: string | null;
          payload_json?: Json | null;
          response_body?: string | null;
          response_status?: number | null;
          status?: string;
          webhook_type?: string;
        };
        Update: {
          attempt_count?: number;
          created_at?: string;
          id?: string;
          last_attempt_at?: string | null;
          lead_application_id?: string | null;
          lead_id?: string | null;
          order_id?: string | null;
          payload_json?: Json | null;
          response_body?: string | null;
          response_status?: number | null;
          status?: string;
          webhook_type?: string;
        };
        Relationships: [
          {
            foreignKeyName: "outbound_webhook_logs_lead_application_id_fkey";
            columns: ["lead_application_id"];
            isOneToOne: false;
            referencedRelation: "lead_applications";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "outbound_webhook_logs_lead_id_fkey";
            columns: ["lead_id"];
            isOneToOne: false;
            referencedRelation: "leads";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "outbound_webhook_logs_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
        ];
      };
      payment_events: {
        Row: {
          amount_cents: number | null;
          created_at: string;
          currency: string;
          enrollment_id: string | null;
          event_type: string;
          external_id: string | null;
          id: string;
          idempotency_key: string;
          order_id: string | null;
          payload_hash: string | null;
          raw_payload: Json | null;
          source: string;
        };
        Insert: {
          amount_cents?: number | null;
          created_at?: string;
          currency?: string;
          enrollment_id?: string | null;
          event_type: string;
          external_id?: string | null;
          id?: string;
          idempotency_key: string;
          order_id?: string | null;
          payload_hash?: string | null;
          raw_payload?: Json | null;
          source: string;
        };
        Update: {
          amount_cents?: number | null;
          created_at?: string;
          currency?: string;
          enrollment_id?: string | null;
          event_type?: string;
          external_id?: string | null;
          id?: string;
          idempotency_key?: string;
          order_id?: string | null;
          payload_hash?: string | null;
          raw_payload?: Json | null;
          source?: string;
        };
        Relationships: [
          {
            foreignKeyName: "payment_events_enrollment_id_fkey";
            columns: ["enrollment_id"];
            isOneToOne: false;
            referencedRelation: "enrollments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "payment_events_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
        ];
      };
      payment_logs: {
        Row: {
          amount: number;
          created_at: string;
          external_payment_id: string | null;
          id: string;
          installment_id: string | null;
          match_confidence: string | null;
          match_status: string;
          matched_at: string | null;
          matched_by: string | null;
          order_id: string | null;
          provider: string;
          provider_transaction_id: string | null;
          raw_response_json: Json | null;
          source: string;
          square_customer_id: string | null;
          status: string;
          student_match_confidence: string | null;
          student_match_details: Json;
          student_match_status: string;
          student_matched_at: string | null;
          user_id: string | null;
        };
        Insert: {
          amount?: number;
          created_at?: string;
          external_payment_id?: string | null;
          id?: string;
          installment_id?: string | null;
          match_confidence?: string | null;
          match_status?: string;
          matched_at?: string | null;
          matched_by?: string | null;
          order_id?: string | null;
          provider?: string;
          provider_transaction_id?: string | null;
          raw_response_json?: Json | null;
          source?: string;
          square_customer_id?: string | null;
          status?: string;
          student_match_confidence?: string | null;
          student_match_details?: Json;
          student_match_status?: string;
          student_matched_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          amount?: number;
          created_at?: string;
          external_payment_id?: string | null;
          id?: string;
          installment_id?: string | null;
          match_confidence?: string | null;
          match_status?: string;
          matched_at?: string | null;
          matched_by?: string | null;
          order_id?: string | null;
          provider?: string;
          provider_transaction_id?: string | null;
          raw_response_json?: Json | null;
          source?: string;
          square_customer_id?: string | null;
          status?: string;
          student_match_confidence?: string | null;
          student_match_details?: Json;
          student_match_status?: string;
          student_matched_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "payment_logs_installment_id_fkey";
            columns: ["installment_id"];
            isOneToOne: false;
            referencedRelation: "payment_plan_installments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "payment_logs_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
        ];
      };
      payment_plan_installments: {
        Row: {
          amount: number;
          amount_paid: number;
          created_at: string;
          due_date: string;
          enrollment_id: string | null;
          failure_reason: string | null;
          flagged_for_review: boolean;
          ghl_schedule_id: string | null;
          id: string;
          installment_number: number;
          last_attempt_at: string | null;
          next_retry_at: string | null;
          order_id: string;
          paid_at: string | null;
          resolved_at: string | null;
          resolved_by: string | null;
          retry_count: number;
          square_payment_id: string | null;
          status: string;
          updated_at: string;
        };
        Insert: {
          amount?: number;
          amount_paid?: number;
          created_at?: string;
          due_date: string;
          enrollment_id?: string | null;
          failure_reason?: string | null;
          flagged_for_review?: boolean;
          ghl_schedule_id?: string | null;
          id?: string;
          installment_number: number;
          last_attempt_at?: string | null;
          next_retry_at?: string | null;
          order_id: string;
          paid_at?: string | null;
          resolved_at?: string | null;
          resolved_by?: string | null;
          retry_count?: number;
          square_payment_id?: string | null;
          status?: string;
          updated_at?: string;
        };
        Update: {
          amount?: number;
          amount_paid?: number;
          created_at?: string;
          due_date?: string;
          enrollment_id?: string | null;
          failure_reason?: string | null;
          flagged_for_review?: boolean;
          ghl_schedule_id?: string | null;
          id?: string;
          installment_number?: number;
          last_attempt_at?: string | null;
          next_retry_at?: string | null;
          order_id?: string;
          paid_at?: string | null;
          resolved_at?: string | null;
          resolved_by?: string | null;
          retry_count?: number;
          square_payment_id?: string | null;
          status?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "payment_plan_installments_enrollment_id_fkey";
            columns: ["enrollment_id"];
            isOneToOne: false;
            referencedRelation: "enrollments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "payment_plan_installments_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
        ];
      };
      payment_reconciliation_log: {
        Row: {
          details: Json;
          enrollment_amount_paid: number | null;
          expected_paid: number | null;
          id: string;
          order_deposit_paid: number | null;
          order_id: string | null;
          ran_at: string;
          status: string;
          user_id: string | null;
        };
        Insert: {
          details?: Json;
          enrollment_amount_paid?: number | null;
          expected_paid?: number | null;
          id?: string;
          order_deposit_paid?: number | null;
          order_id?: string | null;
          ran_at?: string;
          status?: string;
          user_id?: string | null;
        };
        Update: {
          details?: Json;
          enrollment_amount_paid?: number | null;
          expected_paid?: number | null;
          id?: string;
          order_deposit_paid?: number | null;
          order_id?: string | null;
          ran_at?: string;
          status?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "payment_reconciliation_log_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
        ];
      };
      payment_reminders: {
        Row: {
          id: string;
          installment_id: string;
          reminder_kind: string;
          sent_at: string;
          sent_to: string | null;
        };
        Insert: {
          id?: string;
          installment_id: string;
          reminder_kind: string;
          sent_at?: string;
          sent_to?: string | null;
        };
        Update: {
          id?: string;
          installment_id?: string;
          reminder_kind?: string;
          sent_at?: string;
          sent_to?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "payment_reminders_installment_id_fkey";
            columns: ["installment_id"];
            isOneToOne: false;
            referencedRelation: "payment_plan_installments";
            referencedColumns: ["id"];
          },
        ];
      };
      payout_settings: {
        Row: {
          created_at: string;
          display_name: string | null;
          handle: string | null;
          id: string;
          is_default: boolean;
          method: string;
          organization_id: string | null;
          updated_at: string;
          user_id: string;
          verified: boolean;
        };
        Insert: {
          created_at?: string;
          display_name?: string | null;
          handle?: string | null;
          id?: string;
          is_default?: boolean;
          method: string;
          organization_id?: string | null;
          updated_at?: string;
          user_id: string;
          verified?: boolean;
        };
        Update: {
          created_at?: string;
          display_name?: string | null;
          handle?: string | null;
          id?: string;
          is_default?: boolean;
          method?: string;
          organization_id?: string | null;
          updated_at?: string;
          user_id?: string;
          verified?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "payout_settings_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "payout_settings_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      pending_contact_followups: {
        Row: {
          attempt_count: number;
          cancelled_reason: string | null;
          created_at: string;
          dispatched_at: string | null;
          error_message: string | null;
          id: string;
          last_attempt_at: string | null;
          lead_id: string;
          response_status: number | null;
          scheduled_at: string;
          status: string;
        };
        Insert: {
          attempt_count?: number;
          cancelled_reason?: string | null;
          created_at?: string;
          dispatched_at?: string | null;
          error_message?: string | null;
          id?: string;
          last_attempt_at?: string | null;
          lead_id: string;
          response_status?: number | null;
          scheduled_at: string;
          status?: string;
        };
        Update: {
          attempt_count?: number;
          cancelled_reason?: string | null;
          created_at?: string;
          dispatched_at?: string | null;
          error_message?: string | null;
          id?: string;
          last_attempt_at?: string | null;
          lead_id?: string;
          response_status?: number | null;
          scheduled_at?: string;
          status?: string;
        };
        Relationships: [
          {
            foreignKeyName: "pending_contact_followups_lead_id_fkey";
            columns: ["lead_id"];
            isOneToOne: false;
            referencedRelation: "leads";
            referencedColumns: ["id"];
          },
        ];
      };
      pending_lead_followups: {
        Row: {
          attempt_count: number;
          cancelled_reason: string | null;
          created_at: string;
          dispatched_at: string | null;
          error_message: string | null;
          id: string;
          last_attempt_at: string | null;
          lead_application_id: string;
          profile_id: string | null;
          request_id: number | null;
          response_status: number | null;
          scheduled_at: string;
          status: string;
          updated_at: string;
        };
        Insert: {
          attempt_count?: number;
          cancelled_reason?: string | null;
          created_at?: string;
          dispatched_at?: string | null;
          error_message?: string | null;
          id?: string;
          last_attempt_at?: string | null;
          lead_application_id: string;
          profile_id?: string | null;
          request_id?: number | null;
          response_status?: number | null;
          scheduled_at: string;
          status?: string;
          updated_at?: string;
        };
        Update: {
          attempt_count?: number;
          cancelled_reason?: string | null;
          created_at?: string;
          dispatched_at?: string | null;
          error_message?: string | null;
          id?: string;
          last_attempt_at?: string | null;
          lead_application_id?: string;
          profile_id?: string | null;
          request_id?: number | null;
          response_status?: number | null;
          scheduled_at?: string;
          status?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "pending_lead_followups_lead_application_id_fkey";
            columns: ["lead_application_id"];
            isOneToOne: true;
            referencedRelation: "lead_applications";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "pending_lead_followups_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          address: string | null;
          alt_emails: string[];
          alt_phones: string[];
          arc_level: number;
          avatar_url: string | null;
          bio: string | null;
          city: string | null;
          clerk_user_id: string | null;
          created_at: string;
          display_name: string | null;
          email: string | null;
          emergency_contact_name: string | null;
          emergency_contact_phone: string | null;
          external_contact_ids: Json;
          first_name: string | null;
          handle: string | null;
          id: string;
          is_active: boolean;
          is_searchable: boolean;
          last_activity_at: string;
          last_name: string | null;
          oneaccess_email: string | null;
          oneaccess_tier: string;
          oneid_subject: string | null;
          phone: string | null;
          platform_flags: Json | null;
          sc_balance: number;
          square_customer_id: string | null;
          state: string | null;
          tier_expires_at: string | null;
          updated_at: string;
          user_id: string;
          user_status: Database["public"]["Enums"]["user_lifecycle_status"];
          username: string | null;
          zip: string | null;
        };
        Insert: {
          address?: string | null;
          alt_emails?: string[];
          alt_phones?: string[];
          arc_level?: number;
          avatar_url?: string | null;
          bio?: string | null;
          city?: string | null;
          clerk_user_id?: string | null;
          created_at?: string;
          display_name?: string | null;
          email?: string | null;
          emergency_contact_name?: string | null;
          emergency_contact_phone?: string | null;
          external_contact_ids?: Json;
          first_name?: string | null;
          handle?: string | null;
          id?: string;
          is_active?: boolean;
          is_searchable?: boolean;
          last_activity_at?: string;
          last_name?: string | null;
          oneaccess_email?: string | null;
          oneaccess_tier?: string;
          oneid_subject?: string | null;
          phone?: string | null;
          platform_flags?: Json | null;
          sc_balance?: number;
          square_customer_id?: string | null;
          state?: string | null;
          tier_expires_at?: string | null;
          updated_at?: string;
          user_id: string;
          user_status?: Database["public"]["Enums"]["user_lifecycle_status"];
          username?: string | null;
          zip?: string | null;
        };
        Update: {
          address?: string | null;
          alt_emails?: string[];
          alt_phones?: string[];
          arc_level?: number;
          avatar_url?: string | null;
          bio?: string | null;
          city?: string | null;
          clerk_user_id?: string | null;
          created_at?: string;
          display_name?: string | null;
          email?: string | null;
          emergency_contact_name?: string | null;
          emergency_contact_phone?: string | null;
          external_contact_ids?: Json;
          first_name?: string | null;
          handle?: string | null;
          id?: string;
          is_active?: boolean;
          is_searchable?: boolean;
          last_activity_at?: string;
          last_name?: string | null;
          oneaccess_email?: string | null;
          oneaccess_tier?: string;
          oneid_subject?: string | null;
          phone?: string | null;
          platform_flags?: Json | null;
          sc_balance?: number;
          square_customer_id?: string | null;
          state?: string | null;
          tier_expires_at?: string | null;
          updated_at?: string;
          user_id?: string;
          user_status?: Database["public"]["Enums"]["user_lifecycle_status"];
          username?: string | null;
          zip?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      program_agreements: {
        Row: {
          created_at: string | null;
          id: string;
          is_active: boolean;
          organization_id: string | null;
          program_id: string | null;
          template_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          is_active?: boolean;
          organization_id?: string | null;
          program_id?: string | null;
          template_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          is_active?: boolean;
          organization_id?: string | null;
          program_id?: string | null;
          template_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "program_agreements_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "program_agreements_program_id_fkey";
            columns: ["program_id"];
            isOneToOne: true;
            referencedRelation: "programs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "program_agreements_template_id_fkey";
            columns: ["template_id"];
            isOneToOne: false;
            referencedRelation: "agreement_templates";
            referencedColumns: ["id"];
          },
        ];
      };
      program_bundles: {
        Row: {
          active: boolean;
          bundled_program_id: string;
          created_at: string;
          id: string;
          source_program_id: string;
        };
        Insert: {
          active?: boolean;
          bundled_program_id: string;
          created_at?: string;
          id?: string;
          source_program_id: string;
        };
        Update: {
          active?: boolean;
          bundled_program_id?: string;
          created_at?: string;
          id?: string;
          source_program_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "program_bundles_bundled_program_id_fkey";
            columns: ["bundled_program_id"];
            isOneToOne: false;
            referencedRelation: "programs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "program_bundles_source_program_id_fkey";
            columns: ["source_program_id"];
            isOneToOne: false;
            referencedRelation: "programs";
            referencedColumns: ["id"];
          },
        ];
      };
      program_curriculum_modules: {
        Row: {
          course_code: string;
          created_at: string;
          id: string;
          lab_hours: number;
          name: string;
          program_id: string;
          sequence_order: number;
          theory_hours: number;
          updated_at: string;
        };
        Insert: {
          course_code: string;
          created_at?: string;
          id?: string;
          lab_hours?: number;
          name: string;
          program_id: string;
          sequence_order?: number;
          theory_hours?: number;
          updated_at?: string;
        };
        Update: {
          course_code?: string;
          created_at?: string;
          id?: string;
          lab_hours?: number;
          name?: string;
          program_id?: string;
          sequence_order?: number;
          theory_hours?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "program_curriculum_modules_program_id_fkey";
            columns: ["program_id"];
            isOneToOne: false;
            referencedRelation: "programs";
            referencedColumns: ["id"];
          },
        ];
      };
      program_line_items: {
        Row: {
          amount: number;
          created_at: string;
          id: string;
          label: string;
          program_id: string;
          sort_order: number;
        };
        Insert: {
          amount?: number;
          created_at?: string;
          id?: string;
          label: string;
          program_id: string;
          sort_order?: number;
        };
        Update: {
          amount?: number;
          created_at?: string;
          id?: string;
          label?: string;
          program_id?: string;
          sort_order?: number;
        };
        Relationships: [
          {
            foreignKeyName: "program_line_items_program_id_fkey";
            columns: ["program_id"];
            isOneToOne: false;
            referencedRelation: "programs";
            referencedColumns: ["id"];
          },
        ];
      };
      program_schedules: {
        Row: {
          active: boolean;
          class_days: number[];
          created_at: string;
          filter_type: string;
          filter_value: string;
          hours_per_day: number;
          id: string;
          label: string;
          program_id: string;
          sort_order: number;
        };
        Insert: {
          active?: boolean;
          class_days?: number[];
          created_at?: string;
          filter_type?: string;
          filter_value: string;
          hours_per_day?: number;
          id?: string;
          label: string;
          program_id: string;
          sort_order?: number;
        };
        Update: {
          active?: boolean;
          class_days?: number[];
          created_at?: string;
          filter_type?: string;
          filter_value?: string;
          hours_per_day?: number;
          id?: string;
          label?: string;
          program_id?: string;
          sort_order?: number;
        };
        Relationships: [
          {
            foreignKeyName: "program_schedules_program_id_fkey";
            columns: ["program_id"];
            isOneToOne: false;
            referencedRelation: "programs";
            referencedColumns: ["id"];
          },
        ];
      };
      program_scheduling_rules: {
        Row: {
          allow_reschedule: boolean;
          auto_assign_consecutive: boolean;
          consecutive_cohorts: boolean;
          created_at: string;
          id: string;
          max_reschedules_per_pass: number;
          practice_weeks_enabled: boolean;
          program_id: string;
          require_exam_for_reserve: boolean;
          reserve_count: number;
          updated_at: string;
        };
        Insert: {
          allow_reschedule?: boolean;
          auto_assign_consecutive?: boolean;
          consecutive_cohorts?: boolean;
          created_at?: string;
          id?: string;
          max_reschedules_per_pass?: number;
          practice_weeks_enabled?: boolean;
          program_id: string;
          require_exam_for_reserve?: boolean;
          reserve_count?: number;
          updated_at?: string;
        };
        Update: {
          allow_reschedule?: boolean;
          auto_assign_consecutive?: boolean;
          consecutive_cohorts?: boolean;
          created_at?: string;
          id?: string;
          max_reschedules_per_pass?: number;
          practice_weeks_enabled?: boolean;
          program_id?: string;
          require_exam_for_reserve?: boolean;
          reserve_count?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "program_scheduling_rules_program_id_fkey";
            columns: ["program_id"];
            isOneToOne: true;
            referencedRelation: "programs";
            referencedColumns: ["id"];
          },
        ];
      };
      program_variants: {
        Row: {
          active: boolean | null;
          classroom_id: string | null;
          created_at: string;
          deposit_amount: number;
          duration_label: string | null;
          excluded_features: Json | null;
          features: Json | null;
          id: string;
          keys_per_purchase: number | null;
          name: string;
          payment_plans: Json;
          popular: boolean | null;
          practice_weeks: number;
          price: number;
          program_id: string;
          sort_order: number | null;
        };
        Insert: {
          active?: boolean | null;
          classroom_id?: string | null;
          created_at?: string;
          deposit_amount?: number;
          duration_label?: string | null;
          excluded_features?: Json | null;
          features?: Json | null;
          id?: string;
          keys_per_purchase?: number | null;
          name: string;
          payment_plans?: Json;
          popular?: boolean | null;
          practice_weeks?: number;
          price?: number;
          program_id: string;
          sort_order?: number | null;
        };
        Update: {
          active?: boolean | null;
          classroom_id?: string | null;
          created_at?: string;
          deposit_amount?: number;
          duration_label?: string | null;
          excluded_features?: Json | null;
          features?: Json | null;
          id?: string;
          keys_per_purchase?: number | null;
          name?: string;
          payment_plans?: Json;
          popular?: boolean | null;
          practice_weeks?: number;
          price?: number;
          program_id?: string;
          sort_order?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "program_variants_classroom_id_fkey";
            columns: ["classroom_id"];
            isOneToOne: false;
            referencedRelation: "classrooms";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "program_variants_classroom_id_fkey";
            columns: ["classroom_id"];
            isOneToOne: false;
            referencedRelation: "v_classroom_load";
            referencedColumns: ["classroom_id"];
          },
          {
            foreignKeyName: "program_variants_program_id_fkey";
            columns: ["program_id"];
            isOneToOne: false;
            referencedRelation: "programs";
            referencedColumns: ["id"];
          },
        ];
      };
      program_variations: {
        Row: {
          calendar_integration_id: string | null;
          calendar_integration_id_secondary: string | null;
          classroom_id: string | null;
          created_at: string;
          id: string;
          is_language_variant: boolean;
          language: string;
          name: string;
          organization_id: string | null;
          program_id: string;
          sort_order: number;
          updated_at: string;
          variation_toggle_enabled: boolean;
        };
        Insert: {
          calendar_integration_id?: string | null;
          calendar_integration_id_secondary?: string | null;
          classroom_id?: string | null;
          created_at?: string;
          id?: string;
          is_language_variant?: boolean;
          language?: string;
          name: string;
          organization_id?: string | null;
          program_id: string;
          sort_order?: number;
          updated_at?: string;
          variation_toggle_enabled?: boolean;
        };
        Update: {
          calendar_integration_id?: string | null;
          calendar_integration_id_secondary?: string | null;
          classroom_id?: string | null;
          created_at?: string;
          id?: string;
          is_language_variant?: boolean;
          language?: string;
          name?: string;
          organization_id?: string | null;
          program_id?: string;
          sort_order?: number;
          updated_at?: string;
          variation_toggle_enabled?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "program_variations_classroom_id_fkey";
            columns: ["classroom_id"];
            isOneToOne: false;
            referencedRelation: "classrooms";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "program_variations_classroom_id_fkey";
            columns: ["classroom_id"];
            isOneToOne: false;
            referencedRelation: "v_classroom_load";
            referencedColumns: ["classroom_id"];
          },
          {
            foreignKeyName: "program_variations_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "program_variations_program_id_fkey";
            columns: ["program_id"];
            isOneToOne: false;
            referencedRelation: "programs";
            referencedColumns: ["id"];
          },
        ];
      };
      programs: {
        Row: {
          active: boolean;
          base_price: number;
          category: string;
          classroom_id: string | null;
          created_at: string;
          curriculum: Json;
          default_keys_per_purchase: number;
          deposit_amount: number;
          description: string | null;
          eligible_for_keys: boolean;
          id: string;
          key_min_withdrawal_days: number;
          key_price_cents: number;
          key_validity_months: number;
          language_variations_enabled: boolean;
          late_registration_days: number;
          learning_mode: Database["public"]["Enums"]["learning_mode"];
          name: string;
          organization_id: string | null;
          payment_plan_enabled: boolean;
          payment_plans: Json;
          program_code: string;
          total_hours: number;
          updated_at: string;
        };
        Insert: {
          active?: boolean;
          base_price?: number;
          category?: string;
          classroom_id?: string | null;
          created_at?: string;
          curriculum?: Json;
          default_keys_per_purchase?: number;
          deposit_amount?: number;
          description?: string | null;
          eligible_for_keys?: boolean;
          id?: string;
          key_min_withdrawal_days?: number;
          key_price_cents?: number;
          key_validity_months?: number;
          language_variations_enabled?: boolean;
          late_registration_days?: number;
          learning_mode?: Database["public"]["Enums"]["learning_mode"];
          name: string;
          organization_id?: string | null;
          payment_plan_enabled?: boolean;
          payment_plans?: Json;
          program_code: string;
          total_hours?: number;
          updated_at?: string;
        };
        Update: {
          active?: boolean;
          base_price?: number;
          category?: string;
          classroom_id?: string | null;
          created_at?: string;
          curriculum?: Json;
          default_keys_per_purchase?: number;
          deposit_amount?: number;
          description?: string | null;
          eligible_for_keys?: boolean;
          id?: string;
          key_min_withdrawal_days?: number;
          key_price_cents?: number;
          key_validity_months?: number;
          language_variations_enabled?: boolean;
          late_registration_days?: number;
          learning_mode?: Database["public"]["Enums"]["learning_mode"];
          name?: string;
          organization_id?: string | null;
          payment_plan_enabled?: boolean;
          payment_plans?: Json;
          program_code?: string;
          total_hours?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "programs_classroom_id_fkey";
            columns: ["classroom_id"];
            isOneToOne: false;
            referencedRelation: "classrooms";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "programs_classroom_id_fkey";
            columns: ["classroom_id"];
            isOneToOne: false;
            referencedRelation: "v_classroom_load";
            referencedColumns: ["classroom_id"];
          },
          {
            foreignKeyName: "programs_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      project: {
        Row: {
          container_id: string | null;
          created_at: string | null;
          custom_domain: string | null;
          custom_domain_status: string | null;
          custom_domain_verified_at: string | null;
          custom_hostname_id: string | null;
          deployment_status: string | null;
          git_branch: string | null;
          git_url: string | null;
          id: string;
          initial_message: string | null;
          is_active: boolean;
          knowledge: string | null;
          message_history: string;
          name: string;
          organization_id: string;
          ownership_verification: string | null;
          preview_image_url: string | null;
          production_deploy_url: string | null;
          ssl_status: string | null;
          template_type: string;
          updated_at: string;
          url: string | null;
          user_id: string;
          visibility: string | null;
          workflow_id: string | null;
        };
        Insert: {
          container_id?: string | null;
          created_at?: string | null;
          custom_domain?: string | null;
          custom_domain_status?: string | null;
          custom_domain_verified_at?: string | null;
          custom_hostname_id?: string | null;
          deployment_status?: string | null;
          git_branch?: string | null;
          git_url?: string | null;
          id: string;
          initial_message?: string | null;
          is_active?: boolean;
          knowledge?: string | null;
          message_history?: string;
          name: string;
          organization_id: string;
          ownership_verification?: string | null;
          preview_image_url?: string | null;
          production_deploy_url?: string | null;
          ssl_status?: string | null;
          template_type: string;
          updated_at?: string;
          url?: string | null;
          user_id: string;
          visibility?: string | null;
          workflow_id?: string | null;
        };
        Update: {
          container_id?: string | null;
          created_at?: string | null;
          custom_domain?: string | null;
          custom_domain_status?: string | null;
          custom_domain_verified_at?: string | null;
          custom_hostname_id?: string | null;
          deployment_status?: string | null;
          git_branch?: string | null;
          git_url?: string | null;
          id?: string;
          initial_message?: string | null;
          is_active?: boolean;
          knowledge?: string | null;
          message_history?: string;
          name?: string;
          organization_id?: string;
          ownership_verification?: string | null;
          preview_image_url?: string | null;
          production_deploy_url?: string | null;
          ssl_status?: string | null;
          template_type?: string;
          updated_at?: string;
          url?: string | null;
          user_id?: string;
          visibility?: string | null;
          workflow_id?: string | null;
        };
        Relationships: [];
      };
      project_ai_usage: {
        Row: {
          created_at: string | null;
          id: string;
          last_used_at: string | null;
          organization_id: string;
          project_id: string;
          total_ai_message_count: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string | null;
          id: string;
          last_used_at?: string | null;
          organization_id: string;
          project_id: string;
          total_ai_message_count?: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          last_used_at?: string | null;
          organization_id?: string;
          project_id?: string;
          total_ai_message_count?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "project_ai_usage_project_id_project_id_fk";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "project";
            referencedColumns: ["id"];
          },
        ];
      };
      project_asset: {
        Row: {
          attachment_key: string;
          created_at: string | null;
          id: string;
          organization_id: string;
          plan_id: string;
          project_id: string;
          updated_at: string;
        };
        Insert: {
          attachment_key: string;
          created_at?: string | null;
          id: string;
          organization_id: string;
          plan_id: string;
          project_id: string;
          updated_at?: string;
        };
        Update: {
          attachment_key?: string;
          created_at?: string | null;
          id?: string;
          organization_id?: string;
          plan_id?: string;
          project_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "project_asset_project_id_project_id_fk";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "project";
            referencedColumns: ["id"];
          },
        ];
      };
      puppy_waitlist: {
        Row: {
          created_at: string;
          email: string;
          first_name: string;
          id: string;
          last_name: string;
          message: string | null;
          phone: string | null;
          preferred_sex: string | null;
          status: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          first_name: string;
          id?: string;
          last_name: string;
          message?: string | null;
          phone?: string | null;
          preferred_sex?: string | null;
          status?: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          first_name?: string;
          id?: string;
          last_name?: string;
          message?: string | null;
          phone?: string | null;
          preferred_sex?: string | null;
          status?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      qr_tokens: {
        Row: {
          created_at: string;
          expires_at: string;
          id: string;
          kiosk_assignment_id: string | null;
          organization_id: string;
          session_id: string | null;
          token: string;
        };
        Insert: {
          created_at?: string;
          expires_at: string;
          id?: string;
          kiosk_assignment_id?: string | null;
          organization_id: string;
          session_id?: string | null;
          token?: string;
        };
        Update: {
          created_at?: string;
          expires_at?: string;
          id?: string;
          kiosk_assignment_id?: string | null;
          organization_id?: string;
          session_id?: string | null;
          token?: string;
        };
        Relationships: [
          {
            foreignKeyName: "qr_tokens_kiosk_assignment_id_fkey";
            columns: ["kiosk_assignment_id"];
            isOneToOne: false;
            referencedRelation: "kiosk_assignments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "qr_tokens_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "qr_tokens_session_id_fkey";
            columns: ["session_id"];
            isOneToOne: false;
            referencedRelation: "class_sessions";
            referencedColumns: ["id"];
          },
        ];
      };
      question_audit_log: {
        Row: {
          audit_type: string;
          auto_fixed: boolean;
          created_at: string;
          error_description: string | null;
          field_affected: string | null;
          id: string;
          new_value: string | null;
          organization_id: string | null;
          original_value: string | null;
          question_id: string;
          requires_review: boolean;
        };
        Insert: {
          audit_type: string;
          auto_fixed?: boolean;
          created_at?: string;
          error_description?: string | null;
          field_affected?: string | null;
          id?: string;
          new_value?: string | null;
          organization_id?: string | null;
          original_value?: string | null;
          question_id: string;
          requires_review?: boolean;
        };
        Update: {
          audit_type?: string;
          auto_fixed?: boolean;
          created_at?: string;
          error_description?: string | null;
          field_affected?: string | null;
          id?: string;
          new_value?: string | null;
          organization_id?: string | null;
          original_value?: string | null;
          question_id?: string;
          requires_review?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "question_audit_log_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "question_audit_log_question_id_fkey";
            columns: ["question_id"];
            isOneToOne: false;
            referencedRelation: "questions";
            referencedColumns: ["id"];
          },
        ];
      };
      questions: {
        Row: {
          ai_confidence_score: number | null;
          audit_notes: string | null;
          audit_status: string;
          avg_score: number | null;
          bank_only: boolean;
          category: string;
          correct_answer: string;
          created_at: string;
          difficulty: string;
          discrimination_index: number | null;
          duplicate_of: string | null;
          explanation: string | null;
          failure_rate: number | null;
          id: string;
          last_audited_at: string | null;
          lesson_id: string | null;
          options: Json;
          organization_id: string | null;
          program_id: string | null;
          question_text: string;
          source: string;
          source_reference: string | null;
          status: string;
          updated_at: string;
          usage_count: number;
          wrong_answer_explanations: Json | null;
        };
        Insert: {
          ai_confidence_score?: number | null;
          audit_notes?: string | null;
          audit_status?: string;
          avg_score?: number | null;
          bank_only?: boolean;
          category: string;
          correct_answer: string;
          created_at?: string;
          difficulty?: string;
          discrimination_index?: number | null;
          duplicate_of?: string | null;
          explanation?: string | null;
          failure_rate?: number | null;
          id?: string;
          last_audited_at?: string | null;
          lesson_id?: string | null;
          options: Json;
          organization_id?: string | null;
          program_id?: string | null;
          question_text: string;
          source?: string;
          source_reference?: string | null;
          status?: string;
          updated_at?: string;
          usage_count?: number;
          wrong_answer_explanations?: Json | null;
        };
        Update: {
          ai_confidence_score?: number | null;
          audit_notes?: string | null;
          audit_status?: string;
          avg_score?: number | null;
          bank_only?: boolean;
          category?: string;
          correct_answer?: string;
          created_at?: string;
          difficulty?: string;
          discrimination_index?: number | null;
          duplicate_of?: string | null;
          explanation?: string | null;
          failure_rate?: number | null;
          id?: string;
          last_audited_at?: string | null;
          lesson_id?: string | null;
          options?: Json;
          organization_id?: string | null;
          program_id?: string | null;
          question_text?: string;
          source?: string;
          source_reference?: string | null;
          status?: string;
          updated_at?: string;
          usage_count?: number;
          wrong_answer_explanations?: Json | null;
        };
        Relationships: [
          {
            foreignKeyName: "questions_duplicate_of_fkey";
            columns: ["duplicate_of"];
            isOneToOne: false;
            referencedRelation: "questions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "questions_lesson_id_fkey";
            columns: ["lesson_id"];
            isOneToOne: false;
            referencedRelation: "lessons";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "questions_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "questions_program_id_fkey";
            columns: ["program_id"];
            isOneToOne: false;
            referencedRelation: "programs";
            referencedColumns: ["id"];
          },
        ];
      };
      quiz_attempts: {
        Row: {
          adaptive_mode: boolean;
          ai_prompt_used: string | null;
          auto_submitted: boolean;
          completed_at: string | null;
          correct_count: number;
          created_at: string;
          difficulty: string | null;
          id: string;
          lesson_id: string | null;
          mode: string;
          organization_id: string | null;
          score: number | null;
          started_at: string;
          status: string;
          template_id: string | null;
          time_limit_seconds: number | null;
          time_spent_seconds: number | null;
          topic: string | null;
          total_questions: number;
          user_id: string;
          warning_shown_at: string | null;
        };
        Insert: {
          adaptive_mode?: boolean;
          ai_prompt_used?: string | null;
          auto_submitted?: boolean;
          completed_at?: string | null;
          correct_count?: number;
          created_at?: string;
          difficulty?: string | null;
          id?: string;
          lesson_id?: string | null;
          mode?: string;
          organization_id?: string | null;
          score?: number | null;
          started_at?: string;
          status?: string;
          template_id?: string | null;
          time_limit_seconds?: number | null;
          time_spent_seconds?: number | null;
          topic?: string | null;
          total_questions?: number;
          user_id: string;
          warning_shown_at?: string | null;
        };
        Update: {
          adaptive_mode?: boolean;
          ai_prompt_used?: string | null;
          auto_submitted?: boolean;
          completed_at?: string | null;
          correct_count?: number;
          created_at?: string;
          difficulty?: string | null;
          id?: string;
          lesson_id?: string | null;
          mode?: string;
          organization_id?: string | null;
          score?: number | null;
          started_at?: string;
          status?: string;
          template_id?: string | null;
          time_limit_seconds?: number | null;
          time_spent_seconds?: number | null;
          topic?: string | null;
          total_questions?: number;
          user_id?: string;
          warning_shown_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "quiz_attempts_lesson_id_fkey";
            columns: ["lesson_id"];
            isOneToOne: false;
            referencedRelation: "lessons";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "quiz_attempts_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "quiz_attempts_template_id_fkey";
            columns: ["template_id"];
            isOneToOne: false;
            referencedRelation: "quiz_templates";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "quiz_attempts_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      quiz_question_assignments: {
        Row: {
          created_at: string;
          id: string;
          question_id: string;
          quiz_template_id: string;
          sequence_order: number;
        };
        Insert: {
          created_at?: string;
          id?: string;
          question_id: string;
          quiz_template_id: string;
          sequence_order?: number;
        };
        Update: {
          created_at?: string;
          id?: string;
          question_id?: string;
          quiz_template_id?: string;
          sequence_order?: number;
        };
        Relationships: [
          {
            foreignKeyName: "quiz_question_assignments_question_id_fkey";
            columns: ["question_id"];
            isOneToOne: false;
            referencedRelation: "questions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "quiz_question_assignments_quiz_template_id_fkey";
            columns: ["quiz_template_id"];
            isOneToOne: false;
            referencedRelation: "quiz_templates";
            referencedColumns: ["id"];
          },
        ];
      };
      quiz_questions: {
        Row: {
          correct_answer: string;
          id: string;
          options: Json | null;
          question: string;
          quiz_id: string;
          sequence_order: number;
          type: string;
        };
        Insert: {
          correct_answer: string;
          id?: string;
          options?: Json | null;
          question: string;
          quiz_id: string;
          sequence_order?: number;
          type?: string;
        };
        Update: {
          correct_answer?: string;
          id?: string;
          options?: Json | null;
          question?: string;
          quiz_id?: string;
          sequence_order?: number;
          type?: string;
        };
        Relationships: [
          {
            foreignKeyName: "quiz_questions_quiz_id_fkey";
            columns: ["quiz_id"];
            isOneToOne: false;
            referencedRelation: "quizzes";
            referencedColumns: ["id"];
          },
        ];
      };
      quiz_templates: {
        Row: {
          configuration: Json;
          created_at: string;
          description: string | null;
          id: string;
          mode: string;
          organization_id: string | null;
          passing_score: number;
          program_id: string | null;
          quiz_type: string;
          randomize_options: boolean;
          randomize_questions: boolean;
          status: string;
          time_limit_minutes: number | null;
          title: string;
        };
        Insert: {
          configuration?: Json;
          created_at?: string;
          description?: string | null;
          id?: string;
          mode?: string;
          organization_id?: string | null;
          passing_score?: number;
          program_id?: string | null;
          quiz_type?: string;
          randomize_options?: boolean;
          randomize_questions?: boolean;
          status?: string;
          time_limit_minutes?: number | null;
          title: string;
        };
        Update: {
          configuration?: Json;
          created_at?: string;
          description?: string | null;
          id?: string;
          mode?: string;
          organization_id?: string | null;
          passing_score?: number;
          program_id?: string | null;
          quiz_type?: string;
          randomize_options?: boolean;
          randomize_questions?: boolean;
          status?: string;
          time_limit_minutes?: number | null;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "quiz_templates_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "quiz_templates_program_id_fkey";
            columns: ["program_id"];
            isOneToOne: false;
            referencedRelation: "programs";
            referencedColumns: ["id"];
          },
        ];
      };
      quizzes: {
        Row: {
          created_at: string;
          id: string;
          lesson_id: string;
          passing_score: number;
        };
        Insert: {
          created_at?: string;
          id?: string;
          lesson_id: string;
          passing_score?: number;
        };
        Update: {
          created_at?: string;
          id?: string;
          lesson_id?: string;
          passing_score?: number;
        };
        Relationships: [
          {
            foreignKeyName: "quizzes_lesson_id_fkey";
            columns: ["lesson_id"];
            isOneToOne: false;
            referencedRelation: "lessons";
            referencedColumns: ["id"];
          },
        ];
      };
      reconciliation_log: {
        Row: {
          cohorts_checked: number | null;
          cohorts_updated: number | null;
          errors: Json | null;
          id: string;
          ran_at: string | null;
        };
        Insert: {
          cohorts_checked?: number | null;
          cohorts_updated?: number | null;
          errors?: Json | null;
          id?: string;
          ran_at?: string | null;
        };
        Update: {
          cohorts_checked?: number | null;
          cohorts_updated?: number | null;
          errors?: Json | null;
          id?: string;
          ran_at?: string | null;
        };
        Relationships: [];
      };
      referral_codes: {
        Row: {
          code: string;
          created_at: string;
          id: string;
          is_active: boolean;
          organization_id: string | null;
          total_clicks: number;
          total_earned_cents: number;
          total_qualified: number;
          total_referrals: number;
          user_id: string;
        };
        Insert: {
          code: string;
          created_at?: string;
          id?: string;
          is_active?: boolean;
          organization_id?: string | null;
          total_clicks?: number;
          total_earned_cents?: number;
          total_qualified?: number;
          total_referrals?: number;
          user_id: string;
        };
        Update: {
          code?: string;
          created_at?: string;
          id?: string;
          is_active?: boolean;
          organization_id?: string | null;
          total_clicks?: number;
          total_earned_cents?: number;
          total_qualified?: number;
          total_referrals?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "referral_codes_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "referral_codes_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      referral_submissions: {
        Row: {
          created_at: string;
          id: string;
          organization_id: string | null;
          referral_code: string | null;
          referred_email: string;
          referred_first_name: string;
          referred_last_name: string;
          referred_phone: string | null;
          referred_profile_id: string | null;
          referred_program_interest: string | null;
          referrer_email: string | null;
          referrer_name: string | null;
          referrer_profile_id: string | null;
          status: string;
          updated_at: string;
          utm_campaign: string | null;
          utm_medium: string | null;
          utm_source: string | null;
          webhook_response_code: number | null;
          webhook_sent: boolean;
          webhook_sent_at: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          organization_id?: string | null;
          referral_code?: string | null;
          referred_email: string;
          referred_first_name: string;
          referred_last_name: string;
          referred_phone?: string | null;
          referred_profile_id?: string | null;
          referred_program_interest?: string | null;
          referrer_email?: string | null;
          referrer_name?: string | null;
          referrer_profile_id?: string | null;
          status?: string;
          updated_at?: string;
          utm_campaign?: string | null;
          utm_medium?: string | null;
          utm_source?: string | null;
          webhook_response_code?: number | null;
          webhook_sent?: boolean;
          webhook_sent_at?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          organization_id?: string | null;
          referral_code?: string | null;
          referred_email?: string;
          referred_first_name?: string;
          referred_last_name?: string;
          referred_phone?: string | null;
          referred_profile_id?: string | null;
          referred_program_interest?: string | null;
          referrer_email?: string | null;
          referrer_name?: string | null;
          referrer_profile_id?: string | null;
          status?: string;
          updated_at?: string;
          utm_campaign?: string | null;
          utm_medium?: string | null;
          utm_source?: string | null;
          webhook_response_code?: number | null;
          webhook_sent?: boolean;
          webhook_sent_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "referral_submissions_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "referral_submissions_referred_profile_id_fkey";
            columns: ["referred_profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "referral_submissions_referrer_profile_id_fkey";
            columns: ["referrer_profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      referral_tiers: {
        Row: {
          created_at: string;
          id: string;
          is_active: boolean;
          max_referrals: number | null;
          min_referrals: number;
          name: string;
          organization_id: string | null;
          perks: Json | null;
          reward_cash_cents: number;
          reward_credit_cents: number;
          tier_number: number;
        };
        Insert: {
          created_at?: string;
          id?: string;
          is_active?: boolean;
          max_referrals?: number | null;
          min_referrals: number;
          name: string;
          organization_id?: string | null;
          perks?: Json | null;
          reward_cash_cents: number;
          reward_credit_cents: number;
          tier_number: number;
        };
        Update: {
          created_at?: string;
          id?: string;
          is_active?: boolean;
          max_referrals?: number | null;
          min_referrals?: number;
          name?: string;
          organization_id?: string | null;
          perks?: Json | null;
          reward_cash_cents?: number;
          reward_credit_cents?: number;
          tier_number?: number;
        };
        Relationships: [
          {
            foreignKeyName: "referral_tiers_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      referrals: {
        Row: {
          attribution_expires_at: string | null;
          attribution_window_days: number;
          clicked_at: string | null;
          created_at: string;
          enrolled_at: string | null;
          fraud_flagged: boolean;
          fraud_reason: string | null;
          id: string;
          ip_address: string | null;
          is_self_referral: boolean;
          lead_at: string | null;
          manual_credit_reason: string | null;
          manually_credited: boolean;
          manually_credited_at: string | null;
          manually_credited_by: string | null;
          organization_id: string | null;
          paid_at: string | null;
          payout_handle: string | null;
          payout_method: string | null;
          qualified_at: string | null;
          referral_code: string | null;
          referred_email: string;
          referred_user_id: string | null;
          referrer_id: string;
          reward_amount_cents: number | null;
          reward_tier: number | null;
          status: string;
          updated_at: string;
          utm_medium: string | null;
          utm_source: string | null;
        };
        Insert: {
          attribution_expires_at?: string | null;
          attribution_window_days?: number;
          clicked_at?: string | null;
          created_at?: string;
          enrolled_at?: string | null;
          fraud_flagged?: boolean;
          fraud_reason?: string | null;
          id?: string;
          ip_address?: string | null;
          is_self_referral?: boolean;
          lead_at?: string | null;
          manual_credit_reason?: string | null;
          manually_credited?: boolean;
          manually_credited_at?: string | null;
          manually_credited_by?: string | null;
          organization_id?: string | null;
          paid_at?: string | null;
          payout_handle?: string | null;
          payout_method?: string | null;
          qualified_at?: string | null;
          referral_code?: string | null;
          referred_email: string;
          referred_user_id?: string | null;
          referrer_id: string;
          reward_amount_cents?: number | null;
          reward_tier?: number | null;
          status?: string;
          updated_at?: string;
          utm_medium?: string | null;
          utm_source?: string | null;
        };
        Update: {
          attribution_expires_at?: string | null;
          attribution_window_days?: number;
          clicked_at?: string | null;
          created_at?: string;
          enrolled_at?: string | null;
          fraud_flagged?: boolean;
          fraud_reason?: string | null;
          id?: string;
          ip_address?: string | null;
          is_self_referral?: boolean;
          lead_at?: string | null;
          manual_credit_reason?: string | null;
          manually_credited?: boolean;
          manually_credited_at?: string | null;
          manually_credited_by?: string | null;
          organization_id?: string | null;
          paid_at?: string | null;
          payout_handle?: string | null;
          payout_method?: string | null;
          qualified_at?: string | null;
          referral_code?: string | null;
          referred_email?: string;
          referred_user_id?: string | null;
          referrer_id?: string;
          reward_amount_cents?: number | null;
          reward_tier?: number | null;
          status?: string;
          updated_at?: string;
          utm_medium?: string | null;
          utm_source?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "referrals_manually_credited_by_fkey";
            columns: ["manually_credited_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "referrals_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "referrals_referral_code_fkey";
            columns: ["referral_code"];
            isOneToOne: false;
            referencedRelation: "referral_codes";
            referencedColumns: ["code"];
          },
          {
            foreignKeyName: "referrals_referred_user_id_fkey";
            columns: ["referred_user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "referrals_referrer_id_fkey";
            columns: ["referrer_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      registration_sessions: {
        Row: {
          abandoned_at: string | null;
          completed_at: string | null;
          created_at: string;
          created_by: string | null;
          current_step: string;
          eligibility_result: string | null;
          enrollment_id: string | null;
          exceptions: Json;
          id: string;
          lead_application_id: string | null;
          organization_id: string | null;
          payload: Json;
          stage: number;
          status: string;
          student_user_id: string | null;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          abandoned_at?: string | null;
          completed_at?: string | null;
          created_at?: string;
          created_by?: string | null;
          current_step?: string;
          eligibility_result?: string | null;
          enrollment_id?: string | null;
          exceptions?: Json;
          id?: string;
          lead_application_id?: string | null;
          organization_id?: string | null;
          payload?: Json;
          stage?: number;
          status?: string;
          student_user_id?: string | null;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          abandoned_at?: string | null;
          completed_at?: string | null;
          created_at?: string;
          created_by?: string | null;
          current_step?: string;
          eligibility_result?: string | null;
          enrollment_id?: string | null;
          exceptions?: Json;
          id?: string;
          lead_application_id?: string | null;
          organization_id?: string | null;
          payload?: Json;
          stage?: number;
          status?: string;
          student_user_id?: string | null;
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "registration_sessions_enrollment_id_fkey";
            columns: ["enrollment_id"];
            isOneToOne: false;
            referencedRelation: "enrollments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "registration_sessions_lead_application_id_fkey";
            columns: ["lead_application_id"];
            isOneToOne: false;
            referencedRelation: "lead_applications";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "registration_sessions_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      remediation_attempts: {
        Row: {
          action_key: string;
          after_state: Json | null;
          attempted_at: string;
          before_state: Json | null;
          error_id: string | null;
          error_message: string | null;
          id: string;
          notes: string | null;
          status: string;
          triggered_by: string;
          triggered_by_user: string | null;
        };
        Insert: {
          action_key: string;
          after_state?: Json | null;
          attempted_at?: string;
          before_state?: Json | null;
          error_id?: string | null;
          error_message?: string | null;
          id?: string;
          notes?: string | null;
          status: string;
          triggered_by?: string;
          triggered_by_user?: string | null;
        };
        Update: {
          action_key?: string;
          after_state?: Json | null;
          attempted_at?: string;
          before_state?: Json | null;
          error_id?: string | null;
          error_message?: string | null;
          id?: string;
          notes?: string | null;
          status?: string;
          triggered_by?: string;
          triggered_by_user?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "remediation_attempts_error_id_fkey";
            columns: ["error_id"];
            isOneToOne: false;
            referencedRelation: "client_error_logs";
            referencedColumns: ["id"];
          },
        ];
      };
      reports: {
        Row: {
          action_taken: string | null;
          created_at: string;
          details: string | null;
          id: string;
          reason: string;
          report_type: Database["public"]["Enums"]["report_type"];
          reported_user_id: string | null;
          reporter_id: string;
          reviewed_at: string | null;
          reviewed_by: string | null;
          status: Database["public"]["Enums"]["report_status"];
          target_id: string;
        };
        Insert: {
          action_taken?: string | null;
          created_at?: string;
          details?: string | null;
          id?: string;
          reason: string;
          report_type: Database["public"]["Enums"]["report_type"];
          reported_user_id?: string | null;
          reporter_id: string;
          reviewed_at?: string | null;
          reviewed_by?: string | null;
          status?: Database["public"]["Enums"]["report_status"];
          target_id: string;
        };
        Update: {
          action_taken?: string | null;
          created_at?: string;
          details?: string | null;
          id?: string;
          reason?: string;
          report_type?: Database["public"]["Enums"]["report_type"];
          reported_user_id?: string | null;
          reporter_id?: string;
          reviewed_at?: string | null;
          reviewed_by?: string | null;
          status?: Database["public"]["Enums"]["report_status"];
          target_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "reports_reported_user_id_fkey";
            columns: ["reported_user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reports_reporter_id_fkey";
            columns: ["reporter_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reports_reviewed_by_fkey";
            columns: ["reviewed_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      reward_ledger: {
        Row: {
          admin_approved_at: string | null;
          admin_approved_by: string | null;
          amount_cents: number;
          created_at: string;
          id: string;
          notes: string | null;
          organization_id: string | null;
          payout_handle: string | null;
          payout_method: string | null;
          payout_reference: string | null;
          referral_id: string | null;
          reward_type: string;
          status: string;
          type: string;
          user_id: string;
        };
        Insert: {
          admin_approved_at?: string | null;
          admin_approved_by?: string | null;
          amount_cents: number;
          created_at?: string;
          id?: string;
          notes?: string | null;
          organization_id?: string | null;
          payout_handle?: string | null;
          payout_method?: string | null;
          payout_reference?: string | null;
          referral_id?: string | null;
          reward_type?: string;
          status?: string;
          type: string;
          user_id: string;
        };
        Update: {
          admin_approved_at?: string | null;
          admin_approved_by?: string | null;
          amount_cents?: number;
          created_at?: string;
          id?: string;
          notes?: string | null;
          organization_id?: string | null;
          payout_handle?: string | null;
          payout_method?: string | null;
          payout_reference?: string | null;
          referral_id?: string | null;
          reward_type?: string;
          status?: string;
          type?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "reward_ledger_admin_approved_by_fkey";
            columns: ["admin_approved_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reward_ledger_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reward_ledger_referral_id_fkey";
            columns: ["referral_id"];
            isOneToOne: false;
            referencedRelation: "referrals";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reward_ledger_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      roles: {
        Row: {
          id: string;
          user_id: string;
        };
        Insert: {
          id?: string;
          user_id: string;
        };
        Update: {
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      rooms: {
        Row: {
          created_at: string;
          id: string;
          is_active: boolean;
          location: string | null;
          name: string;
          organization_id: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          is_active?: boolean;
          location?: string | null;
          name: string;
          organization_id: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          is_active?: boolean;
          location?: string | null;
          name?: string;
          organization_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "rooms_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      salesflow_inbound_logs: {
        Row: {
          action: string;
          cohort_id: string | null;
          created_at: string;
          error: string | null;
          id: string;
          payload: Json | null;
          program_id: string | null;
          success: boolean;
          user_id: string | null;
        };
        Insert: {
          action: string;
          cohort_id?: string | null;
          created_at?: string;
          error?: string | null;
          id?: string;
          payload?: Json | null;
          program_id?: string | null;
          success?: boolean;
          user_id?: string | null;
        };
        Update: {
          action?: string;
          cohort_id?: string | null;
          created_at?: string;
          error?: string | null;
          id?: string;
          payload?: Json | null;
          program_id?: string | null;
          success?: boolean;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "salesflow_inbound_logs_cohort_id_fkey";
            columns: ["cohort_id"];
            isOneToOne: false;
            referencedRelation: "cohorts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "salesflow_inbound_logs_program_id_fkey";
            columns: ["program_id"];
            isOneToOne: false;
            referencedRelation: "programs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "salesflow_inbound_logs_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      schedule_exceptions: {
        Row: {
          cancelled: boolean;
          created_at: string;
          date: string;
          id: string;
          override_end: string | null;
          override_start: string | null;
          reason: string | null;
          schedule_template_id: string;
        };
        Insert: {
          cancelled?: boolean;
          created_at?: string;
          date: string;
          id?: string;
          override_end?: string | null;
          override_start?: string | null;
          reason?: string | null;
          schedule_template_id: string;
        };
        Update: {
          cancelled?: boolean;
          created_at?: string;
          date?: string;
          id?: string;
          override_end?: string | null;
          override_start?: string | null;
          reason?: string | null;
          schedule_template_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "schedule_exceptions_schedule_template_id_fkey";
            columns: ["schedule_template_id"];
            isOneToOne: false;
            referencedRelation: "schedule_templates";
            referencedColumns: ["id"];
          },
        ];
      };
      schedule_patterns: {
        Row: {
          active: boolean;
          anchor_start_date: string;
          created_at: string;
          day_pattern: string[];
          gap_behavior: string;
          holiday_calendar_id: string | null;
          horizon_months: number;
          hours_per_day: number;
          id: string;
          max_seats: number;
          name: string;
          organization_id: string;
          programs: Json;
          rotation_type: string;
          sync_to_salesflow: boolean;
          time_block_end: string;
          time_block_start: string;
          updated_at: string;
        };
        Insert: {
          active?: boolean;
          anchor_start_date: string;
          created_at?: string;
          day_pattern?: string[];
          gap_behavior?: string;
          holiday_calendar_id?: string | null;
          horizon_months?: number;
          hours_per_day?: number;
          id?: string;
          max_seats?: number;
          name: string;
          organization_id: string;
          programs?: Json;
          rotation_type?: string;
          sync_to_salesflow?: boolean;
          time_block_end: string;
          time_block_start: string;
          updated_at?: string;
        };
        Update: {
          active?: boolean;
          anchor_start_date?: string;
          created_at?: string;
          day_pattern?: string[];
          gap_behavior?: string;
          holiday_calendar_id?: string | null;
          horizon_months?: number;
          hours_per_day?: number;
          id?: string;
          max_seats?: number;
          name?: string;
          organization_id?: string;
          programs?: Json;
          rotation_type?: string;
          sync_to_salesflow?: boolean;
          time_block_end?: string;
          time_block_start?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "schedule_patterns_holiday_calendar_id_fkey";
            columns: ["holiday_calendar_id"];
            isOneToOne: false;
            referencedRelation: "holiday_calendars";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "schedule_patterns_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      schedule_templates: {
        Row: {
          active: boolean;
          class_days: string[];
          classroom_id: string | null;
          cohort_recurrence_anchor_date: string | null;
          cohort_recurrence_weeks: number;
          created_at: string;
          hours_per_day: number;
          id: string;
          language: string;
          name: string;
          organization_id: string | null;
          program_id: string;
          schedule_tag: string | null;
          session_layout: string;
          sort_order: number;
          start_time: string;
          updated_at: string;
          variant_id: string | null;
          variation_id: string | null;
        };
        Insert: {
          active?: boolean;
          class_days?: string[];
          classroom_id?: string | null;
          cohort_recurrence_anchor_date?: string | null;
          cohort_recurrence_weeks?: number;
          created_at?: string;
          hours_per_day: number;
          id?: string;
          language?: string;
          name: string;
          organization_id?: string | null;
          program_id: string;
          schedule_tag?: string | null;
          session_layout?: string;
          sort_order?: number;
          start_time: string;
          updated_at?: string;
          variant_id?: string | null;
          variation_id?: string | null;
        };
        Update: {
          active?: boolean;
          class_days?: string[];
          classroom_id?: string | null;
          cohort_recurrence_anchor_date?: string | null;
          cohort_recurrence_weeks?: number;
          created_at?: string;
          hours_per_day?: number;
          id?: string;
          language?: string;
          name?: string;
          organization_id?: string | null;
          program_id?: string;
          schedule_tag?: string | null;
          session_layout?: string;
          sort_order?: number;
          start_time?: string;
          updated_at?: string;
          variant_id?: string | null;
          variation_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "schedule_templates_classroom_id_fkey";
            columns: ["classroom_id"];
            isOneToOne: false;
            referencedRelation: "classrooms";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "schedule_templates_classroom_id_fkey";
            columns: ["classroom_id"];
            isOneToOne: false;
            referencedRelation: "v_classroom_load";
            referencedColumns: ["classroom_id"];
          },
          {
            foreignKeyName: "schedule_templates_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "schedule_templates_program_id_fkey";
            columns: ["program_id"];
            isOneToOne: false;
            referencedRelation: "programs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "schedule_templates_variant_id_fkey";
            columns: ["variant_id"];
            isOneToOne: false;
            referencedRelation: "program_variants";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "schedule_templates_variation_id_fkey";
            columns: ["variation_id"];
            isOneToOne: false;
            referencedRelation: "program_variations";
            referencedColumns: ["id"];
          },
        ];
      };
      school_excluded_dates: {
        Row: {
          date: string;
          id: string;
          organization_id: string | null;
          reason: string | null;
          type: string;
        };
        Insert: {
          date: string;
          id?: string;
          organization_id?: string | null;
          reason?: string | null;
          type: string;
        };
        Update: {
          date?: string;
          id?: string;
          organization_id?: string | null;
          reason?: string | null;
          type?: string;
        };
        Relationships: [
          {
            foreignKeyName: "school_excluded_dates_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      signed_agreements: {
        Row: {
          acknowledged_all_terms: boolean;
          acknowledged_attendance_policy: boolean;
          acknowledged_cancellation_policy: boolean;
          acknowledged_career_services: boolean;
          acknowledged_refund_policy: boolean;
          agreement_html: string | null;
          agreement_version: string;
          created_at: string;
          deposit_amount: number;
          enrollment_id: string | null;
          id: string;
          order_id: string | null;
          payment_option: string;
          program_code: string;
          program_name: string;
          signature_text: string;
          signature_type: string;
          signed_at: string;
          start_date: string | null;
          student_address: string | null;
          student_city: string | null;
          student_email: string;
          student_name: string;
          student_phone: string | null;
          student_state: string | null;
          student_zip: string | null;
          total_cost: number;
          user_id: string;
          variant_name: string | null;
        };
        Insert: {
          acknowledged_all_terms?: boolean;
          acknowledged_attendance_policy?: boolean;
          acknowledged_cancellation_policy?: boolean;
          acknowledged_career_services?: boolean;
          acknowledged_refund_policy?: boolean;
          agreement_html?: string | null;
          agreement_version?: string;
          created_at?: string;
          deposit_amount?: number;
          enrollment_id?: string | null;
          id?: string;
          order_id?: string | null;
          payment_option?: string;
          program_code: string;
          program_name: string;
          signature_text: string;
          signature_type?: string;
          signed_at?: string;
          start_date?: string | null;
          student_address?: string | null;
          student_city?: string | null;
          student_email: string;
          student_name: string;
          student_phone?: string | null;
          student_state?: string | null;
          student_zip?: string | null;
          total_cost?: number;
          user_id: string;
          variant_name?: string | null;
        };
        Update: {
          acknowledged_all_terms?: boolean;
          acknowledged_attendance_policy?: boolean;
          acknowledged_cancellation_policy?: boolean;
          acknowledged_career_services?: boolean;
          acknowledged_refund_policy?: boolean;
          agreement_html?: string | null;
          agreement_version?: string;
          created_at?: string;
          deposit_amount?: number;
          enrollment_id?: string | null;
          id?: string;
          order_id?: string | null;
          payment_option?: string;
          program_code?: string;
          program_name?: string;
          signature_text?: string;
          signature_type?: string;
          signed_at?: string;
          start_date?: string | null;
          student_address?: string | null;
          student_city?: string | null;
          student_email?: string;
          student_name?: string;
          student_phone?: string | null;
          student_state?: string | null;
          student_zip?: string | null;
          total_cost?: number;
          user_id?: string;
          variant_name?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "signed_agreements_enrollment_id_fkey";
            columns: ["enrollment_id"];
            isOneToOne: false;
            referencedRelation: "enrollments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "signed_agreements_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
        ];
      };
      site_config: {
        Row: {
          key: string;
          updated_at: string | null;
          value: string;
        };
        Insert: {
          key: string;
          updated_at?: string | null;
          value: string;
        };
        Update: {
          key?: string;
          updated_at?: string | null;
          value?: string;
        };
        Relationships: [];
      };
      so_activity_logs: {
        Row: {
          action: string;
          clerk_org_id: string;
          clerk_user_id: string | null;
          created_at: string;
          entity_id: string | null;
          entity_type: string | null;
          id: string;
          metadata: Json;
        };
        Insert: {
          action: string;
          clerk_org_id: string;
          clerk_user_id?: string | null;
          created_at?: string;
          entity_id?: string | null;
          entity_type?: string | null;
          id?: string;
          metadata?: Json;
        };
        Update: {
          action?: string;
          clerk_org_id?: string;
          clerk_user_id?: string | null;
          created_at?: string;
          entity_id?: string | null;
          entity_type?: string | null;
          id?: string;
          metadata?: Json;
        };
        Relationships: [
          {
            foreignKeyName: "so_activity_logs_clerk_org_id_fkey";
            columns: ["clerk_org_id"];
            isOneToOne: false;
            referencedRelation: "so_organizations";
            referencedColumns: ["clerk_org_id"];
          },
          {
            foreignKeyName: "so_activity_logs_clerk_user_id_fkey";
            columns: ["clerk_user_id"];
            isOneToOne: false;
            referencedRelation: "so_profiles";
            referencedColumns: ["clerk_user_id"];
          },
        ];
      };
      so_analytics_events: {
        Row: {
          clerk_org_id: string;
          created_at: string;
          event_type: Database["public"]["Enums"]["so_analytics_event_type"];
          id: string;
          ip_address: string | null;
          metadata: Json;
          offer_id: string | null;
          referrer: string | null;
          user_agent: string | null;
        };
        Insert: {
          clerk_org_id: string;
          created_at?: string;
          event_type: Database["public"]["Enums"]["so_analytics_event_type"];
          id?: string;
          ip_address?: string | null;
          metadata?: Json;
          offer_id?: string | null;
          referrer?: string | null;
          user_agent?: string | null;
        };
        Update: {
          clerk_org_id?: string;
          created_at?: string;
          event_type?: Database["public"]["Enums"]["so_analytics_event_type"];
          id?: string;
          ip_address?: string | null;
          metadata?: Json;
          offer_id?: string | null;
          referrer?: string | null;
          user_agent?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "so_analytics_events_clerk_org_id_fkey";
            columns: ["clerk_org_id"];
            isOneToOne: false;
            referencedRelation: "so_organizations";
            referencedColumns: ["clerk_org_id"];
          },
          {
            foreignKeyName: "so_analytics_events_offer_id_fkey";
            columns: ["offer_id"];
            isOneToOne: false;
            referencedRelation: "so_offers";
            referencedColumns: ["id"];
          },
        ];
      };
      so_api_keys: {
        Row: {
          clerk_org_id: string;
          created_at: string;
          created_by: string;
          id: string;
          key_hash: string;
          key_prefix: string;
          last_used_at: string | null;
          name: string;
          revoked_at: string | null;
        };
        Insert: {
          clerk_org_id: string;
          created_at?: string;
          created_by: string;
          id?: string;
          key_hash: string;
          key_prefix: string;
          last_used_at?: string | null;
          name: string;
          revoked_at?: string | null;
        };
        Update: {
          clerk_org_id?: string;
          created_at?: string;
          created_by?: string;
          id?: string;
          key_hash?: string;
          key_prefix?: string;
          last_used_at?: string | null;
          name?: string;
          revoked_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "so_api_keys_clerk_org_id_fkey";
            columns: ["clerk_org_id"];
            isOneToOne: false;
            referencedRelation: "so_organizations";
            referencedColumns: ["clerk_org_id"];
          },
          {
            foreignKeyName: "so_api_keys_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "so_profiles";
            referencedColumns: ["clerk_user_id"];
          },
        ];
      };
      so_offer_revisions: {
        Row: {
          created_at: string;
          created_by: string | null;
          id: string;
          offer_id: string;
          snapshot: Json;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          id?: string;
          offer_id: string;
          snapshot: Json;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          id?: string;
          offer_id?: string;
          snapshot?: Json;
        };
        Relationships: [
          {
            foreignKeyName: "so_offer_revisions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "so_profiles";
            referencedColumns: ["clerk_user_id"];
          },
          {
            foreignKeyName: "so_offer_revisions_offer_id_fkey";
            columns: ["offer_id"];
            isOneToOne: false;
            referencedRelation: "so_offers";
            referencedColumns: ["id"];
          },
        ];
      };
      so_offers: {
        Row: {
          clerk_org_id: string;
          created_at: string;
          created_by: string;
          expires_at: string | null;
          first_viewed_at: string | null;
          id: string;
          last_viewed_at: string | null;
          offer_data: Json;
          property_address: string | null;
          property_city: string | null;
          property_state: string | null;
          property_type: string | null;
          property_zip: string | null;
          public_slug: string;
          seller_email: string | null;
          seller_name: string | null;
          seller_phone: string | null;
          sent_at: string | null;
          status: Database["public"]["Enums"]["so_offer_status"];
          template_id: string | null;
          title: string;
          updated_at: string;
          view_count: number;
        };
        Insert: {
          clerk_org_id: string;
          created_at?: string;
          created_by: string;
          expires_at?: string | null;
          first_viewed_at?: string | null;
          id?: string;
          last_viewed_at?: string | null;
          offer_data?: Json;
          property_address?: string | null;
          property_city?: string | null;
          property_state?: string | null;
          property_type?: string | null;
          property_zip?: string | null;
          public_slug: string;
          seller_email?: string | null;
          seller_name?: string | null;
          seller_phone?: string | null;
          sent_at?: string | null;
          status?: Database["public"]["Enums"]["so_offer_status"];
          template_id?: string | null;
          title: string;
          updated_at?: string;
          view_count?: number;
        };
        Update: {
          clerk_org_id?: string;
          created_at?: string;
          created_by?: string;
          expires_at?: string | null;
          first_viewed_at?: string | null;
          id?: string;
          last_viewed_at?: string | null;
          offer_data?: Json;
          property_address?: string | null;
          property_city?: string | null;
          property_state?: string | null;
          property_type?: string | null;
          property_zip?: string | null;
          public_slug?: string;
          seller_email?: string | null;
          seller_name?: string | null;
          seller_phone?: string | null;
          sent_at?: string | null;
          status?: Database["public"]["Enums"]["so_offer_status"];
          template_id?: string | null;
          title?: string;
          updated_at?: string;
          view_count?: number;
        };
        Relationships: [
          {
            foreignKeyName: "so_offers_clerk_org_id_fkey";
            columns: ["clerk_org_id"];
            isOneToOne: false;
            referencedRelation: "so_organizations";
            referencedColumns: ["clerk_org_id"];
          },
          {
            foreignKeyName: "so_offers_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "so_profiles";
            referencedColumns: ["clerk_user_id"];
          },
          {
            foreignKeyName: "so_offers_template_id_fkey";
            columns: ["template_id"];
            isOneToOne: false;
            referencedRelation: "so_templates";
            referencedColumns: ["id"];
          },
        ];
      };
      so_organizations: {
        Row: {
          address: string | null;
          brand_color: string | null;
          clerk_org_id: string;
          contact_email: string | null;
          contact_phone: string | null;
          created_at: string;
          footer_text: string | null;
          logo_url: string | null;
          name: string;
          slug: string | null;
          updated_at: string;
          website: string | null;
        };
        Insert: {
          address?: string | null;
          brand_color?: string | null;
          clerk_org_id: string;
          contact_email?: string | null;
          contact_phone?: string | null;
          created_at?: string;
          footer_text?: string | null;
          logo_url?: string | null;
          name: string;
          slug?: string | null;
          updated_at?: string;
          website?: string | null;
        };
        Update: {
          address?: string | null;
          brand_color?: string | null;
          clerk_org_id?: string;
          contact_email?: string | null;
          contact_phone?: string | null;
          created_at?: string;
          footer_text?: string | null;
          logo_url?: string | null;
          name?: string;
          slug?: string | null;
          updated_at?: string;
          website?: string | null;
        };
        Relationships: [];
      };
      so_profiles: {
        Row: {
          avatar_url: string | null;
          clerk_user_id: string;
          created_at: string;
          email: string | null;
          full_name: string | null;
          updated_at: string;
        };
        Insert: {
          avatar_url?: string | null;
          clerk_user_id: string;
          created_at?: string;
          email?: string | null;
          full_name?: string | null;
          updated_at?: string;
        };
        Update: {
          avatar_url?: string | null;
          clerk_user_id?: string;
          created_at?: string;
          email?: string | null;
          full_name?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      so_templates: {
        Row: {
          body: Json;
          clerk_org_id: string;
          created_at: string;
          created_by: string | null;
          description: string | null;
          id: string;
          is_default: boolean;
          name: string;
          updated_at: string;
        };
        Insert: {
          body?: Json;
          clerk_org_id: string;
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          id?: string;
          is_default?: boolean;
          name: string;
          updated_at?: string;
        };
        Update: {
          body?: Json;
          clerk_org_id?: string;
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          id?: string;
          is_default?: boolean;
          name?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "so_templates_clerk_org_id_fkey";
            columns: ["clerk_org_id"];
            isOneToOne: false;
            referencedRelation: "so_organizations";
            referencedColumns: ["clerk_org_id"];
          },
          {
            foreignKeyName: "so_templates_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "so_profiles";
            referencedColumns: ["clerk_user_id"];
          },
        ];
      };
      so_webhook_endpoints: {
        Row: {
          clerk_org_id: string;
          created_at: string;
          created_by: string | null;
          enabled: boolean;
          events: string[];
          id: string;
          secret: string;
          updated_at: string;
          url: string;
        };
        Insert: {
          clerk_org_id: string;
          created_at?: string;
          created_by?: string | null;
          enabled?: boolean;
          events?: string[];
          id?: string;
          secret: string;
          updated_at?: string;
          url: string;
        };
        Update: {
          clerk_org_id?: string;
          created_at?: string;
          created_by?: string | null;
          enabled?: boolean;
          events?: string[];
          id?: string;
          secret?: string;
          updated_at?: string;
          url?: string;
        };
        Relationships: [
          {
            foreignKeyName: "so_webhook_endpoints_clerk_org_id_fkey";
            columns: ["clerk_org_id"];
            isOneToOne: false;
            referencedRelation: "so_organizations";
            referencedColumns: ["clerk_org_id"];
          },
          {
            foreignKeyName: "so_webhook_endpoints_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "so_profiles";
            referencedColumns: ["clerk_user_id"];
          },
        ];
      };
      so_webhook_logs: {
        Row: {
          attempts: number;
          clerk_org_id: string;
          created_at: string;
          endpoint_id: string | null;
          event: string;
          id: string;
          payload: Json;
          response_body: string | null;
          response_status: number | null;
          succeeded: boolean;
        };
        Insert: {
          attempts?: number;
          clerk_org_id: string;
          created_at?: string;
          endpoint_id?: string | null;
          event: string;
          id?: string;
          payload?: Json;
          response_body?: string | null;
          response_status?: number | null;
          succeeded?: boolean;
        };
        Update: {
          attempts?: number;
          clerk_org_id?: string;
          created_at?: string;
          endpoint_id?: string | null;
          event?: string;
          id?: string;
          payload?: Json;
          response_body?: string | null;
          response_status?: number | null;
          succeeded?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "so_webhook_logs_clerk_org_id_fkey";
            columns: ["clerk_org_id"];
            isOneToOne: false;
            referencedRelation: "so_organizations";
            referencedColumns: ["clerk_org_id"];
          },
          {
            foreignKeyName: "so_webhook_logs_endpoint_id_fkey";
            columns: ["endpoint_id"];
            isOneToOne: false;
            referencedRelation: "so_webhook_endpoints";
            referencedColumns: ["id"];
          },
        ];
      };
      sp_agencies: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          owner_id: string | null;
          slug: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          owner_id?: string | null;
          slug: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          owner_id?: string | null;
          slug?: string;
        };
        Relationships: [
          {
            foreignKeyName: "sp_agencies_owner_id_fkey";
            columns: ["owner_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      sp_ai_chat_history: {
        Row: {
          content: string;
          created_at: string;
          id: string;
          organization_id: string | null;
          poll_id: string | null;
          role: string;
          user_id: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          id?: string;
          organization_id?: string | null;
          poll_id?: string | null;
          role: string;
          user_id: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: string;
          organization_id?: string | null;
          poll_id?: string | null;
          role?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "sp_ai_chat_history_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sp_ai_chat_history_poll_id_fkey";
            columns: ["poll_id"];
            isOneToOne: false;
            referencedRelation: "sp_polls";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sp_ai_chat_history_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      sp_contacts: {
        Row: {
          created_at: string;
          created_by: string | null;
          email: string | null;
          id: string;
          metadata: Json;
          name: string | null;
          organization_id: string;
          phone: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          email?: string | null;
          id?: string;
          metadata?: Json;
          name?: string | null;
          organization_id: string;
          phone?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          email?: string | null;
          id?: string;
          metadata?: Json;
          name?: string | null;
          organization_id?: string;
          phone?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "sp_contacts_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sp_contacts_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      sp_direct_messages: {
        Row: {
          content: string;
          created_at: string;
          id: string;
          organization_id: string | null;
          poll_id: string | null;
          read_at: string | null;
          recipient_id: string;
          sender_id: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          id?: string;
          organization_id?: string | null;
          poll_id?: string | null;
          read_at?: string | null;
          recipient_id: string;
          sender_id: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: string;
          organization_id?: string | null;
          poll_id?: string | null;
          read_at?: string | null;
          recipient_id?: string;
          sender_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "sp_direct_messages_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sp_direct_messages_poll_id_fkey";
            columns: ["poll_id"];
            isOneToOne: false;
            referencedRelation: "sp_polls";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sp_direct_messages_recipient_id_fkey";
            columns: ["recipient_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sp_direct_messages_sender_id_fkey";
            columns: ["sender_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      sp_external_calendar_events: {
        Row: {
          connection_id: string;
          ends_at: string;
          id: string;
          is_all_day: boolean;
          organization_id: string | null;
          provider_event_id: string;
          raw_data: Json | null;
          starts_at: string;
          synced_at: string;
          title: string | null;
        };
        Insert: {
          connection_id: string;
          ends_at: string;
          id?: string;
          is_all_day?: boolean;
          organization_id?: string | null;
          provider_event_id: string;
          raw_data?: Json | null;
          starts_at: string;
          synced_at?: string;
          title?: string | null;
        };
        Update: {
          connection_id?: string;
          ends_at?: string;
          id?: string;
          is_all_day?: boolean;
          organization_id?: string | null;
          provider_event_id?: string;
          raw_data?: Json | null;
          starts_at?: string;
          synced_at?: string;
          title?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "sp_external_calendar_events_connection_id_fkey";
            columns: ["connection_id"];
            isOneToOne: false;
            referencedRelation: "sp_user_calendar_connections";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sp_external_calendar_events_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      sp_feature_definitions: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          key: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          key: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          key?: string;
        };
        Relationships: [];
      };
      sp_guest_accounts: {
        Row: {
          created_at: string;
          email: string | null;
          id: string;
          name: string | null;
          poll_id: string | null;
          token: string;
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          id?: string;
          name?: string | null;
          poll_id?: string | null;
          token?: string;
        };
        Update: {
          created_at?: string;
          email?: string | null;
          id?: string;
          name?: string | null;
          poll_id?: string | null;
          token?: string;
        };
        Relationships: [
          {
            foreignKeyName: "sp_guest_accounts_poll_id_fkey";
            columns: ["poll_id"];
            isOneToOne: false;
            referencedRelation: "sp_polls";
            referencedColumns: ["id"];
          },
        ];
      };
      sp_meeting_bookings: {
        Row: {
          created_at: string;
          ends_at: string;
          guest_email: string | null;
          guest_user_id: string | null;
          host_user_id: string;
          id: string;
          notes: string | null;
          organization_id: string | null;
          poll_id: string | null;
          starts_at: string;
          status: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          ends_at: string;
          guest_email?: string | null;
          guest_user_id?: string | null;
          host_user_id: string;
          id?: string;
          notes?: string | null;
          organization_id?: string | null;
          poll_id?: string | null;
          starts_at: string;
          status?: string;
          title: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          ends_at?: string;
          guest_email?: string | null;
          guest_user_id?: string | null;
          host_user_id?: string;
          id?: string;
          notes?: string | null;
          organization_id?: string | null;
          poll_id?: string | null;
          starts_at?: string;
          status?: string;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "sp_meeting_bookings_guest_user_id_fkey";
            columns: ["guest_user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sp_meeting_bookings_host_user_id_fkey";
            columns: ["host_user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sp_meeting_bookings_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sp_meeting_bookings_poll_id_fkey";
            columns: ["poll_id"];
            isOneToOne: false;
            referencedRelation: "sp_polls";
            referencedColumns: ["id"];
          },
        ];
      };
      sp_meeting_summaries: {
        Row: {
          booking_id: string;
          content: string;
          created_at: string;
          generated_by: string;
          id: string;
        };
        Insert: {
          booking_id: string;
          content: string;
          created_at?: string;
          generated_by?: string;
          id?: string;
        };
        Update: {
          booking_id?: string;
          content?: string;
          created_at?: string;
          generated_by?: string;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "sp_meeting_summaries_booking_id_fkey";
            columns: ["booking_id"];
            isOneToOne: true;
            referencedRelation: "sp_meeting_bookings";
            referencedColumns: ["id"];
          },
        ];
      };
      sp_notifications: {
        Row: {
          body: string | null;
          created_at: string;
          data: Json;
          id: string;
          organization_id: string | null;
          read_at: string | null;
          title: string;
          type: string;
          user_id: string;
        };
        Insert: {
          body?: string | null;
          created_at?: string;
          data?: Json;
          id?: string;
          organization_id?: string | null;
          read_at?: string | null;
          title: string;
          type: string;
          user_id: string;
        };
        Update: {
          body?: string | null;
          created_at?: string;
          data?: Json;
          id?: string;
          organization_id?: string | null;
          read_at?: string | null;
          title?: string;
          type?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "sp_notifications_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sp_notifications_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      sp_organization_invites: {
        Row: {
          accepted_at: string | null;
          created_at: string;
          email: string;
          expires_at: string;
          id: string;
          invited_by: string | null;
          organization_id: string;
          role: string;
          token: string;
        };
        Insert: {
          accepted_at?: string | null;
          created_at?: string;
          email: string;
          expires_at?: string;
          id?: string;
          invited_by?: string | null;
          organization_id: string;
          role?: string;
          token?: string;
        };
        Update: {
          accepted_at?: string | null;
          created_at?: string;
          email?: string;
          expires_at?: string;
          id?: string;
          invited_by?: string | null;
          organization_id?: string;
          role?: string;
          token?: string;
        };
        Relationships: [
          {
            foreignKeyName: "sp_organization_invites_invited_by_fkey";
            columns: ["invited_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sp_organization_invites_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      sp_organization_settings: {
        Row: {
          billing_period_start: string;
          created_at: string;
          id: string;
          max_polls_per_month: number;
          max_responses_per_poll: number;
          organization_id: string;
          polls_created_this_month: number;
          updated_at: string;
        };
        Insert: {
          billing_period_start?: string;
          created_at?: string;
          id?: string;
          max_polls_per_month?: number;
          max_responses_per_poll?: number;
          organization_id: string;
          polls_created_this_month?: number;
          updated_at?: string;
        };
        Update: {
          billing_period_start?: string;
          created_at?: string;
          id?: string;
          max_polls_per_month?: number;
          max_responses_per_poll?: number;
          organization_id?: string;
          polls_created_this_month?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "sp_organization_settings_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: true;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      sp_plan_audit_log: {
        Row: {
          changed_by: string | null;
          created_at: string;
          id: string;
          new_plan_id: string | null;
          old_plan_id: string | null;
          organization_id: string;
          reason: string | null;
        };
        Insert: {
          changed_by?: string | null;
          created_at?: string;
          id?: string;
          new_plan_id?: string | null;
          old_plan_id?: string | null;
          organization_id: string;
          reason?: string | null;
        };
        Update: {
          changed_by?: string | null;
          created_at?: string;
          id?: string;
          new_plan_id?: string | null;
          old_plan_id?: string | null;
          organization_id?: string;
          reason?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "sp_plan_audit_log_changed_by_fkey";
            columns: ["changed_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sp_plan_audit_log_new_plan_id_fkey";
            columns: ["new_plan_id"];
            isOneToOne: false;
            referencedRelation: "sp_plans";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sp_plan_audit_log_old_plan_id_fkey";
            columns: ["old_plan_id"];
            isOneToOne: false;
            referencedRelation: "sp_plans";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sp_plan_audit_log_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      sp_plan_features: {
        Row: {
          feature_id: string;
          id: string;
          plan_id: string;
        };
        Insert: {
          feature_id: string;
          id?: string;
          plan_id: string;
        };
        Update: {
          feature_id?: string;
          id?: string;
          plan_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "sp_plan_features_feature_id_fkey";
            columns: ["feature_id"];
            isOneToOne: false;
            referencedRelation: "sp_feature_definitions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sp_plan_features_plan_id_fkey";
            columns: ["plan_id"];
            isOneToOne: false;
            referencedRelation: "sp_plans";
            referencedColumns: ["id"];
          },
        ];
      };
      sp_plans: {
        Row: {
          billing_interval: string;
          created_at: string;
          id: string;
          max_polls_per_month: number;
          max_responses_per_poll: number;
          name: string;
          price_cents: number;
        };
        Insert: {
          billing_interval?: string;
          created_at?: string;
          id?: string;
          max_polls_per_month?: number;
          max_responses_per_poll?: number;
          name: string;
          price_cents?: number;
        };
        Update: {
          billing_interval?: string;
          created_at?: string;
          id?: string;
          max_polls_per_month?: number;
          max_responses_per_poll?: number;
          name?: string;
          price_cents?: number;
        };
        Relationships: [];
      };
      sp_poll_assignments: {
        Row: {
          assigned_by: string | null;
          assigned_to: string;
          created_at: string;
          id: string;
          organization_id: string | null;
          poll_id: string;
        };
        Insert: {
          assigned_by?: string | null;
          assigned_to: string;
          created_at?: string;
          id?: string;
          organization_id?: string | null;
          poll_id: string;
        };
        Update: {
          assigned_by?: string | null;
          assigned_to?: string;
          created_at?: string;
          id?: string;
          organization_id?: string | null;
          poll_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "sp_poll_assignments_assigned_by_fkey";
            columns: ["assigned_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sp_poll_assignments_assigned_to_fkey";
            columns: ["assigned_to"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sp_poll_assignments_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sp_poll_assignments_poll_id_fkey";
            columns: ["poll_id"];
            isOneToOne: false;
            referencedRelation: "sp_polls";
            referencedColumns: ["id"];
          },
        ];
      };
      sp_poll_comments: {
        Row: {
          content: string;
          created_at: string;
          id: string;
          organization_id: string | null;
          parent_id: string | null;
          poll_id: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          id?: string;
          organization_id?: string | null;
          parent_id?: string | null;
          poll_id: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: string;
          organization_id?: string | null;
          parent_id?: string | null;
          poll_id?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "sp_poll_comments_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sp_poll_comments_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "sp_poll_comments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sp_poll_comments_poll_id_fkey";
            columns: ["poll_id"];
            isOneToOne: false;
            referencedRelation: "sp_polls";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sp_poll_comments_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      sp_poll_message_reactions: {
        Row: {
          created_at: string;
          emoji: string;
          id: string;
          message_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          emoji: string;
          id?: string;
          message_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          emoji?: string;
          id?: string;
          message_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "sp_poll_message_reactions_message_id_fkey";
            columns: ["message_id"];
            isOneToOne: false;
            referencedRelation: "sp_poll_messages";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sp_poll_message_reactions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      sp_poll_messages: {
        Row: {
          content: string;
          created_at: string;
          id: string;
          organization_id: string | null;
          poll_id: string;
          sender_id: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          id?: string;
          organization_id?: string | null;
          poll_id: string;
          sender_id: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: string;
          organization_id?: string | null;
          poll_id?: string;
          sender_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "sp_poll_messages_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sp_poll_messages_poll_id_fkey";
            columns: ["poll_id"];
            isOneToOne: false;
            referencedRelation: "sp_polls";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sp_poll_messages_sender_id_fkey";
            columns: ["sender_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      sp_poll_participants: {
        Row: {
          email: string | null;
          guest_token: string | null;
          id: string;
          invited_at: string;
          name: string | null;
          organization_id: string | null;
          poll_id: string;
          responded_at: string | null;
          user_id: string | null;
        };
        Insert: {
          email?: string | null;
          guest_token?: string | null;
          id?: string;
          invited_at?: string;
          name?: string | null;
          organization_id?: string | null;
          poll_id: string;
          responded_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          email?: string | null;
          guest_token?: string | null;
          id?: string;
          invited_at?: string;
          name?: string | null;
          organization_id?: string | null;
          poll_id?: string;
          responded_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "sp_poll_participants_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sp_poll_participants_poll_id_fkey";
            columns: ["poll_id"];
            isOneToOne: false;
            referencedRelation: "sp_polls";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sp_poll_participants_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      sp_poll_reminder_logs: {
        Row: {
          created_at: string;
          error: string | null;
          id: string;
          poll_id: string;
          recipient_id: string | null;
          reminder_id: string;
          status: string;
        };
        Insert: {
          created_at?: string;
          error?: string | null;
          id?: string;
          poll_id: string;
          recipient_id?: string | null;
          reminder_id: string;
          status?: string;
        };
        Update: {
          created_at?: string;
          error?: string | null;
          id?: string;
          poll_id?: string;
          recipient_id?: string | null;
          reminder_id?: string;
          status?: string;
        };
        Relationships: [
          {
            foreignKeyName: "sp_poll_reminder_logs_poll_id_fkey";
            columns: ["poll_id"];
            isOneToOne: false;
            referencedRelation: "sp_polls";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sp_poll_reminder_logs_recipient_id_fkey";
            columns: ["recipient_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sp_poll_reminder_logs_reminder_id_fkey";
            columns: ["reminder_id"];
            isOneToOne: false;
            referencedRelation: "sp_poll_reminders";
            referencedColumns: ["id"];
          },
        ];
      };
      sp_poll_reminders: {
        Row: {
          channel: string;
          created_at: string;
          id: string;
          organization_id: string | null;
          poll_id: string;
          send_at: string;
          sent_at: string | null;
        };
        Insert: {
          channel?: string;
          created_at?: string;
          id?: string;
          organization_id?: string | null;
          poll_id: string;
          send_at: string;
          sent_at?: string | null;
        };
        Update: {
          channel?: string;
          created_at?: string;
          id?: string;
          organization_id?: string | null;
          poll_id?: string;
          send_at?: string;
          sent_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "sp_poll_reminders_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sp_poll_reminders_poll_id_fkey";
            columns: ["poll_id"];
            isOneToOne: false;
            referencedRelation: "sp_polls";
            referencedColumns: ["id"];
          },
        ];
      };
      sp_poll_responses: {
        Row: {
          created_at: string;
          id: string;
          note: string | null;
          organization_id: string | null;
          participant_id: string;
          poll_id: string;
          selected_times: Json;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          note?: string | null;
          organization_id?: string | null;
          participant_id: string;
          poll_id: string;
          selected_times?: Json;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          note?: string | null;
          organization_id?: string | null;
          participant_id?: string;
          poll_id?: string;
          selected_times?: Json;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "sp_poll_responses_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sp_poll_responses_participant_id_fkey";
            columns: ["participant_id"];
            isOneToOne: true;
            referencedRelation: "sp_poll_participants";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sp_poll_responses_poll_id_fkey";
            columns: ["poll_id"];
            isOneToOne: false;
            referencedRelation: "sp_polls";
            referencedColumns: ["id"];
          },
        ];
      };
      sp_polls: {
        Row: {
          allow_guest: boolean;
          created_at: string;
          creator_id: string;
          deadline: string | null;
          description: string | null;
          id: string;
          is_public: boolean;
          organization_id: string;
          status: Database["public"]["Enums"]["sp_poll_status"];
          title: string;
          updated_at: string;
        };
        Insert: {
          allow_guest?: boolean;
          created_at?: string;
          creator_id: string;
          deadline?: string | null;
          description?: string | null;
          id?: string;
          is_public?: boolean;
          organization_id: string;
          status?: Database["public"]["Enums"]["sp_poll_status"];
          title: string;
          updated_at?: string;
        };
        Update: {
          allow_guest?: boolean;
          created_at?: string;
          creator_id?: string;
          deadline?: string | null;
          description?: string | null;
          id?: string;
          is_public?: boolean;
          organization_id?: string;
          status?: Database["public"]["Enums"]["sp_poll_status"];
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "sp_polls_creator_id_fkey";
            columns: ["creator_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sp_polls_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      sp_user_availability_settings: {
        Row: {
          booking_slug: string | null;
          buffer_after: number;
          buffer_before: number;
          created_at: string;
          id: string;
          organization_id: string | null;
          timezone: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          booking_slug?: string | null;
          buffer_after?: number;
          buffer_before?: number;
          created_at?: string;
          id?: string;
          organization_id?: string | null;
          timezone?: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          booking_slug?: string | null;
          buffer_after?: number;
          buffer_before?: number;
          created_at?: string;
          id?: string;
          organization_id?: string | null;
          timezone?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "sp_user_availability_settings_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sp_user_availability_settings_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      sp_user_blocked_dates: {
        Row: {
          blocked_date: string;
          created_at: string;
          id: string;
          organization_id: string | null;
          reason: string | null;
          user_id: string;
        };
        Insert: {
          blocked_date: string;
          created_at?: string;
          id?: string;
          organization_id?: string | null;
          reason?: string | null;
          user_id: string;
        };
        Update: {
          blocked_date?: string;
          created_at?: string;
          id?: string;
          organization_id?: string | null;
          reason?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "sp_user_blocked_dates_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sp_user_blocked_dates_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      sp_user_calendar_connections: {
        Row: {
          access_token: string | null;
          calendar_id: string | null;
          created_at: string;
          expires_at: string | null;
          id: string;
          is_primary: boolean;
          organization_id: string | null;
          provider: string;
          refresh_token: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          access_token?: string | null;
          calendar_id?: string | null;
          created_at?: string;
          expires_at?: string | null;
          id?: string;
          is_primary?: boolean;
          organization_id?: string | null;
          provider: string;
          refresh_token?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          access_token?: string | null;
          calendar_id?: string | null;
          created_at?: string;
          expires_at?: string | null;
          id?: string;
          is_primary?: boolean;
          organization_id?: string | null;
          provider?: string;
          refresh_token?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "sp_user_calendar_connections_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sp_user_calendar_connections_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      sp_user_integrations: {
        Row: {
          access_token: string | null;
          created_at: string;
          expires_at: string | null;
          id: string;
          metadata: Json;
          organization_id: string | null;
          provider: string;
          refresh_token: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          access_token?: string | null;
          created_at?: string;
          expires_at?: string | null;
          id?: string;
          metadata?: Json;
          organization_id?: string | null;
          provider: string;
          refresh_token?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          access_token?: string | null;
          created_at?: string;
          expires_at?: string | null;
          id?: string;
          metadata?: Json;
          organization_id?: string | null;
          provider?: string;
          refresh_token?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "sp_user_integrations_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sp_user_integrations_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      sp_user_notification_preferences: {
        Row: {
          channel: string;
          created_at: string;
          enabled: boolean;
          event_type: string;
          id: string;
          organization_id: string | null;
          user_id: string;
        };
        Insert: {
          channel?: string;
          created_at?: string;
          enabled?: boolean;
          event_type: string;
          id?: string;
          organization_id?: string | null;
          user_id: string;
        };
        Update: {
          channel?: string;
          created_at?: string;
          enabled?: boolean;
          event_type?: string;
          id?: string;
          organization_id?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "sp_user_notification_preferences_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sp_user_notification_preferences_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      sp_user_weekly_hours: {
        Row: {
          created_at: string;
          day_of_week: number;
          end_time: string;
          id: string;
          is_available: boolean;
          organization_id: string | null;
          start_time: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          day_of_week: number;
          end_time?: string;
          id?: string;
          is_available?: boolean;
          organization_id?: string | null;
          start_time?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          day_of_week?: number;
          end_time?: string;
          id?: string;
          is_available?: boolean;
          organization_id?: string | null;
          start_time?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "sp_user_weekly_hours_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sp_user_weekly_hours_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      space_deployments: {
        Row: {
          created_at: string;
          external_id: string | null;
          id: string;
          metadata: Json;
          organization_id: string;
          provider: string;
          space_id: string;
          status: string;
          url: string | null;
          version_id: string | null;
        };
        Insert: {
          created_at?: string;
          external_id?: string | null;
          id?: string;
          metadata?: Json;
          organization_id: string;
          provider?: string;
          space_id: string;
          status?: string;
          url?: string | null;
          version_id?: string | null;
        };
        Update: {
          created_at?: string;
          external_id?: string | null;
          id?: string;
          metadata?: Json;
          organization_id?: string;
          provider?: string;
          space_id?: string;
          status?: string;
          url?: string | null;
          version_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "space_deployments_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "space_deployments_space_id_fkey";
            columns: ["space_id"];
            isOneToOne: false;
            referencedRelation: "spaces";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "space_deployments_version_id_fkey";
            columns: ["version_id"];
            isOneToOne: false;
            referencedRelation: "space_versions";
            referencedColumns: ["id"];
          },
        ];
      };
      space_files: {
        Row: {
          byte_size: number;
          content: string | null;
          id: string;
          mime_type: string;
          organization_id: string;
          path: string;
          space_id: string;
          storage_path: string | null;
          updated_at: string;
        };
        Insert: {
          byte_size?: number;
          content?: string | null;
          id?: string;
          mime_type?: string;
          organization_id: string;
          path: string;
          space_id: string;
          storage_path?: string | null;
          updated_at?: string;
        };
        Update: {
          byte_size?: number;
          content?: string | null;
          id?: string;
          mime_type?: string;
          organization_id?: string;
          path?: string;
          space_id?: string;
          storage_path?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "space_files_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "space_files_space_id_fkey";
            columns: ["space_id"];
            isOneToOne: false;
            referencedRelation: "spaces";
            referencedColumns: ["id"];
          },
        ];
      };
      space_share_links: {
        Row: {
          created_at: string;
          created_by: string | null;
          expires_at: string | null;
          id: string;
          organization_id: string;
          space_id: string;
          token: string;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          expires_at?: string | null;
          id?: string;
          organization_id: string;
          space_id: string;
          token: string;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          expires_at?: string | null;
          id?: string;
          organization_id?: string;
          space_id?: string;
          token?: string;
        };
        Relationships: [
          {
            foreignKeyName: "space_share_links_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "app_users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "space_share_links_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "space_share_links_space_id_fkey";
            columns: ["space_id"];
            isOneToOne: false;
            referencedRelation: "spaces";
            referencedColumns: ["id"];
          },
        ];
      };
      space_versions: {
        Row: {
          created_at: string;
          created_by: string | null;
          id: string;
          message_id: string | null;
          organization_id: string;
          snapshot: Json;
          space_id: string;
          version_number: number;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          id?: string;
          message_id?: string | null;
          organization_id: string;
          snapshot?: Json;
          space_id: string;
          version_number: number;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          id?: string;
          message_id?: string | null;
          organization_id?: string;
          snapshot?: Json;
          space_id?: string;
          version_number?: number;
        };
        Relationships: [
          {
            foreignKeyName: "space_versions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "app_users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "space_versions_message_id_fkey";
            columns: ["message_id"];
            isOneToOne: false;
            referencedRelation: "chat_messages";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "space_versions_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "space_versions_space_id_fkey";
            columns: ["space_id"];
            isOneToOne: false;
            referencedRelation: "spaces";
            referencedColumns: ["id"];
          },
        ];
      };
      spaces: {
        Row: {
          chat_thread_id: string | null;
          created_at: string;
          created_by: string | null;
          id: string;
          metadata: Json;
          organization_id: string;
          preview_kind: string;
          slug: string;
          status: string;
          title: string;
          updated_at: string;
          visibility: string;
        };
        Insert: {
          chat_thread_id?: string | null;
          created_at?: string;
          created_by?: string | null;
          id?: string;
          metadata?: Json;
          organization_id: string;
          preview_kind?: string;
          slug: string;
          status?: string;
          title: string;
          updated_at?: string;
          visibility?: string;
        };
        Update: {
          chat_thread_id?: string | null;
          created_at?: string;
          created_by?: string | null;
          id?: string;
          metadata?: Json;
          organization_id?: string;
          preview_kind?: string;
          slug?: string;
          status?: string;
          title?: string;
          updated_at?: string;
          visibility?: string;
        };
        Relationships: [
          {
            foreignKeyName: "spaces_chat_thread_id_fkey";
            columns: ["chat_thread_id"];
            isOneToOne: false;
            referencedRelation: "chat_threads";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "spaces_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "app_users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "spaces_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      spouse_links: {
        Row: {
          created_at: string;
          id: string;
          spouse_id: string;
          status: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          spouse_id: string;
          status?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          spouse_id?: string;
          status?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "spouse_links_spouse_id_fkey";
            columns: ["spouse_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "spouse_links_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      store_livescan_bookings: {
        Row: {
          admin_notes: string | null;
          created_at: string;
          id: string;
          mode: Database["public"]["Enums"]["livescan_booking_mode"];
          organization_id: string | null;
          preferred_at: string | null;
          product_id: string;
          purchase_id: string;
          status: Database["public"]["Enums"]["livescan_booking_status"];
          student_notes: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          admin_notes?: string | null;
          created_at?: string;
          id?: string;
          mode: Database["public"]["Enums"]["livescan_booking_mode"];
          organization_id?: string | null;
          preferred_at?: string | null;
          product_id: string;
          purchase_id: string;
          status?: Database["public"]["Enums"]["livescan_booking_status"];
          student_notes?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          admin_notes?: string | null;
          created_at?: string;
          id?: string;
          mode?: Database["public"]["Enums"]["livescan_booking_mode"];
          organization_id?: string | null;
          preferred_at?: string | null;
          product_id?: string;
          purchase_id?: string;
          status?: Database["public"]["Enums"]["livescan_booking_status"];
          student_notes?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "store_livescan_bookings_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "store_livescan_bookings_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "store_products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "store_livescan_bookings_purchase_id_fkey";
            columns: ["purchase_id"];
            isOneToOne: false;
            referencedRelation: "store_purchases";
            referencedColumns: ["id"];
          },
        ];
      };
      store_products: {
        Row: {
          active: boolean;
          created_at: string;
          description: string | null;
          id: string;
          keys_per_unit: number;
          metadata: Json;
          name: string;
          organization_id: string | null;
          price_cents: number;
          product_type: Database["public"]["Enums"]["store_product_type"];
          program_id: string | null;
          require_bundle_ownership: boolean;
          short_description: string | null;
          slug: string;
          sort_order: number;
          updated_at: string;
        };
        Insert: {
          active?: boolean;
          created_at?: string;
          description?: string | null;
          id?: string;
          keys_per_unit?: number;
          metadata?: Json;
          name: string;
          organization_id?: string | null;
          price_cents: number;
          product_type: Database["public"]["Enums"]["store_product_type"];
          program_id?: string | null;
          require_bundle_ownership?: boolean;
          short_description?: string | null;
          slug: string;
          sort_order?: number;
          updated_at?: string;
        };
        Update: {
          active?: boolean;
          created_at?: string;
          description?: string | null;
          id?: string;
          keys_per_unit?: number;
          metadata?: Json;
          name?: string;
          organization_id?: string | null;
          price_cents?: number;
          product_type?: Database["public"]["Enums"]["store_product_type"];
          program_id?: string | null;
          require_bundle_ownership?: boolean;
          short_description?: string | null;
          slug?: string;
          sort_order?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "store_products_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "store_products_program_id_fkey";
            columns: ["program_id"];
            isOneToOne: false;
            referencedRelation: "programs";
            referencedColumns: ["id"];
          },
        ];
      };
      store_purchases: {
        Row: {
          created_at: string;
          fulfillment: Json;
          id: string;
          notes: string | null;
          organization_id: string | null;
          product_id: string;
          provider: string;
          provider_transaction_id: string | null;
          quantity: number;
          status: Database["public"]["Enums"]["store_purchase_status"];
          total_cents: number;
          unit_price_cents: number;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          fulfillment?: Json;
          id?: string;
          notes?: string | null;
          organization_id?: string | null;
          product_id: string;
          provider?: string;
          provider_transaction_id?: string | null;
          quantity?: number;
          status?: Database["public"]["Enums"]["store_purchase_status"];
          total_cents: number;
          unit_price_cents: number;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          fulfillment?: Json;
          id?: string;
          notes?: string | null;
          organization_id?: string | null;
          product_id?: string;
          provider?: string;
          provider_transaction_id?: string | null;
          quantity?: number;
          status?: Database["public"]["Enums"]["store_purchase_status"];
          total_cents?: number;
          unit_price_cents?: number;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "store_purchases_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "store_purchases_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "store_products";
            referencedColumns: ["id"];
          },
        ];
      };
      stored_cards: {
        Row: {
          card_brand: string | null;
          cardholder_name: string | null;
          created_at: string;
          exp_month: number | null;
          exp_year: number | null;
          id: string;
          is_default: boolean;
          last_four: string | null;
          square_card_id: string;
          square_customer_id: string;
          user_id: string;
        };
        Insert: {
          card_brand?: string | null;
          cardholder_name?: string | null;
          created_at?: string;
          exp_month?: number | null;
          exp_year?: number | null;
          id?: string;
          is_default?: boolean;
          last_four?: string | null;
          square_card_id: string;
          square_customer_id: string;
          user_id: string;
        };
        Update: {
          card_brand?: string | null;
          cardholder_name?: string | null;
          created_at?: string;
          exp_month?: number | null;
          exp_year?: number | null;
          id?: string;
          is_default?: boolean;
          last_four?: string | null;
          square_card_id?: string;
          square_customer_id?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      student_documents: {
        Row: {
          created_at: string;
          document_type: string;
          enrollment_id: string | null;
          file_name: string;
          file_path: string;
          id: string;
          reviewed_at: string | null;
          reviewed_by: string | null;
          reviewer_notes: string | null;
          status: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          document_type: string;
          enrollment_id?: string | null;
          file_name: string;
          file_path: string;
          id?: string;
          reviewed_at?: string | null;
          reviewed_by?: string | null;
          reviewer_notes?: string | null;
          status?: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          document_type?: string;
          enrollment_id?: string | null;
          file_name?: string;
          file_path?: string;
          id?: string;
          reviewed_at?: string | null;
          reviewed_by?: string | null;
          reviewer_notes?: string | null;
          status?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "student_documents_enrollment_id_fkey";
            columns: ["enrollment_id"];
            isOneToOne: false;
            referencedRelation: "enrollments";
            referencedColumns: ["id"];
          },
        ];
      };
      student_exam_submissions: {
        Row: {
          created_at: string;
          enrollment_id: string;
          exam_date: string;
          id: string;
          notes: string | null;
          submitted_at: string;
          verified: boolean;
        };
        Insert: {
          created_at?: string;
          enrollment_id: string;
          exam_date: string;
          id?: string;
          notes?: string | null;
          submitted_at?: string;
          verified?: boolean;
        };
        Update: {
          created_at?: string;
          enrollment_id?: string;
          exam_date?: string;
          id?: string;
          notes?: string | null;
          submitted_at?: string;
          verified?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "student_exam_submissions_enrollment_id_fkey";
            columns: ["enrollment_id"];
            isOneToOne: false;
            referencedRelation: "enrollments";
            referencedColumns: ["id"];
          },
        ];
      };
      student_practice_passes: {
        Row: {
          cohort_id: string | null;
          created_at: string;
          enrollment_id: string;
          id: string;
          is_reserve: boolean;
          pass_number: number;
          reschedule_count: number;
          scheduled_date: string | null;
          status: string;
          updated_at: string;
          used_at: string | null;
        };
        Insert: {
          cohort_id?: string | null;
          created_at?: string;
          enrollment_id: string;
          id?: string;
          is_reserve?: boolean;
          pass_number: number;
          reschedule_count?: number;
          scheduled_date?: string | null;
          status?: string;
          updated_at?: string;
          used_at?: string | null;
        };
        Update: {
          cohort_id?: string | null;
          created_at?: string;
          enrollment_id?: string;
          id?: string;
          is_reserve?: boolean;
          pass_number?: number;
          reschedule_count?: number;
          scheduled_date?: string | null;
          status?: string;
          updated_at?: string;
          used_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "student_practice_passes_cohort_id_fkey";
            columns: ["cohort_id"];
            isOneToOne: false;
            referencedRelation: "cohorts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "student_practice_passes_enrollment_id_fkey";
            columns: ["enrollment_id"];
            isOneToOne: false;
            referencedRelation: "enrollments";
            referencedColumns: ["id"];
          },
        ];
      };
      student_streaks: {
        Row: {
          current_streak: number;
          id: string;
          last_practice_date: string | null;
          longest_streak: number;
          organization_id: string | null;
          total_practice_sessions: number;
          user_id: string;
        };
        Insert: {
          current_streak?: number;
          id?: string;
          last_practice_date?: string | null;
          longest_streak?: number;
          organization_id?: string | null;
          total_practice_sessions?: number;
          user_id: string;
        };
        Update: {
          current_streak?: number;
          id?: string;
          last_practice_date?: string | null;
          longest_streak?: number;
          organization_id?: string | null;
          total_practice_sessions?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "student_streaks_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "student_streaks_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      student_weak_areas: {
        Row: {
          category: string;
          failure_rate: number;
          id: string;
          last_attempted_at: string | null;
          last_streak_date: string | null;
          organization_id: string | null;
          streak_days: number;
          total_attempted: number;
          total_correct: number;
          user_id: string;
          weighted_failure_rate: number | null;
        };
        Insert: {
          category: string;
          failure_rate?: number;
          id?: string;
          last_attempted_at?: string | null;
          last_streak_date?: string | null;
          organization_id?: string | null;
          streak_days?: number;
          total_attempted?: number;
          total_correct?: number;
          user_id: string;
          weighted_failure_rate?: number | null;
        };
        Update: {
          category?: string;
          failure_rate?: number;
          id?: string;
          last_attempted_at?: string | null;
          last_streak_date?: string | null;
          organization_id?: string | null;
          streak_days?: number;
          total_attempted?: number;
          total_correct?: number;
          user_id?: string;
          weighted_failure_rate?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "student_weak_areas_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "student_weak_areas_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      submission_saved_views: {
        Row: {
          created_at: string;
          filters: Json;
          id: string;
          name: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          filters?: Json;
          id?: string;
          name: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          filters?: Json;
          id?: string;
          name?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      subscription_limit: {
        Row: {
          ai_nums: number;
          billing_interval: string | null;
          created_at: string | null;
          deploy_limit: number;
          enhance_nums: number;
          id: string;
          is_active: boolean;
          last_quota_refresh: string | null;
          organization_id: string;
          period_end: string;
          period_start: string;
          plan_id: string;
          plan_name: string;
          project_nums: number;
          seats: number;
          stripe_customer_id: string | null;
          updated_at: string;
          upload_limit: number;
        };
        Insert: {
          ai_nums: number;
          billing_interval?: string | null;
          created_at?: string | null;
          deploy_limit: number;
          enhance_nums: number;
          id: string;
          is_active?: boolean;
          last_quota_refresh?: string | null;
          organization_id: string;
          period_end: string;
          period_start: string;
          plan_id: string;
          plan_name: string;
          project_nums?: number;
          seats?: number;
          stripe_customer_id?: string | null;
          updated_at?: string;
          upload_limit: number;
        };
        Update: {
          ai_nums?: number;
          billing_interval?: string | null;
          created_at?: string | null;
          deploy_limit?: number;
          enhance_nums?: number;
          id?: string;
          is_active?: boolean;
          last_quota_refresh?: string | null;
          organization_id?: string;
          period_end?: string;
          period_start?: string;
          plan_id?: string;
          plan_name?: string;
          project_nums?: number;
          seats?: number;
          stripe_customer_id?: string | null;
          updated_at?: string;
          upload_limit?: number;
        };
        Relationships: [];
      };
      sync_logs: {
        Row: {
          created_at: string;
          details: string | null;
          id: string;
          organization_id: string | null;
          status: string;
          sync_type: string;
        };
        Insert: {
          created_at?: string;
          details?: string | null;
          id?: string;
          organization_id?: string | null;
          status?: string;
          sync_type: string;
        };
        Update: {
          created_at?: string;
          details?: string | null;
          id?: string;
          organization_id?: string | null;
          status?: string;
          sync_type?: string;
        };
        Relationships: [
          {
            foreignKeyName: "sync_logs_tenant_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      sync_outbox: {
        Row: {
          attempts: number;
          created_at: string;
          entity_id: string | null;
          entity_type: string;
          event_type: string;
          id: string;
          integration_id: string | null;
          last_error: string | null;
          payload: Json;
          scheduled_for: string;
          sent_at: string | null;
          status: string;
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          attempts?: number;
          created_at?: string;
          entity_id?: string | null;
          entity_type: string;
          event_type: string;
          id?: string;
          integration_id?: string | null;
          last_error?: string | null;
          payload?: Json;
          scheduled_for?: string;
          sent_at?: string | null;
          status?: string;
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          attempts?: number;
          created_at?: string;
          entity_id?: string | null;
          entity_type?: string;
          event_type?: string;
          id?: string;
          integration_id?: string | null;
          last_error?: string | null;
          payload?: Json;
          scheduled_for?: string;
          sent_at?: string | null;
          status?: string;
          updated_at?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "sync_outbox_integration_id_fkey";
            columns: ["integration_id"];
            isOneToOne: false;
            referencedRelation: "integrations";
            referencedColumns: ["id"];
          },
        ];
      };
      system_integrity_logs: {
        Row: {
          affected_entity: string;
          category: string;
          description: string;
          detected_at: string;
          entity_id: string | null;
          error_type: string;
          fix_attempted: boolean;
          fix_details: string | null;
          fix_successful: boolean;
          id: string;
          organization_id: string | null;
          resolved_at: string | null;
          resolved_by: string | null;
          severity: string;
          status: string;
        };
        Insert: {
          affected_entity: string;
          category: string;
          description: string;
          detected_at?: string;
          entity_id?: string | null;
          error_type: string;
          fix_attempted?: boolean;
          fix_details?: string | null;
          fix_successful?: boolean;
          id?: string;
          organization_id?: string | null;
          resolved_at?: string | null;
          resolved_by?: string | null;
          severity?: string;
          status?: string;
        };
        Update: {
          affected_entity?: string;
          category?: string;
          description?: string;
          detected_at?: string;
          entity_id?: string | null;
          error_type?: string;
          fix_attempted?: boolean;
          fix_details?: string | null;
          fix_successful?: boolean;
          id?: string;
          organization_id?: string | null;
          resolved_at?: string | null;
          resolved_by?: string | null;
          severity?: string;
          status?: string;
        };
        Relationships: [
          {
            foreignKeyName: "system_integrity_logs_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      timeline_comments: {
        Row: {
          author_id: string;
          content: string;
          created_at: string;
          deleted_at: string | null;
          id: string;
          post_id: string;
        };
        Insert: {
          author_id: string;
          content: string;
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          post_id: string;
        };
        Update: {
          author_id?: string;
          content?: string;
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          post_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "timeline_comments_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "timeline_comments_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "timeline_posts";
            referencedColumns: ["id"];
          },
        ];
      };
      timeline_posts: {
        Row: {
          author_id: string;
          cohort_id: string | null;
          comments_enabled: boolean;
          content: string;
          created_at: string;
          deleted_at: string | null;
          id: string;
          is_pinned: boolean;
          is_system_generated: boolean;
          media_urls: string[] | null;
          post_type: Database["public"]["Enums"]["post_type"];
          program_id: string | null;
          updated_at: string;
          visibility: Database["public"]["Enums"]["post_visibility"];
        };
        Insert: {
          author_id: string;
          cohort_id?: string | null;
          comments_enabled?: boolean;
          content: string;
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          is_pinned?: boolean;
          is_system_generated?: boolean;
          media_urls?: string[] | null;
          post_type?: Database["public"]["Enums"]["post_type"];
          program_id?: string | null;
          updated_at?: string;
          visibility?: Database["public"]["Enums"]["post_visibility"];
        };
        Update: {
          author_id?: string;
          cohort_id?: string | null;
          comments_enabled?: boolean;
          content?: string;
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          is_pinned?: boolean;
          is_system_generated?: boolean;
          media_urls?: string[] | null;
          post_type?: Database["public"]["Enums"]["post_type"];
          program_id?: string | null;
          updated_at?: string;
          visibility?: Database["public"]["Enums"]["post_visibility"];
        };
        Relationships: [
          {
            foreignKeyName: "timeline_posts_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "timeline_posts_program_id_fkey";
            columns: ["program_id"];
            isOneToOne: false;
            referencedRelation: "programs";
            referencedColumns: ["id"];
          },
        ];
      };
      timeline_reactions: {
        Row: {
          created_at: string;
          emoji: string;
          id: string;
          post_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          emoji: string;
          id?: string;
          post_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          emoji?: string;
          id?: string;
          post_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "timeline_reactions_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "timeline_posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "timeline_reactions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      usage_events: {
        Row: {
          cost_usd: number;
          created_at: string;
          event_type: string;
          id: string;
          input_tokens: number;
          metadata: Json;
          model: string | null;
          organization_id: string;
          output_tokens: number;
          user_id: string | null;
        };
        Insert: {
          cost_usd?: number;
          created_at?: string;
          event_type: string;
          id?: string;
          input_tokens?: number;
          metadata?: Json;
          model?: string | null;
          organization_id: string;
          output_tokens?: number;
          user_id?: string | null;
        };
        Update: {
          cost_usd?: number;
          created_at?: string;
          event_type?: string;
          id?: string;
          input_tokens?: number;
          metadata?: Json;
          model?: string | null;
          organization_id?: string;
          output_tokens?: number;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "usage_events_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "usage_events_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "app_users";
            referencedColumns: ["id"];
          },
        ];
      };
      user_blocks: {
        Row: {
          blocked_id: string;
          blocker_id: string;
          created_at: string;
          id: string;
        };
        Insert: {
          blocked_id: string;
          blocker_id: string;
          created_at?: string;
          id?: string;
        };
        Update: {
          blocked_id?: string;
          blocker_id?: string;
          created_at?: string;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_blocks_blocked_id_fkey";
            columns: ["blocked_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_blocks_blocker_id_fkey";
            columns: ["blocker_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      user_connections: {
        Row: {
          created_at: string;
          id: string;
          recipient_id: string;
          requester_id: string;
          status: Database["public"]["Enums"]["connection_status"];
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          recipient_id: string;
          requester_id: string;
          status?: Database["public"]["Enums"]["connection_status"];
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          recipient_id?: string;
          requester_id?: string;
          status?: Database["public"]["Enums"]["connection_status"];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_connections_recipient_id_fkey";
            columns: ["recipient_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_connections_requester_id_fkey";
            columns: ["requester_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      user_presence: {
        Row: {
          custom_status: string | null;
          last_seen_at: string;
          status: Database["public"]["Enums"]["presence_status"];
          updated_at: string;
          user_id: string;
        };
        Insert: {
          custom_status?: string | null;
          last_seen_at?: string;
          status?: Database["public"]["Enums"]["presence_status"];
          updated_at?: string;
          user_id: string;
        };
        Update: {
          custom_status?: string | null;
          last_seen_at?: string;
          status?: Database["public"]["Enums"]["presence_status"];
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_presence_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      user_roles: {
        Row: {
          id: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Insert: {
          id?: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Update: {
          id?: string;
          role?: Database["public"]["Enums"]["app_role"];
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey1";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      user_tour_progress: {
        Row: {
          completed_at: string | null;
          context: Json;
          created_at: string;
          current_step: number;
          id: string;
          skipped_at: string | null;
          snoozed_until: string | null;
          started_at: string | null;
          status: string;
          tour_id: string;
          tour_version: number;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          completed_at?: string | null;
          context?: Json;
          created_at?: string;
          current_step?: number;
          id?: string;
          skipped_at?: string | null;
          snoozed_until?: string | null;
          started_at?: string | null;
          status?: string;
          tour_id: string;
          tour_version?: number;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          completed_at?: string | null;
          context?: Json;
          created_at?: string;
          current_step?: number;
          id?: string;
          skipped_at?: string | null;
          snoozed_until?: string | null;
          started_at?: string | null;
          status?: string;
          tour_id?: string;
          tour_version?: number;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_tour_progress_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      users: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          password: string | null;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: string;
          password?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          password?: string | null;
        };
        Relationships: [];
      };
      waitlist: {
        Row: {
          cohort_id: string | null;
          created_at: string;
          email: string;
          first_name: string | null;
          id: string;
          last_name: string | null;
          notified: boolean;
          notified_at: string | null;
          organization_id: string | null;
          phone: string | null;
          program_id: string;
          user_id: string | null;
        };
        Insert: {
          cohort_id?: string | null;
          created_at?: string;
          email: string;
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
          notified?: boolean;
          notified_at?: string | null;
          organization_id?: string | null;
          phone?: string | null;
          program_id: string;
          user_id?: string | null;
        };
        Update: {
          cohort_id?: string | null;
          created_at?: string;
          email?: string;
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
          notified?: boolean;
          notified_at?: string | null;
          organization_id?: string | null;
          phone?: string | null;
          program_id?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "waitlist_cohort_id_fkey";
            columns: ["cohort_id"];
            isOneToOne: false;
            referencedRelation: "cohorts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "waitlist_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "waitlist_program_id_fkey";
            columns: ["program_id"];
            isOneToOne: false;
            referencedRelation: "programs";
            referencedColumns: ["id"];
          },
        ];
      };
      wws_alumni_posts: {
        Row: {
          approved_at: string | null;
          caption: string | null;
          created_at: string | null;
          id: string;
          image_urls: string[] | null;
          lead_id: string;
          milestone_tag: string | null;
          puppy_id: string | null;
          status: string | null;
          video_url: string | null;
        };
        Insert: {
          approved_at?: string | null;
          caption?: string | null;
          created_at?: string | null;
          id?: string;
          image_urls?: string[] | null;
          lead_id: string;
          milestone_tag?: string | null;
          puppy_id?: string | null;
          status?: string | null;
          video_url?: string | null;
        };
        Update: {
          approved_at?: string | null;
          caption?: string | null;
          created_at?: string | null;
          id?: string;
          image_urls?: string[] | null;
          lead_id?: string;
          milestone_tag?: string | null;
          puppy_id?: string | null;
          status?: string | null;
          video_url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "wws_alumni_posts_lead_id_fkey";
            columns: ["lead_id"];
            isOneToOne: false;
            referencedRelation: "wws_leads";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "wws_alumni_posts_puppy_id_fkey";
            columns: ["puppy_id"];
            isOneToOne: false;
            referencedRelation: "wws_puppies";
            referencedColumns: ["id"];
          },
        ];
      };
      wws_appointments: {
        Row: {
          calendar_type: string;
          created_at: string | null;
          ends_at: string | null;
          ghl_appointment_id: string | null;
          id: string;
          lead_id: string;
          starts_at: string;
          status: string | null;
        };
        Insert: {
          calendar_type: string;
          created_at?: string | null;
          ends_at?: string | null;
          ghl_appointment_id?: string | null;
          id?: string;
          lead_id: string;
          starts_at: string;
          status?: string | null;
        };
        Update: {
          calendar_type?: string;
          created_at?: string | null;
          ends_at?: string | null;
          ghl_appointment_id?: string | null;
          id?: string;
          lead_id?: string;
          starts_at?: string;
          status?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "wws_appointments_lead_id_fkey";
            columns: ["lead_id"];
            isOneToOne: false;
            referencedRelation: "wws_leads";
            referencedColumns: ["id"];
          },
        ];
      };
      wws_dog_profiles: {
        Row: {
          bio: string | null;
          call_name: string;
          color_description: string | null;
          created_at: string | null;
          dob: string | null;
          gallery_urls: string[] | null;
          health_notes: string | null;
          id: string;
          lead_id: string;
          profile_photo_url: string | null;
          puppy_id: string | null;
          sex: string | null;
          titles_earned: string[] | null;
          updated_at: string | null;
          weight_lbs: number | null;
        };
        Insert: {
          bio?: string | null;
          call_name: string;
          color_description?: string | null;
          created_at?: string | null;
          dob?: string | null;
          gallery_urls?: string[] | null;
          health_notes?: string | null;
          id?: string;
          lead_id: string;
          profile_photo_url?: string | null;
          puppy_id?: string | null;
          sex?: string | null;
          titles_earned?: string[] | null;
          updated_at?: string | null;
          weight_lbs?: number | null;
        };
        Update: {
          bio?: string | null;
          call_name?: string;
          color_description?: string | null;
          created_at?: string | null;
          dob?: string | null;
          gallery_urls?: string[] | null;
          health_notes?: string | null;
          id?: string;
          lead_id?: string;
          profile_photo_url?: string | null;
          puppy_id?: string | null;
          sex?: string | null;
          titles_earned?: string[] | null;
          updated_at?: string | null;
          weight_lbs?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "wws_dog_profiles_lead_id_fkey";
            columns: ["lead_id"];
            isOneToOne: false;
            referencedRelation: "wws_leads";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "wws_dog_profiles_puppy_id_fkey";
            columns: ["puppy_id"];
            isOneToOne: false;
            referencedRelation: "wws_puppies";
            referencedColumns: ["id"];
          },
        ];
      };
      wws_leads: {
        Row: {
          additional_notes: string | null;
          application_draft: Json | null;
          approval_sent_at: string | null;
          approval_token: string | null;
          children_ages: string | null;
          city: string | null;
          created_at: string | null;
          denial_reason: string | null;
          deposit_link_sent_at: string | null;
          deposit_status: string | null;
          email: string | null;
          family_size: number | null;
          full_name: string | null;
          ghl_contact_id: string | null;
          has_fenced_yard: boolean | null;
          has_owned_large_dog: boolean | null;
          household_type: string | null;
          id: string;
          internal_notes: string | null;
          match_call_booked_at: string | null;
          other_pets: string | null;
          phone: string | null;
          pickup_date: string | null;
          portal_last_seen_at: string | null;
          preferred_puppy_id: string | null;
          preferred_sex: string | null;
          ready_for_deposit: boolean | null;
          reason_for_breed: string | null;
          referral_code: string | null;
          referred_by_lead_id: string | null;
          reviewed_at: string | null;
          reviewed_by: string | null;
          score: number | null;
          signature_agreed_at: string | null;
          source: string | null;
          stage: string | null;
          state: string | null;
          timeline: string | null;
          updated_at: string | null;
          utm_campaign: string | null;
          video_call_booked_at: string | null;
        };
        Insert: {
          additional_notes?: string | null;
          application_draft?: Json | null;
          approval_sent_at?: string | null;
          approval_token?: string | null;
          children_ages?: string | null;
          city?: string | null;
          created_at?: string | null;
          denial_reason?: string | null;
          deposit_link_sent_at?: string | null;
          deposit_status?: string | null;
          email?: string | null;
          family_size?: number | null;
          full_name?: string | null;
          ghl_contact_id?: string | null;
          has_fenced_yard?: boolean | null;
          has_owned_large_dog?: boolean | null;
          household_type?: string | null;
          id?: string;
          internal_notes?: string | null;
          match_call_booked_at?: string | null;
          other_pets?: string | null;
          phone?: string | null;
          pickup_date?: string | null;
          portal_last_seen_at?: string | null;
          preferred_puppy_id?: string | null;
          preferred_sex?: string | null;
          ready_for_deposit?: boolean | null;
          reason_for_breed?: string | null;
          referral_code?: string | null;
          referred_by_lead_id?: string | null;
          reviewed_at?: string | null;
          reviewed_by?: string | null;
          score?: number | null;
          signature_agreed_at?: string | null;
          source?: string | null;
          stage?: string | null;
          state?: string | null;
          timeline?: string | null;
          updated_at?: string | null;
          utm_campaign?: string | null;
          video_call_booked_at?: string | null;
        };
        Update: {
          additional_notes?: string | null;
          application_draft?: Json | null;
          approval_sent_at?: string | null;
          approval_token?: string | null;
          children_ages?: string | null;
          city?: string | null;
          created_at?: string | null;
          denial_reason?: string | null;
          deposit_link_sent_at?: string | null;
          deposit_status?: string | null;
          email?: string | null;
          family_size?: number | null;
          full_name?: string | null;
          ghl_contact_id?: string | null;
          has_fenced_yard?: boolean | null;
          has_owned_large_dog?: boolean | null;
          household_type?: string | null;
          id?: string;
          internal_notes?: string | null;
          match_call_booked_at?: string | null;
          other_pets?: string | null;
          phone?: string | null;
          pickup_date?: string | null;
          portal_last_seen_at?: string | null;
          preferred_puppy_id?: string | null;
          preferred_sex?: string | null;
          ready_for_deposit?: boolean | null;
          reason_for_breed?: string | null;
          referral_code?: string | null;
          referred_by_lead_id?: string | null;
          reviewed_at?: string | null;
          reviewed_by?: string | null;
          score?: number | null;
          signature_agreed_at?: string | null;
          source?: string | null;
          stage?: string | null;
          state?: string | null;
          timeline?: string | null;
          updated_at?: string | null;
          utm_campaign?: string | null;
          video_call_booked_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "wws_leads_preferred_puppy_id_fkey";
            columns: ["preferred_puppy_id"];
            isOneToOne: false;
            referencedRelation: "wws_puppies";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "wws_leads_referred_by_lead_id_fkey";
            columns: ["referred_by_lead_id"];
            isOneToOne: false;
            referencedRelation: "wws_leads";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "wws_leads_reviewed_by_fkey";
            columns: ["reviewed_by"];
            isOneToOne: false;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
        ];
      };
      wws_litters: {
        Row: {
          born_date: string | null;
          cover_image_url: string | null;
          created_at: string;
          dam_name: string | null;
          description: string | null;
          expected_count: number | null;
          id: string;
          name: string;
          priority_order: number;
          ready_date: string | null;
          sire_name: string | null;
          slug: string;
          status: string;
          updated_at: string;
        };
        Insert: {
          born_date?: string | null;
          cover_image_url?: string | null;
          created_at?: string;
          dam_name?: string | null;
          description?: string | null;
          expected_count?: number | null;
          id?: string;
          name: string;
          priority_order?: number;
          ready_date?: string | null;
          sire_name?: string | null;
          slug: string;
          status?: string;
          updated_at?: string;
        };
        Update: {
          born_date?: string | null;
          cover_image_url?: string | null;
          created_at?: string;
          dam_name?: string | null;
          description?: string | null;
          expected_count?: number | null;
          id?: string;
          name?: string;
          priority_order?: number;
          ready_date?: string | null;
          sire_name?: string | null;
          slug?: string;
          status?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      wws_messages: {
        Row: {
          body: string;
          created_at: string | null;
          id: string;
          lead_id: string;
          read_at: string | null;
          sender: string;
        };
        Insert: {
          body: string;
          created_at?: string | null;
          id?: string;
          lead_id: string;
          read_at?: string | null;
          sender: string;
        };
        Update: {
          body?: string;
          created_at?: string | null;
          id?: string;
          lead_id?: string;
          read_at?: string | null;
          sender?: string;
        };
        Relationships: [
          {
            foreignKeyName: "wws_messages_lead_id_fkey";
            columns: ["lead_id"];
            isOneToOne: false;
            referencedRelation: "wws_leads";
            referencedColumns: ["id"];
          },
        ];
      };
      wws_portal_updates: {
        Row: {
          body: string | null;
          created_at: string | null;
          id: string;
          image_urls: string[] | null;
          milestone_tag: string | null;
          published_at: string | null;
          puppy_id: string | null;
          title: string | null;
          video_url: string | null;
          visibility: string | null;
        };
        Insert: {
          body?: string | null;
          created_at?: string | null;
          id?: string;
          image_urls?: string[] | null;
          milestone_tag?: string | null;
          published_at?: string | null;
          puppy_id?: string | null;
          title?: string | null;
          video_url?: string | null;
          visibility?: string | null;
        };
        Update: {
          body?: string | null;
          created_at?: string | null;
          id?: string;
          image_urls?: string[] | null;
          milestone_tag?: string | null;
          published_at?: string | null;
          puppy_id?: string | null;
          title?: string | null;
          video_url?: string | null;
          visibility?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "wws_portal_updates_puppy_id_fkey";
            columns: ["puppy_id"];
            isOneToOne: false;
            referencedRelation: "wws_puppies";
            referencedColumns: ["id"];
          },
        ];
      };
      wws_profiles: {
        Row: {
          created_at: string | null;
          id: string;
          lead_id: string | null;
          role: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          id: string;
          lead_id?: string | null;
          role?: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          lead_id?: string | null;
          role?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "wws_profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "kb_user_search";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "wws_profiles_lead_id_fkey";
            columns: ["lead_id"];
            isOneToOne: false;
            referencedRelation: "wws_leads";
            referencedColumns: ["id"];
          },
        ];
      };
      wws_puppies: {
        Row: {
          collar_color: string | null;
          created_at: string | null;
          deposit_paid_at: string | null;
          dob: string | null;
          gallery_urls: string[] | null;
          id: string;
          ideal_home: string | null;
          image_url: string | null;
          litter_id: string | null;
          name: string;
          personality_bio: string | null;
          price: number | null;
          priority_order: number | null;
          ready_date: string | null;
          reserved_by_lead_id: string | null;
          sex: string | null;
          slug: string;
          status: string | null;
          stripe_payment_link: string | null;
          temperament_tags: string[] | null;
          tier: string | null;
          video_url: string | null;
        };
        Insert: {
          collar_color?: string | null;
          created_at?: string | null;
          deposit_paid_at?: string | null;
          dob?: string | null;
          gallery_urls?: string[] | null;
          id?: string;
          ideal_home?: string | null;
          image_url?: string | null;
          litter_id?: string | null;
          name: string;
          personality_bio?: string | null;
          price?: number | null;
          priority_order?: number | null;
          ready_date?: string | null;
          reserved_by_lead_id?: string | null;
          sex?: string | null;
          slug: string;
          status?: string | null;
          stripe_payment_link?: string | null;
          temperament_tags?: string[] | null;
          tier?: string | null;
          video_url?: string | null;
        };
        Update: {
          collar_color?: string | null;
          created_at?: string | null;
          deposit_paid_at?: string | null;
          dob?: string | null;
          gallery_urls?: string[] | null;
          id?: string;
          ideal_home?: string | null;
          image_url?: string | null;
          litter_id?: string | null;
          name?: string;
          personality_bio?: string | null;
          price?: number | null;
          priority_order?: number | null;
          ready_date?: string | null;
          reserved_by_lead_id?: string | null;
          sex?: string | null;
          slug?: string;
          status?: string | null;
          stripe_payment_link?: string | null;
          temperament_tags?: string[] | null;
          tier?: string | null;
          video_url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "wws_puppies_litter_id_fkey";
            columns: ["litter_id"];
            isOneToOne: false;
            referencedRelation: "wws_litters";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "wws_puppies_reserved_by_lead_id_fkey";
            columns: ["reserved_by_lead_id"];
            isOneToOne: false;
            referencedRelation: "wws_leads";
            referencedColumns: ["id"];
          },
        ];
      };
      wws_reservations: {
        Row: {
          amount: number | null;
          contract_sent_at: string | null;
          created_at: string | null;
          deposit_status: string | null;
          final_payment_due_at: string | null;
          final_payment_paid_at: string | null;
          id: string;
          lead_id: string | null;
          pick_order: number | null;
          pickup_date: string | null;
          puppy_id: string | null;
          refunded_at: string | null;
          stripe_payment_intent_id: string | null;
          stripe_refund_id: string | null;
          stripe_session_id: string | null;
          tier: string | null;
        };
        Insert: {
          amount?: number | null;
          contract_sent_at?: string | null;
          created_at?: string | null;
          deposit_status?: string | null;
          final_payment_due_at?: string | null;
          final_payment_paid_at?: string | null;
          id?: string;
          lead_id?: string | null;
          pick_order?: number | null;
          pickup_date?: string | null;
          puppy_id?: string | null;
          refunded_at?: string | null;
          stripe_payment_intent_id?: string | null;
          stripe_refund_id?: string | null;
          stripe_session_id?: string | null;
          tier?: string | null;
        };
        Update: {
          amount?: number | null;
          contract_sent_at?: string | null;
          created_at?: string | null;
          deposit_status?: string | null;
          final_payment_due_at?: string | null;
          final_payment_paid_at?: string | null;
          id?: string;
          lead_id?: string | null;
          pick_order?: number | null;
          pickup_date?: string | null;
          puppy_id?: string | null;
          refunded_at?: string | null;
          stripe_payment_intent_id?: string | null;
          stripe_refund_id?: string | null;
          stripe_session_id?: string | null;
          tier?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "wws_reservations_lead_id_fkey";
            columns: ["lead_id"];
            isOneToOne: false;
            referencedRelation: "wws_leads";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "wws_reservations_puppy_id_fkey";
            columns: ["puppy_id"];
            isOneToOne: false;
            referencedRelation: "wws_puppies";
            referencedColumns: ["id"];
          },
        ];
      };
      wws_resources: {
        Row: {
          created_at: string | null;
          description: string | null;
          id: string;
          section: string;
          sort_order: number | null;
          title: string;
          url: string | null;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          section: string;
          sort_order?: number | null;
          title: string;
          url?: string | null;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          section?: string;
          sort_order?: number | null;
          title?: string;
          url?: string | null;
        };
        Relationships: [];
      };
      wws_support_tickets: {
        Row: {
          body: string;
          created_at: string | null;
          id: string;
          lead_id: string;
          status: string | null;
          subject: string;
          updated_at: string | null;
        };
        Insert: {
          body: string;
          created_at?: string | null;
          id?: string;
          lead_id: string;
          status?: string | null;
          subject: string;
          updated_at?: string | null;
        };
        Update: {
          body?: string;
          created_at?: string | null;
          id?: string;
          lead_id?: string;
          status?: string | null;
          subject?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "wws_support_tickets_lead_id_fkey";
            columns: ["lead_id"];
            isOneToOne: false;
            referencedRelation: "wws_leads";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      ao_playbook_version_meta: {
        Row: {
          changelog: string | null;
          content_hash: string | null;
          created_at: string | null;
          execution_disabled_at: string | null;
          id: string | null;
          intelligence_mode: boolean | null;
          playbook_id: string | null;
          published_at: string | null;
          risk_tier: number | null;
          status: string | null;
          version_number: number | null;
        };
        Insert: {
          changelog?: string | null;
          content_hash?: string | null;
          created_at?: string | null;
          execution_disabled_at?: string | null;
          id?: string | null;
          intelligence_mode?: boolean | null;
          playbook_id?: string | null;
          published_at?: string | null;
          risk_tier?: number | null;
          status?: string | null;
          version_number?: number | null;
        };
        Update: {
          changelog?: string | null;
          content_hash?: string | null;
          created_at?: string | null;
          execution_disabled_at?: string | null;
          id?: string | null;
          intelligence_mode?: boolean | null;
          playbook_id?: string | null;
          published_at?: string | null;
          risk_tier?: number | null;
          status?: string | null;
          version_number?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "ao_playbook_versions_playbook_id_fkey";
            columns: ["playbook_id"];
            isOneToOne: false;
            referencedRelation: "ao_playbooks";
            referencedColumns: ["id"];
          },
        ];
      };
      kb_project_members_with_profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string | null;
          email: string | null;
          full_name: string | null;
          id: string | null;
          project_id: string | null;
          role: Database["public"]["Enums"]["kb_project_member_role"] | null;
          updated_at: string | null;
          user_id: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "kb_project_members_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "kb_projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "kb_project_members_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "kb_profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      kb_stripe_user_subscriptions: {
        Row: {
          cancel_at_period_end: boolean | null;
          current_period_end: number | null;
          current_period_start: number | null;
          customer_id: string | null;
          payment_method_brand: string | null;
          payment_method_last4: string | null;
          price_id: string | null;
          subscription_id: string | null;
          subscription_status: Database["public"]["Enums"]["kb_stripe_subscription_status"] | null;
        };
        Relationships: [];
      };
      kb_user_search: {
        Row: {
          avatar_url: string | null;
          email: string | null;
          full_name: string | null;
          id: string | null;
        };
        Insert: {
          avatar_url?: never;
          email?: string | null;
          full_name?: never;
          id?: string | null;
        };
        Update: {
          avatar_url?: never;
          email?: string | null;
          full_name?: never;
          id?: string | null;
        };
        Relationships: [];
      };
      unified_content_stem: {
        Row: {
          board_domain: string | null;
          category: string | null;
          chapter: string | null;
          difficulty: string | null;
          grounding_source:
            | "approved_bank"
            | "textbook_rag"
            | "curriculum_blueprint"
            | "model_knowledge"
            | null;
          id: string | null;
          is_live: boolean | null;
          organization_id: string | null;
          redacted_payload: Json | null;
          review_status: "pending" | "approved" | "rejected" | null;
          stem: string | null;
          subject: string | null;
          type: "question" | "activity" | "card" | null;
        };
        Insert: {
          board_domain?: string | null;
          category?: string | null;
          chapter?: string | null;
          difficulty?: string | null;
          grounding_source?:
            | "approved_bank"
            | "textbook_rag"
            | "curriculum_blueprint"
            | "model_knowledge"
            | null;
          id?: string | null;
          is_live?: boolean | null;
          organization_id?: string | null;
          redacted_payload?: never;
          review_status?: "pending" | "approved" | "rejected" | null;
          stem?: string | null;
          subject?: string | null;
          type?: "question" | "activity" | "card" | null;
        };
        Update: {
          board_domain?: string | null;
          category?: string | null;
          chapter?: string | null;
          difficulty?: string | null;
          grounding_source?:
            | "approved_bank"
            | "textbook_rag"
            | "curriculum_blueprint"
            | "model_knowledge"
            | null;
          id?: string | null;
          is_live?: boolean | null;
          organization_id?: string | null;
          redacted_payload?: never;
          review_status?: "pending" | "approved" | "rejected" | null;
          stem?: string | null;
          subject?: string | null;
          type?: "question" | "activity" | "card" | null;
        };
        Relationships: [];
      };
      unified_questions: {
        Row: {
          ai_confidence_score: number | null;
          category: string | null;
          content_item_id: string | null;
          correct_answer: string | null;
          created_at: string | null;
          difficulty: string | null;
          explanation: string | null;
          failure_rate: number | null;
          grounding_source:
            | "approved_bank"
            | "textbook_rag"
            | "curriculum_blueprint"
            | "model_knowledge"
            | null;
          id: string | null;
          is_live: boolean | null;
          legacy_question_id: string | null;
          legacy_status: string | null;
          lesson_id: string | null;
          options: Json | null;
          organization_id: string | null;
          program_id: string | null;
          question_text: string | null;
          review_status: "pending" | "approved" | "rejected" | null;
          source: string | null;
          source_citation: string | null;
          source_reference: string | null;
          updated_at: string | null;
          usage_count: number | null;
          wrong_answer_explanations: Json | null;
        };
        Relationships: [];
      };
      v_admissions_funnel_90d: {
        Row: {
          appointments_booked: number | null;
          appointments_no_show: number | null;
          appointments_showed: number | null;
          crm_leads: number | null;
          eligibility_starts: number | null;
          enrollment_paid_synced: number | null;
          facebook_leads: number | null;
          ghl_appointments_booked: number | null;
          paid_orders: number | null;
        };
        Relationships: [];
      };
      v_classroom_load: {
        Row: {
          capacity: number | null;
          classroom_id: string | null;
          classroom_name: string | null;
          seats_in_use_now: number | null;
          upcoming_cohorts: number | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      _build_trusted_source_reason: {
        Args: { p_declared: string; p_lead_id: string; p_verified: string };
        Returns: string;
      };
      _find_recent_lead_for_enrollment: {
        Args: { p_program_id: string; p_user_id: string };
        Returns: string;
      };
      _verified_digital_source_from_lead: {
        Args: { p_lead_id: string };
        Returns: string;
      };
      admin_adjust_payment_plan: {
        Args: {
          p_discount_amount?: number;
          p_enrollment_id?: string;
          p_installments?: Json;
          p_interest_fee?: number;
          p_late_fee?: number;
          p_late_fee_label?: string;
          p_list_price?: number;
          p_mode?: string;
          p_note?: string;
          p_order_id: string;
          p_total_amount?: number;
        };
        Returns: Json;
      };
      admin_cancel_enrollment: {
        Args: { p_enrollment_id: string; p_reason?: string };
        Returns: Json;
      };
      admin_correct_enrollment: {
        Args: {
          p_amount_paid?: number;
          p_change_cohort?: boolean;
          p_enrollment_id: string;
          p_new_cohort_id?: string;
          p_payment_status?: string;
          p_reason?: string;
          p_total_tuition?: number;
          p_update_related_order?: boolean;
        };
        Returns: Json;
      };
      admin_delete_payment: {
        Args: { p_payment_log_id: string };
        Returns: Json;
      };
      admin_recalc_order_payments: {
        Args: { p_order_id: string };
        Returns: Json;
      };
      admin_receivables: {
        Args: {
          p_as_of_date?: string;
          p_cohort_id?: string;
          p_drift_only?: boolean;
          p_evening_after_hour?: number;
          p_lens?: string;
          p_limit?: number;
          p_offset?: number;
          p_owing_only?: boolean;
          p_program_id?: string;
          p_schedule_tag?: string;
          p_search?: string;
        };
        Returns: Json;
      };
      admin_reconcile_payment_plan: {
        Args: { p_order_id: string };
        Returns: Json;
      };
      admin_record_payment: {
        Args: {
          p_amount: number;
          p_note?: string;
          p_order_id: string;
          p_paid_at?: string;
          p_provider?: string;
          p_transaction_id?: string;
        };
        Returns: string;
      };
      admin_refund_payment: {
        Args: { p_amount: number; p_payment_log_id: string; p_reason?: string };
        Returns: string;
      };
      admin_resolve_enrollment_order: {
        Args: { p_enrollment_id: string };
        Returns: string;
      };
      admin_suspend_enrollment: {
        Args: { p_enrollment_id: string; p_reason: string; p_suspend?: boolean };
        Returns: Json;
      };
      admin_update_payment: {
        Args: {
          p_amount: number;
          p_note?: string;
          p_paid_at?: string;
          p_payment_log_id: string;
          p_transaction_id?: string;
        };
        Returns: Json;
      };
      admin_user_directory: {
        Args: {
          p_filter_appt?: string;
          p_filter_cta?: string;
          p_filter_enroll_started?: string;
          p_filter_path?: string;
          p_filter_portal?: string;
          p_filter_program?: string;
          p_limit?: number;
          p_offset?: number;
          p_role?: string;
          p_search?: string;
          p_sort_asc?: boolean;
          p_sort_field?: string;
          p_status?: string;
          p_tab?: string;
        };
        Returns: Json;
      };
      admin_user_directory_counts: { Args: never; Returns: Json };
      agentops_ensure_default_org: {
        Args: { p_app_user_id: string; p_secret: string };
        Returns: {
          clerk_org_id: string | null;
          created_at: string | null;
          id: string;
          logo_url: string | null;
          max_clients: number;
          name: string;
          oneid_org_id: string | null;
          owner_id: string | null;
          platform_flags: Json | null;
          primary_color: string | null;
          school_name: string | null;
          slug: string | null;
          status: string;
          subscription_tier: string;
          support_email: string | null;
          timezone: string;
          updated_at: string;
        };
        SetofOptions: {
          from: "*";
          to: "organizations";
          isOneToOne: true;
          isSetofReturn: false;
        };
      };
      agentops_get_chat_by_id:
        | {
            Args: {
              p_auth_user_id: string;
              p_chat_id: string;
              p_secret: string;
            };
            Returns: {
              created_at: string;
              id: string;
              organization_id: string;
              title: string | null;
              updated_at: string;
              user_id: string | null;
              visibility: string;
            };
            SetofOptions: {
              from: "*";
              to: "chat_threads";
              isOneToOne: true;
              isSetofReturn: false;
            };
          }
        | {
            Args: {
              p_chat_id: string;
              p_clerk_user_id: string;
              p_secret: string;
            };
            Returns: {
              created_at: string;
              id: string;
              organization_id: string;
              title: string | null;
              updated_at: string;
              user_id: string | null;
              visibility: string;
            };
            SetofOptions: {
              from: "*";
              to: "chat_threads";
              isOneToOne: true;
              isSetofReturn: false;
            };
          };
      agentops_get_chats_by_user: {
        Args: {
          p_app_user_id: string;
          p_organization_id: string;
          p_secret: string;
        };
        Returns: {
          created_at: string;
          id: string;
          organization_id: string;
          title: string | null;
          updated_at: string;
          user_id: string | null;
          visibility: string;
        }[];
        SetofOptions: {
          from: "*";
          to: "chat_threads";
          isOneToOne: false;
          isSetofReturn: true;
        };
      };
      agentops_get_messages_by_chat:
        | {
            Args: {
              p_auth_user_id: string;
              p_chat_id: string;
              p_secret: string;
            };
            Returns: {
              attachments: Json;
              content: string | null;
              created_at: string;
              id: string;
              metadata: Json;
              organization_id: string;
              parts: Json;
              role: string;
              thread_id: string;
              user_id: string | null;
            }[];
            SetofOptions: {
              from: "*";
              to: "chat_messages";
              isOneToOne: false;
              isSetofReturn: true;
            };
          }
        | {
            Args: {
              p_chat_id: string;
              p_clerk_user_id: string;
              p_secret: string;
            };
            Returns: {
              attachments: Json;
              content: string | null;
              created_at: string;
              id: string;
              metadata: Json;
              organization_id: string;
              parts: Json;
              role: string;
              thread_id: string;
              user_id: string | null;
            }[];
            SetofOptions: {
              from: "*";
              to: "chat_messages";
              isOneToOne: false;
              isSetofReturn: true;
            };
          };
      agentops_get_org_if_member: {
        Args: {
          p_app_user_id: string;
          p_is_master_admin: boolean;
          p_org_id: string;
          p_secret: string;
        };
        Returns: {
          clerk_org_id: string | null;
          created_at: string | null;
          id: string;
          logo_url: string | null;
          max_clients: number;
          name: string;
          oneid_org_id: string | null;
          owner_id: string | null;
          platform_flags: Json | null;
          primary_color: string | null;
          school_name: string | null;
          slug: string | null;
          status: string;
          subscription_tier: string;
          support_email: string | null;
          timezone: string;
          updated_at: string;
        };
        SetofOptions: {
          from: "*";
          to: "organizations";
          isOneToOne: true;
          isSetofReturn: false;
        };
      };
      agentops_persist_secret_ok: {
        Args: { p_secret: string };
        Returns: boolean;
      };
      agentops_save_chat: {
        Args: {
          p_app_user_id: string;
          p_id: string;
          p_organization_id: string;
          p_secret: string;
          p_title: string;
        };
        Returns: undefined;
      };
      agentops_save_messages: {
        Args: {
          p_app_user_id: string;
          p_messages: Json;
          p_organization_id: string;
          p_secret: string;
        };
        Returns: undefined;
      };
      agentops_sync_clerk_org: {
        Args: {
          p_app_user_id: string;
          p_clerk_org_id: string;
          p_clerk_org_name: string;
          p_clerk_role: string;
          p_clerk_user_id: string;
          p_secret: string;
        };
        Returns: {
          clerk_org_id: string | null;
          created_at: string | null;
          id: string;
          logo_url: string | null;
          max_clients: number;
          name: string;
          oneid_org_id: string | null;
          owner_id: string | null;
          platform_flags: Json | null;
          primary_color: string | null;
          school_name: string | null;
          slug: string | null;
          status: string;
          subscription_tier: string;
          support_email: string | null;
          timezone: string;
          updated_at: string;
        };
        SetofOptions: {
          from: "*";
          to: "organizations";
          isOneToOne: true;
          isSetofReturn: false;
        };
      };
      agentops_upsert_app_user:
        | {
            Args: {
              p_auth_user_id: string;
              p_avatar_url?: string;
              p_email: string;
              p_full_name?: string;
              p_secret: string;
            };
            Returns: {
              avatar_url: string | null;
              clerk_user_id: string | null;
              created_at: string;
              email: string;
              full_name: string | null;
              id: string;
              is_master_admin: boolean;
              role: string;
              updated_at: string;
            };
            SetofOptions: {
              from: "*";
              to: "app_users";
              isOneToOne: true;
              isSetofReturn: false;
            };
          }
        | {
            Args: {
              p_avatar_url: string;
              p_clerk_user_id: string;
              p_email: string;
              p_full_name: string;
              p_secret: string;
            };
            Returns: {
              avatar_url: string | null;
              clerk_user_id: string | null;
              created_at: string;
              email: string;
              full_name: string | null;
              id: string;
              is_master_admin: boolean;
              role: string;
              updated_at: string;
            };
            SetofOptions: {
              from: "*";
              to: "app_users";
              isOneToOne: true;
              isSetofReturn: false;
            };
          };
      ao_add_credit_grant: {
        Args: {
          _amount: number;
          _bucket: Database["public"]["Enums"]["ao_credit_bucket"];
          _expires_at: string;
          _grant_day?: string;
          _idempotency_key?: string;
          _note: string;
          _org: string;
          _reason?: Database["public"]["Enums"]["ao_ledger_reason"];
        };
        Returns: string;
      };
      ao_auth_user_is_clerk_import: {
        Args: { p_user_id: string };
        Returns: boolean;
      };
      ao_auth_user_is_dormant_identity: {
        Args: {
          p_email: string;
          p_is_anonymous: boolean;
          p_last_sign_in_at: string;
          p_raw_user_meta_data: Json;
          p_user_id: string;
        };
        Returns: boolean;
      };
      ao_auth_user_is_guest: {
        Args: {
          p_email: string;
          p_is_anonymous: boolean;
          p_raw_user_meta_data: Json;
        };
        Returns: boolean;
      };
      ao_auth_user_is_oweb_activated: {
        Args: { p_user_id: string };
        Returns: boolean;
      };
      ao_can_access_integration: {
        Args: { _integration_id: string; _user_id: string };
        Returns: boolean;
      };
      ao_can_access_thread: {
        Args: { _thread_id: string; _user_id: string };
        Returns: boolean;
      };
      ao_can_access_view: {
        Args: { _user_id: string; _view_id: string };
        Returns: boolean;
      };
      ao_can_admin_org: {
        Args: { _org: string; _user: string };
        Returns: boolean;
      };
      ao_can_manage_intel_project_members: {
        Args: { _project_id: string; _user_id: string };
        Returns: boolean;
      };
      ao_can_manage_thread_participants: {
        Args: { _thread_id: string; _user_id: string };
        Returns: boolean;
      };
      ao_can_manage_view: {
        Args: { _user_id: string; _view_id: string };
        Returns: boolean;
      };
      ao_complete_workspace_transfer: {
        Args: { _actor: string; _transfer_id: string };
        Returns: {
          accepted_at: string | null;
          cancelled_at: string | null;
          completed_at: string | null;
          created_at: string;
          expires_at: string;
          from_user_id: string;
          id: string;
          initiated_at: string;
          metadata: Json;
          org_id: string;
          previous_owner_disposition: string;
          status: string;
          to_user_id: string;
          token: string;
          updated_at: string;
        };
        SetofOptions: {
          from: "*";
          to: "ao_workspace_transfers";
          isOneToOne: true;
          isSetofReturn: false;
        };
      };
      ao_consume_credits: {
        Args: { _amount: number; _org: string; _ref: string };
        Returns: number;
      };
      ao_count_free_owned_workspaces: {
        Args: { _uid: string };
        Returns: number;
      };
      ao_create_org: {
        Args: { _name: string; _plan?: string; _slug: string };
        Returns: {
          credits_balance: number;
          id: string;
          name: string;
          plan: string;
          slug: string;
        }[];
      };
      ao_debit_credits_v2: {
        Args: {
          _amount: number;
          _idempotency_key?: string;
          _metadata?: Json;
          _note?: string;
          _org: string;
          _reason: Database["public"]["Enums"]["ao_ledger_reason"];
          _resource_type?: string;
          _source_app?: string;
        };
        Returns: number;
      };
      ao_dec_api_key: {
        Args: { _cipher: string; _secret: string };
        Returns: string;
      };
      ao_dedupe_org_specialist_agents: {
        Args: { p_org_id: string };
        Returns: number;
      };
      ao_enc_api_key: {
        Args: { _plain: string; _secret: string };
        Returns: string;
      };
      ao_ensure_personal_workspace:
        | { Args: { _display_name?: string; _uid: string }; Returns: string }
        | {
            Args: {
              _display_name?: string;
              _provisional_guest?: boolean;
              _uid: string;
            };
            Returns: string;
          };
      ao_expire_credit_grants: { Args: never; Returns: number };
      ao_expire_stale_reservations: { Args: never; Returns: number };
      ao_finalize_reservation: {
        Args: {
          _final_amount: number;
          _reservation: string;
          _usage_event_id?: string;
        };
        Returns: number;
      };
      ao_grant_credits: {
        Args: { _actor: string; _amount: number; _note: string; _org: string };
        Returns: number;
      };
      ao_grant_daily_credits_for_org: {
        Args: { _org: string };
        Returns: boolean;
      };
      ao_has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"];
          _user_id: string;
        };
        Returns: boolean;
      };
      ao_increment_counter_v1: {
        Args: {
          _actor_id?: string;
          _counter_definition_id: string;
          _delta: number;
          _idempotency_key: string;
          _metadata?: Json;
          _org_id: string;
          _period_key: string;
          _source_id?: string;
          _source_type?: string;
          _subject_id: string;
          _subject_kind: string;
        };
        Returns: {
          applied: boolean;
          event_id: string;
          value_after: number;
        }[];
      };
      ao_is_integration_grantee: {
        Args: { _integration_id: string; _user_id: string };
        Returns: boolean;
      };
      ao_is_intel_project_member: {
        Args: { _project_id: string; _user_id: string };
        Returns: boolean;
      };
      ao_is_org_member: {
        Args: { _org: string; _user: string };
        Returns: boolean;
      };
      ao_is_thread_participant: {
        Args: { _thread_id: string; _user_id: string };
        Returns: boolean;
      };
      ao_leaderboard_v1: {
        Args: {
          _counter_key: string;
          _limit?: number;
          _org_id: string;
          _period_key?: string;
        };
        Returns: {
          display_name: string;
          rank: number;
          subject_id: string;
          subject_kind: string;
          value: number;
        }[];
      };
      ao_org_is_provisional_customer_workspace:
        | { Args: { p_name?: string; p_slug: string }; Returns: boolean }
        | {
            Args: {
              p_name?: string;
              p_provisional_guest?: boolean;
              p_slug: string;
            };
            Returns: boolean;
          };
      ao_org_role: {
        Args: { _org: string; _user: string };
        Returns: Database["public"]["Enums"]["ao_org_role"];
      };
      ao_owns_integration: {
        Args: { _integration_id: string; _user_id: string };
        Returns: boolean;
      };
      ao_platform_distinct_member_count: {
        Args: { p_exclude_org_id: string };
        Returns: number;
      };
      ao_platform_registered_user_stats: { Args: never; Returns: Json };
      ao_platform_search_registered_users: {
        Args: { p_limit?: number; p_query?: string };
        Returns: {
          created_at: string;
          email: string;
          id: string;
          last_sign_in_at: string;
          raw_user_meta_data: Json;
        }[];
      };
      ao_release_reservation: {
        Args: { _reservation: string };
        Returns: undefined;
      };
      ao_reserve_credits: {
        Args: {
          _amount: number;
          _correlation_id?: string;
          _expires_at: string;
          _idempotency_key?: string;
          _org: string;
          _reason?: string;
          _user_id?: string;
        };
        Returns: string;
      };
      ao_search_github_code_chunks: {
        Args: {
          p_branch: string;
          p_limit?: number;
          p_query: string;
          p_repo_full_name: string;
          p_thread_id: string;
        };
        Returns: {
          built_at: string;
          end_line: number;
          file: string;
          head_sha: string;
          rank: number;
          snippet: string;
          start_line: number;
          token_vector: Json;
        }[];
      };
      ao_sync_org_credit_balance: { Args: { _org: string }; Returns: number };
      ao_sync_super_admins_to_platform_workspace: {
        Args: never;
        Returns: number;
      };
      ao_upsert_app_activation: {
        Args: {
          p_activation_kind?: string;
          p_app_id: string;
          p_user_id: string;
        };
        Returns: undefined;
      };
      ao_workspace_owner_count: { Args: { _org: string }; Returns: number };
      apply_admin_bundle_schedule: {
        Args: {
          p_component_cohorts?: Json;
          p_issue_reserve_key?: boolean;
          p_parent_enrollment_id: string;
          p_practice_cohorts?: Json;
        };
        Returns: Json;
      };
      apply_clerk_import_links: { Args: never; Returns: number };
      apply_invoice_payment: {
        Args: {
          p_amount: number;
          p_invoice_id: string;
          p_payment_log_id?: string;
          p_provider?: string;
          p_provider_transaction_id?: string;
        };
        Returns: {
          amount_due: number | null;
          amount_paid: number;
          amount_total: number;
          created_at: string;
          created_by: string | null;
          currency: string;
          description: string | null;
          due_date: string | null;
          id: string;
          invoice_number: string;
          issued_at: string | null;
          line_items: Json;
          metadata: Json;
          notes: string | null;
          order_id: string | null;
          organization_id: string | null;
          paid_at: string | null;
          public_token: string;
          recipient_email: string | null;
          recipient_name: string | null;
          sent_at: string | null;
          status: string;
          store_purchase_id: string | null;
          title: string;
          updated_at: string;
          user_id: string | null;
          voided_at: string | null;
        };
        SetofOptions: {
          from: "*";
          to: "invoices";
          isOneToOne: true;
          isSetofReturn: false;
        };
      };
      apply_order_contract_total: {
        Args: { p_order_id: string };
        Returns: Json;
      };
      apply_order_financial_adjustments: {
        Args: {
          p_discount_amount?: number;
          p_enrollment_id?: string;
          p_interest_fee?: number;
          p_late_fee?: number;
          p_late_fee_label?: string;
          p_list_price?: number;
          p_note?: string;
          p_order_id: string;
          p_total_amount?: number;
        };
        Returns: Json;
      };
      approve_command_action: { Args: { p_action_id: string }; Returns: Json };
      auto_archive_inactive_leads: { Args: never; Returns: undefined };
      bootstrap_master_admin: { Args: { p_email?: string }; Returns: undefined };
      build_template_snapshot: {
        Args: { p_template_id: string };
        Returns: Json;
      };
      cancel_generation_job: { Args: { p_job_id: string }; Returns: string };
      cancel_off_cycle_weekend_cohorts: { Args: never; Returns: number };
      cf_has_role: {
        Args: {
          _role: Database["public"]["Enums"]["cf_app_role"];
          _user_id: string;
        };
        Returns: boolean;
      };
      check_enrollment_expiry: { Args: never; Returns: undefined };
      check_import_history_token: {
        Args: { p_token: string };
        Returns: boolean;
      };
      claim_browser_relay_requests: {
        Args: { p_limit?: number; p_org_id: string; p_user_id: string };
        Returns: {
          action: string;
          created_at: string;
          error_message: string | null;
          expires_at: string;
          id: string;
          org_id: string;
          payload: Json;
          result: Json | null;
          status: string;
          updated_at: string;
          user_id: string;
        }[];
        SetofOptions: {
          from: "*";
          to: "ao_browser_relay_requests";
          isOneToOne: false;
          isSetofReturn: true;
        };
      };
      claim_generation_job: { Args: { p_job_id: string }; Returns: Json };
      claim_next_generation_job: {
        Args: { p_organization_id?: string };
        Returns: Json;
      };
      classroom_conflicts: {
        Args: {
          p_classroom_id: string;
          p_duration_hours?: number;
          p_end_date: string;
          p_exclude_cohort_id?: string;
          p_start_date: string;
          p_start_time: string;
        };
        Returns: {
          cohort_id: string;
          duration_hours: number;
          end_date: string;
          enrolled_count: number;
          event_time: string;
          max_seats: number;
          program_name: string;
          start_date: string;
        }[];
      };
      clawdeploy_create_instance: {
        Args: {
          p_fly_app_name: string;
          p_idempotency_key?: string;
          p_image: string;
          p_org_id: string;
          p_region: string;
          p_subscription_id?: string;
          p_user_id: string;
        };
        Returns: Json;
      };
      clawdeploy_delete_channel: {
        Args: { p_channel_id: string; p_org_id: string };
        Returns: boolean;
      };
      clawdeploy_delete_connector: {
        Args: { p_connector_id: string; p_org_id: string };
        Returns: boolean;
      };
      clawdeploy_get_instance_config_bundle: {
        Args: { p_instance_id: string; p_org_id: string };
        Returns: Json;
      };
      clawdeploy_get_instance_runtime: {
        Args: { p_instance_id: string; p_org_id: string };
        Returns: Json;
      };
      clawdeploy_get_org_id_by_clerk: {
        Args: { p_clerk_org_id: string };
        Returns: string;
      };
      clawdeploy_get_stripe_customer_id: {
        Args: { p_org_id: string };
        Returns: string;
      };
      clawdeploy_get_subscription: { Args: { p_org_id: string }; Returns: Json };
      clawdeploy_get_user_org_id: {
        Args: { p_user_id: string };
        Returns: string;
      };
      clawdeploy_list_active_instances: {
        Args: { p_org_id: string };
        Returns: Json;
      };
      clawdeploy_list_channels: { Args: { p_org_id: string }; Returns: Json };
      clawdeploy_list_connectors: { Args: { p_org_id: string }; Returns: Json };
      clawdeploy_list_events: {
        Args: { p_instance_id?: string; p_limit?: number; p_org_id: string };
        Returns: Json;
      };
      clawdeploy_list_instances: { Args: { p_org_id: string }; Returns: Json };
      clawdeploy_list_instances_for_stripe_subscription: {
        Args: { p_stripe_subscription_id: string };
        Returns: Json;
      };
      clawdeploy_mark_instance_deployed: {
        Args: {
          p_fly_machine_id: string;
          p_fly_volume_id?: string;
          p_instance_id: string;
          p_metadata?: Json;
          p_org_id: string;
          p_status: string;
          p_token_hash?: string;
          p_url?: string;
        };
        Returns: Json;
      };
      clawdeploy_mark_subscription_instances_destroyed: {
        Args: { p_metadata?: Json; p_stripe_subscription_id: string };
        Returns: Json;
      };
      clawdeploy_provision_org_for_checkout: {
        Args: {
          p_cancel_at_period_end: boolean;
          p_current_period_end: string;
          p_idempotency_key: string;
          p_plan_tier: string;
          p_status: string;
          p_stripe_customer_id: string;
          p_stripe_price_id: string;
          p_stripe_subscription_id: string;
          p_user_email: string;
          p_user_id: string;
        };
        Returns: string;
      };
      clawdeploy_set_instance_secrets: {
        Args: {
          p_api_keys?: Json;
          p_gateway_token: string;
          p_instance_id: string;
          p_mcp_url?: string;
          p_org_id: string;
        };
        Returns: boolean;
      };
      clawdeploy_set_instance_status: {
        Args: { p_instance_id: string; p_org_id: string; p_status: string };
        Returns: boolean;
      };
      clawdeploy_sync_subscription_from_stripe: {
        Args: {
          p_cancel_at_period_end?: boolean;
          p_current_period_end?: string;
          p_plan_tier?: string;
          p_status: string;
          p_stripe_price_id?: string;
          p_stripe_subscription_id: string;
        };
        Returns: Json;
      };
      clawdeploy_update_instance_api_keys: {
        Args: { p_api_keys: Json; p_instance_id: string; p_org_id: string };
        Returns: boolean;
      };
      clawdeploy_upsert_channel: {
        Args: {
          p_config?: Json;
          p_instance_id: string;
          p_kind: string;
          p_org_id: string;
        };
        Returns: boolean;
      };
      clawdeploy_upsert_clerk_org_member: {
        Args: {
          p_clerk_org_id: string;
          p_clerk_user_id: string;
          p_organization_id: string;
          p_role: string;
          p_user_id: string;
        };
        Returns: undefined;
      };
      clawdeploy_upsert_clerk_organization: {
        Args: {
          p_clerk_org_id: string;
          p_name: string;
          p_owner_profile_id: string;
          p_slug: string;
        };
        Returns: {
          clerk_org_id: string | null;
          created_at: string | null;
          id: string;
          logo_url: string | null;
          max_clients: number;
          name: string;
          oneid_org_id: string | null;
          owner_id: string | null;
          platform_flags: Json | null;
          primary_color: string | null;
          school_name: string | null;
          slug: string | null;
          status: string;
          subscription_tier: string;
          support_email: string | null;
          timezone: string;
          updated_at: string;
        };
        SetofOptions: {
          from: "*";
          to: "organizations";
          isOneToOne: true;
          isSetofReturn: false;
        };
      };
      clawdeploy_upsert_clerk_profile: {
        Args: {
          p_avatar_url: string;
          p_clerk_user_id: string;
          p_display_name: string;
          p_email: string;
          p_first_name: string;
          p_last_name: string;
        };
        Returns: {
          address: string | null;
          alt_emails: string[];
          alt_phones: string[];
          arc_level: number;
          avatar_url: string | null;
          bio: string | null;
          city: string | null;
          clerk_user_id: string | null;
          created_at: string;
          display_name: string | null;
          email: string | null;
          emergency_contact_name: string | null;
          emergency_contact_phone: string | null;
          external_contact_ids: Json;
          first_name: string | null;
          handle: string | null;
          id: string;
          is_active: boolean;
          is_searchable: boolean;
          last_activity_at: string;
          last_name: string | null;
          oneaccess_email: string | null;
          oneaccess_tier: string;
          oneid_subject: string | null;
          phone: string | null;
          platform_flags: Json | null;
          sc_balance: number;
          square_customer_id: string | null;
          state: string | null;
          tier_expires_at: string | null;
          updated_at: string;
          user_id: string;
          user_status: Database["public"]["Enums"]["user_lifecycle_status"];
          username: string | null;
          zip: string | null;
        };
        SetofOptions: {
          from: "*";
          to: "profiles";
          isOneToOne: true;
          isSetofReturn: false;
        };
      };
      clawdeploy_upsert_connector: {
        Args: {
          p_account_handle?: string;
          p_instance_id: string;
          p_kind: string;
          p_label: string;
          p_org_id: string;
        };
        Returns: boolean;
      };
      clerk_internal_org_id: { Args: never; Returns: string };
      clerk_internal_user_id: { Args: never; Returns: string };
      clerk_org_id_from_jwt: { Args: never; Returns: string };
      clerk_user_id: { Args: never; Returns: string };
      clerk_user_id_from_jwt: { Args: never; Returns: string };
      cna_exam_prep_target_template: {
        Args: { p_schedule_template_id: string; p_variation_id: string };
        Returns: string;
      };
      cohort_roster_financials: {
        Args: { p_as_of_date?: string; p_cohort_id: string };
        Returns: Json;
      };
      compute_order_contract_total: {
        Args: { p_order_id: string };
        Returns: number;
      };
      compute_schedule_tag: {
        Args: { p_event_time: string; p_start_date: string };
        Returns: string;
      };
      create_cohort_with_sessions: {
        Args: {
          p_ghl_event_id?: string;
          p_max_seats?: number;
          p_program_id: string;
          p_schedule_template_id: string;
          p_start_date: string;
        };
        Returns: string;
      };
      create_content_item: {
        Args: {
          p_category?: string;
          p_difficulty?: string;
          p_organization_id: string;
          p_payload: Json;
          p_stem: string;
          p_subject?: string;
          p_type: "question" | "activity" | "card";
        };
        Returns: string;
      };
      create_manual_question: {
        Args: {
          p_category?: string;
          p_correct_answer: string;
          p_difficulty?: string;
          p_explanation?: string;
          p_lesson_id?: string;
          p_options: Json;
          p_organization_id: string;
          p_program_id?: string;
          p_question_text: string;
          p_status?: string;
          p_wrong_answer_explanations?: Json;
        };
        Returns: string;
      };
      credit_flow_enrollment: {
        Args: {
          p_auth_user_id: string;
          p_channel?: string;
          p_enrollment_id: string;
          p_order_id?: string;
          p_program_id: string;
        };
        Returns: string;
      };
      current_app_user_id: { Args: never; Returns: string };
      current_organization_id: { Args: never; Returns: string };
      current_user_has_role: {
        Args: { _role: Database["public"]["Enums"]["app_role"] };
        Returns: boolean;
      };
      day_name_to_dow: { Args: { day_name: string }; Returns: number };
      delete_cohort_cascade: {
        Args: { p_cohort_id: string };
        Returns: undefined;
      };
      delete_cohort_sessions: { Args: { p_cohort_id: string }; Returns: number };
      dow_int_to_text: { Args: { dow: number }; Returns: string };
      enqueue_generation_job: {
        Args: {
          p_input?: Json;
          p_kind: string;
          p_organization_id: string;
          p_program_id?: string;
          p_source_ids?: string[];
        };
        Returns: string;
      };
      enqueue_salesflow_invoice_sync: {
        Args: { p_order_id: string };
        Returns: string;
      };
      enqueue_sync_event: {
        Args: {
          p_entity_id: string;
          p_entity_type: string;
          p_event_type: string;
          p_organization_id: string;
          p_payload: Json;
          p_user_id: string;
        };
        Returns: number;
      };
      ensure_program_space: {
        Args: { p_program_id: string; p_user_id: string };
        Returns: undefined;
      };
      execute_command_action: { Args: { p_action_id: string }; Returns: Json };
      expire_old_enrollment_keys: { Args: never; Returns: number };
      extend_enrollment_key: {
        Args: { p_extra_days?: number; p_key_id: string };
        Returns: undefined;
      };
      fetch_study_flashcards: {
        Args: { p_organization_id: string };
        Returns: {
          back: string;
          category: string;
          chapter: string;
          front: string;
          id: string;
          subject: string;
        }[];
      };
      find_active_order: {
        Args: { p_program_id: string; p_user_id: string };
        Returns: string;
      };
      find_duplicate_payment: {
        Args: { p_amount: number; p_email: string; p_paid_at: string };
        Returns: string;
      };
      find_profile_by_contact: {
        Args: { p_email: string; p_phone?: string };
        Returns: {
          email: string;
          profile_id: string;
          user_id: string;
        }[];
      };
      fulfill_store_purchase_on_payment: {
        Args: { p_purchase_id: string };
        Returns: Json;
      };
      generate_cohort_sessions: {
        Args: { p_cohort_id: string; p_force?: boolean };
        Returns: undefined;
      };
      generate_cohort_sessions_internal: {
        Args: { p_cohort_id: string };
        Returns: undefined;
      };
      generate_cohorts_for_template:
        | {
            Args: {
              p_count?: number;
              p_end_date?: string;
              p_max_seats?: number;
              p_program_id: string;
              p_schedule_template_id: string;
              p_start_date: string;
            };
            Returns: Json;
          }
        | {
            Args: {
              p_count?: number;
              p_end_date?: string;
              p_interval_weeks?: number;
              p_max_seats?: number;
              p_program_id: string;
              p_schedule_template_id: string;
              p_start_date: string;
            };
            Returns: Json;
          };
      generate_enrollment_key_code: {
        Args: { p_program_id: string };
        Returns: string;
      };
      generate_sessions: {
        Args: {
          p_curriculum_hours: number;
          p_excluded_dates: string[];
          p_start_date: string;
          p_template_snapshot: Json;
        };
        Returns: {
          duration_hours: number;
          session_date: string;
          session_number: number;
          session_start_time: string;
          session_type: string;
        }[];
      };
      get_admin_submissions: {
        Args: {
          _flow_id?: string;
          _from?: string;
          _kinds?: string[];
          _limit?: number;
          _offset?: number;
          _program_id?: string;
          _search?: string;
          _source?: string;
          _status?: string;
          _to?: string;
        };
        Returns: {
          attribution: Json;
          created_at: string;
          email: string;
          flow_id: string;
          flow_name: string;
          id: string;
          is_complete: boolean;
          kind: string;
          kind_label: string;
          last_step_index: number;
          metadata: Json;
          name: string;
          outcome: string;
          phone: string;
          program_id: string;
          program_name: string;
          ref_id: string;
          source: string;
          status: string;
          total_count: number;
          total_steps: number;
          user_id: string;
          utm_campaign: string;
          utm_source: string;
        }[];
      };
      get_all_flow_funnel_summaries: {
        Args: { p_days?: number };
        Returns: {
          appointments_booked: number;
          enrolled: number;
          entries: number;
          flow_id: string;
        }[];
      };
      get_attribution_quality: {
        Args: { p_days?: number };
        Returns: {
          cash_matched: number;
          cash_total: number;
          conflicts: number;
          known_count: number;
          known_pct: number;
          revenue_matched_pct: number;
          total: number;
          unknown_count: number;
          unknown_pct: number;
        }[];
      };
      get_backpack_public_status: { Args: never; Returns: Json };
      get_backpack_registration_by_code: {
        Args: { _code: string };
        Returns: Json;
      };
      get_flow_funnel_metrics: {
        Args: { p_days?: number; p_flow_id: string };
        Returns: Json;
      };
      get_invoice_by_token: {
        Args: { p_token: string };
        Returns: {
          amount_due: number;
          amount_paid: number;
          amount_total: number;
          created_at: string;
          currency: string;
          description: string;
          due_date: string;
          id: string;
          invoice_number: string;
          issued_at: string;
          line_items: Json;
          order_id: string;
          recipient_email: string;
          recipient_name: string;
          status: string;
          store_purchase_id: string;
          title: string;
          user_id: string;
        }[];
      };
      get_kiosk_room_id: { Args: { _user_id: string }; Returns: string };
      get_live_display_item: {
        Args: { p_item_id?: string; p_session_id: string };
        Returns: {
          id: string;
          redacted_payload: Json;
          revealed: boolean;
          stem: string;
          type: "question" | "activity" | "card";
        }[];
      };
      get_or_create_dm: { Args: { other_user_id: string }; Returns: string };
      get_payment_attribution: {
        Args: { p_payment_log_id: string };
        Returns: Json;
      };
      get_revenue_by_trusted_source: {
        Args: { p_days?: number };
        Returns: {
          cash_collected: number;
          enrollments: number;
          revenue: number;
          source: string;
        }[];
      };
      get_salesflow_dashboard: { Args: { p_days?: number }; Returns: Json };
      get_student_journey: {
        Args: { p_user_id: string };
        Returns: {
          kind: string;
          label: string;
          meta: Json;
          ref_id: string;
          ts: string;
        }[];
      };
      get_student_sources: {
        Args: { p_user_id: string };
        Returns: {
          conflict: boolean;
          declared_source: string;
          enrollment_id: string;
          program_id: string;
          resolver_reason: string;
          trusted_source: string;
          verified_digital_source: string;
        }[];
      };
      get_unread_counts: {
        Args: { p_user_id: string };
        Returns: {
          conversation_id: string;
          unread_count: number;
        }[];
      };
      get_user_org_id: { Args: { _user_id: string }; Returns: string };
      get_weekly_attribution_report: {
        Args: { p_days?: number };
        Returns: Json;
      };
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"];
          _user_id: string;
        };
        Returns: boolean;
      };
      ig_can_view_profile: {
        Args: { target: string; viewer: string };
        Returns: boolean;
      };
      ig_check_rate_limit: {
        Args: {
          p_action: string;
          p_max: number;
          p_user_id: string;
          p_window_seconds?: number;
        };
        Returns: boolean;
      };
      ig_increment_view: { Args: { _post_id: string }; Returns: undefined };
      ig_is_blocked: {
        Args: { author: string; viewer: string };
        Returns: boolean;
      };
      ig_mixer_complete_conversation: {
        Args: { p_request_id: string; p_user_id: string };
        Returns: {
          completed_at: string | null;
          created_at: string;
          from_user_id: string;
          id: string;
          listening_policy: string;
          livekit_room_name: string | null;
          mixer_id: string;
          status: string;
          to_user_id: string;
          updated_at: string;
        };
        SetofOptions: {
          from: "*";
          to: "ig_mixer_conversation_requests";
          isOneToOne: true;
          isSetofReturn: false;
        };
      };
      ig_mixer_create: {
        Args: {
          p_capacity?: number;
          p_description?: string;
          p_host_id: string;
          p_starts_at?: string;
          p_title: string;
        };
        Returns: {
          capacity: number | null;
          cover_url: string | null;
          created_at: string;
          description: string | null;
          ends_at: string | null;
          host_id: string;
          id: string;
          livekit_stage_room: string;
          mixer_type: string;
          starts_at: string | null;
          status: string;
          title: string;
          updated_at: string;
          visibility: string;
        };
        SetofOptions: {
          from: "*";
          to: "ig_mixers";
          isOneToOne: true;
          isSetofReturn: false;
        };
      };
      ig_mixer_join: {
        Args: { p_mixer_id: string; p_user_id: string };
        Returns: {
          floor_status: string;
          id: string;
          joined_at: string;
          left_at: string | null;
          mixer_id: string;
          role: string;
          updated_at: string;
          user_id: string;
        };
        SetofOptions: {
          from: "*";
          to: "ig_mixer_attendees";
          isOneToOne: true;
          isSetofReturn: false;
        };
      };
      ig_mixer_request_conversation: {
        Args: {
          p_from_user_id: string;
          p_mixer_id: string;
          p_to_user_id: string;
        };
        Returns: {
          completed_at: string | null;
          created_at: string;
          from_user_id: string;
          id: string;
          listening_policy: string;
          livekit_room_name: string | null;
          mixer_id: string;
          status: string;
          to_user_id: string;
          updated_at: string;
        };
        SetofOptions: {
          from: "*";
          to: "ig_mixer_conversation_requests";
          isOneToOne: true;
          isSetofReturn: false;
        };
      };
      ig_mixer_respond_conversation: {
        Args: { p_accept: boolean; p_request_id: string; p_user_id: string };
        Returns: {
          completed_at: string | null;
          created_at: string;
          from_user_id: string;
          id: string;
          listening_policy: string;
          livekit_room_name: string | null;
          mixer_id: string;
          status: string;
          to_user_id: string;
          updated_at: string;
        };
        SetofOptions: {
          from: "*";
          to: "ig_mixer_conversation_requests";
          isOneToOne: true;
          isSetofReturn: false;
        };
      };
      ig_mixer_submit_feedback: {
        Args: {
          p_conversation_id: string;
          p_user_id: string;
          p_would_talk_again: boolean;
        };
        Returns: {
          conversation_id: string;
          created_at: string;
          from_user_id: string;
          id: string;
          to_user_id: string;
          would_talk_again: boolean;
        };
        SetofOptions: {
          from: "*";
          to: "ig_mixer_feedback";
          isOneToOne: true;
          isSetofReturn: false;
        };
      };
      ig_notify: {
        Args: {
          _actor: string;
          _kind: string;
          _post: string;
          _recipient: string;
        };
        Returns: undefined;
      };
      ig_search_posts: {
        Args: { _limit?: number; _q: string };
        Returns: {
          caption: string | null;
          created_at: string;
          edit_count: number;
          edited_at: string | null;
          id: string;
          image_path: string | null;
          is_pinned: boolean;
          media_paths: string[];
          parent_id: string | null;
          quoted_post_id: string | null;
          reply_policy: string;
          scheduled_at: string | null;
          updated_at: string;
          user_id: string;
          view_count: number;
        }[];
        SetofOptions: {
          from: "*";
          to: "ig_posts";
          isOneToOne: false;
          isSetofReturn: true;
        };
      };
      ig_trending: {
        Args: { _limit?: number };
        Returns: {
          post_count: number;
          tag: string;
        }[];
      };
      import_square_payments_page: {
        Args: {
          p_begin_time: string;
          p_cursor?: string;
          p_end_time?: string;
          p_limit?: number;
        };
        Returns: Json;
      };
      inbox_is_contact: { Args: { p_org_id: string }; Returns: boolean };
      inbox_is_workspace_agent: { Args: { p_org_id: string }; Returns: boolean };
      integration_disconnect: {
        Args: { p_integration_id: string };
        Returns: undefined;
      };
      integration_get_api_key: {
        Args: { p_integration_id: string };
        Returns: string;
      };
      integration_get_api_token: {
        Args: { p_integration_id: string };
        Returns: string;
      };
      integration_has_credentials: {
        Args: { p_integration_id: string };
        Returns: Json;
      };
      integration_set_api_key: {
        Args: { p_api_key: string; p_integration_id: string };
        Returns: undefined;
      };
      integration_set_api_token: {
        Args: { p_integration_id: string; p_token: string };
        Returns: undefined;
      };
      integration_set_api_token_service: {
        Args: { p_integration_id: string; p_token: string };
        Returns: undefined;
      };
      invoke_reconcile_schedules: { Args: never; Returns: undefined };
      is_admin: { Args: never; Returns: boolean };
      is_clerk_org_member: {
        Args: { p_clerk_org_id?: string };
        Returns: boolean;
      };
      is_org_member:
        | { Args: { _org_id: string; _user_id: string }; Returns: boolean }
        | { Args: { org_id: string }; Returns: boolean };
      issue_enrollment_key: {
        Args: {
          p_expires_at?: string;
          p_notes?: string;
          p_owner_user_id: string;
          p_program_id: string;
          p_source: Database["public"]["Enums"]["enrollment_key_source"];
          p_source_enrollment_id?: string;
          p_source_order_id?: string;
          p_value_cents?: number;
          p_variant_id?: string;
        };
        Returns: string;
      };
      issue_order_invoice: {
        Args: {
          p_created_by?: string;
          p_notes?: string;
          p_order_id: string;
          p_recipient_email?: string;
          p_send?: boolean;
        };
        Returns: {
          amount_due: number | null;
          amount_paid: number;
          amount_total: number;
          created_at: string;
          created_by: string | null;
          currency: string;
          description: string | null;
          due_date: string | null;
          id: string;
          invoice_number: string;
          issued_at: string | null;
          line_items: Json;
          metadata: Json;
          notes: string | null;
          order_id: string | null;
          organization_id: string | null;
          paid_at: string | null;
          public_token: string;
          recipient_email: string | null;
          recipient_name: string | null;
          sent_at: string | null;
          status: string;
          store_purchase_id: string | null;
          title: string;
          updated_at: string;
          user_id: string | null;
          voided_at: string | null;
        };
        SetofOptions: {
          from: "*";
          to: "invoices";
          isOneToOne: true;
          isSetofReturn: false;
        };
      };
      kb_is_project_member: { Args: { p_project_id: string }; Returns: boolean };
      keys_count_for_purchase: {
        Args: { p_program_id: string; p_variant_id: string };
        Returns: number;
      };
      link_clerk_user: {
        Args: {
          p_clerk_user_id: string;
          p_email?: string;
          p_first_name?: string;
          p_last_name?: string;
          p_supabase_user_id: string;
        };
        Returns: string;
      };
      link_cohort_session_lesson: {
        Args: { p_lesson_plan_id: string; p_session_id: string };
        Returns: string;
      };
      link_payment_to_order: {
        Args: { p_order_id: string; p_payment_log_id: string };
        Returns: undefined;
      };
      list_textbook_chapters: {
        Args: { p_textbook_id: string };
        Returns: {
          chapter_title: string;
          chunk_count: number;
        }[];
      };
      merge_profile_contact: {
        Args: {
          p_email?: string;
          p_first_name?: string;
          p_last_name?: string;
          p_phone?: string;
          p_user_id: string;
        };
        Returns: undefined;
      };
      move_enrollment_to_cohort: {
        Args: { p_enrollment_id: string; p_new_cohort_id: string };
        Returns: Json;
      };
      next_invoice_number: { Args: never; Returns: string };
      normalize_payment_phone: { Args: { p_phone: string }; Returns: string };
      normalize_phone: { Args: { p: string }; Returns: string };
      order_line_items_without_managed_fees: {
        Args: { p_line_items: Json };
        Returns: Json;
      };
      order_managed_fee_total: {
        Args: { p_kind: string; p_line_items: Json };
        Returns: number;
      };
      order_on_active_payment_plan: {
        Args: { p_order_id: string };
        Returns: boolean;
      };
      order_owned_payment_total: {
        Args: { p_order_id: string; p_order_user_id: string };
        Returns: number;
      };
      origiin_complete_onboarding: {
        Args: {
          p_avatar_url?: string;
          p_bio?: string;
          p_discoverable?: boolean;
          p_display_name?: string;
          p_goals?: string[];
          p_interests?: string[];
          p_looking_for?: string[];
          p_profile_visibility?: string;
          p_skills?: string[];
          p_user_id: string;
          p_username: string;
        };
        Returns: {
          availability: string | null;
          avatar_url: string | null;
          banner_url: string | null;
          bio: string | null;
          created_at: string;
          discoverable: boolean;
          display_name: string | null;
          goals: string[];
          id: string;
          interests: string[];
          is_demo: boolean;
          languages: string[];
          links: Json;
          location_privacy: string;
          location_region: string | null;
          looking_for: string[];
          onboarding_completed_at: string | null;
          one_id: string | null;
          profile_visibility: string;
          skills: string[];
          updated_at: string;
          username: string;
        };
        SetofOptions: {
          from: "*";
          to: "ig_profiles";
          isOneToOne: true;
          isSetofReturn: false;
        };
      };
      origiin_ensure_profile: {
        Args: { p_user_id: string };
        Returns: {
          availability: string | null;
          avatar_url: string | null;
          banner_url: string | null;
          bio: string | null;
          created_at: string;
          discoverable: boolean;
          display_name: string | null;
          goals: string[];
          id: string;
          interests: string[];
          is_demo: boolean;
          languages: string[];
          links: Json;
          location_privacy: string;
          location_region: string | null;
          looking_for: string[];
          onboarding_completed_at: string | null;
          one_id: string | null;
          profile_visibility: string;
          skills: string[];
          updated_at: string;
          username: string;
        };
        SetofOptions: {
          from: "*";
          to: "ig_profiles";
          isOneToOne: true;
          isSetofReturn: false;
        };
      };
      origiin_fetch_profile_for_viewer: {
        Args: { p_username: string; p_viewer: string };
        Returns: {
          availability: string | null;
          avatar_url: string | null;
          banner_url: string | null;
          bio: string | null;
          created_at: string;
          discoverable: boolean;
          display_name: string | null;
          goals: string[];
          id: string;
          interests: string[];
          is_demo: boolean;
          languages: string[];
          links: Json;
          location_privacy: string;
          location_region: string | null;
          looking_for: string[];
          onboarding_completed_at: string | null;
          one_id: string | null;
          profile_visibility: string;
          skills: string[];
          updated_at: string;
          username: string;
        };
        SetofOptions: {
          from: "*";
          to: "ig_profiles";
          isOneToOne: true;
          isSetofReturn: false;
        };
      };
      origiin_respond_connection: {
        Args: { p_accept: boolean; p_connection_id: string; p_user_id: string };
        Returns: {
          consent_given_at: string | null;
          created_at: string;
          from_user_id: string;
          id: string;
          kind: string;
          status: string;
          to_user_id: string;
          updated_at: string;
        };
        SetofOptions: {
          from: "*";
          to: "ig_connections";
          isOneToOne: true;
          isSetofReturn: false;
        };
      };
      origiin_search_discoverable_profiles: {
        Args: { p_limit?: number; p_query?: string; p_viewer: string };
        Returns: {
          availability: string | null;
          avatar_url: string | null;
          banner_url: string | null;
          bio: string | null;
          created_at: string;
          discoverable: boolean;
          display_name: string | null;
          goals: string[];
          id: string;
          interests: string[];
          is_demo: boolean;
          languages: string[];
          links: Json;
          location_privacy: string;
          location_region: string | null;
          looking_for: string[];
          onboarding_completed_at: string | null;
          one_id: string | null;
          profile_visibility: string;
          skills: string[];
          updated_at: string;
          username: string;
        }[];
        SetofOptions: {
          from: "*";
          to: "ig_profiles";
          isOneToOne: false;
          isSetofReturn: true;
        };
      };
      origiin_send_connection_request: {
        Args: { p_from_user_id: string; p_to_user_id: string };
        Returns: {
          consent_given_at: string | null;
          created_at: string;
          from_user_id: string;
          id: string;
          kind: string;
          status: string;
          to_user_id: string;
          updated_at: string;
        };
        SetofOptions: {
          from: "*";
          to: "ig_connections";
          isOneToOne: true;
          isSetofReturn: false;
        };
      };
      origiin_update_profile_signals: {
        Args: {
          p_availability?: string;
          p_discoverable?: boolean;
          p_goals?: string[];
          p_interests?: string[];
          p_languages?: string[];
          p_location_privacy?: string;
          p_location_region?: string;
          p_looking_for?: string[];
          p_skills?: string[];
          p_user_id: string;
        };
        Returns: {
          availability: string | null;
          avatar_url: string | null;
          banner_url: string | null;
          bio: string | null;
          created_at: string;
          discoverable: boolean;
          display_name: string | null;
          goals: string[];
          id: string;
          interests: string[];
          is_demo: boolean;
          languages: string[];
          links: Json;
          location_privacy: string;
          location_region: string | null;
          looking_for: string[];
          onboarding_completed_at: string | null;
          one_id: string | null;
          profile_visibility: string;
          skills: string[];
          updated_at: string;
          username: string;
        };
        SetofOptions: {
          from: "*";
          to: "ig_profiles";
          isOneToOne: true;
          isSetofReturn: false;
        };
      };
      payment_log_buyer_email: { Args: { p_raw: Json }; Returns: string };
      payment_log_buyer_name: { Args: { p_raw: Json }; Returns: string };
      payment_log_buyer_phone: { Args: { p_raw: Json }; Returns: string };
      payment_log_square_customer_id: { Args: { p_raw: Json }; Returns: string };
      preview_sessions: {
        Args: {
          p_max_count?: number;
          p_start_date: string;
          p_template_id: string;
        };
        Returns: {
          duration_hours: number;
          session_date: string;
          session_number: number;
          session_start_time: string;
          session_type: string;
        }[];
      };
      process_clerk_import: { Args: { batch_size?: number }; Returns: Json };
      propose_command_action: {
        Args: {
          p_action_type: string;
          p_proposed_payload?: Json;
          p_target_id?: string;
          p_target_type?: string;
          p_thread_id: string;
        };
        Returns: string;
      };
      publish_course: { Args: { p_course_id: string }; Returns: string };
      publish_lesson_plan: {
        Args: { p_lesson_plan_id: string };
        Returns: string;
      };
      rate_content_item: {
        Args: {
          p_comment?: string;
          p_content_item_id: string;
          p_organization_id: string;
          p_rating: number;
        };
        Returns: undefined;
      };
      rebalance_installments: {
        Args: { p_order_id: string };
        Returns: undefined;
      };
      recalculate_cohort_enrolled_count: {
        Args: { p_cohort_id: string };
        Returns: undefined;
      };
      recompute_all_schedule_tags: { Args: never; Returns: number };
      record_corpus_practice_session: {
        Args: {
          p_correct_count: number;
          p_items: Json;
          p_mode: string;
          p_organization_id: string;
          p_score: number;
          p_subject: string;
          p_total_items: number;
          p_user_id: string;
        };
        Returns: string;
      };
      record_declared_source: {
        Args: {
          p_actor_user_id?: string;
          p_auth_user_id?: string;
          p_context?: string;
          p_detail?: string;
          p_lead_application_id?: string;
          p_program_id?: string;
          p_source?: string;
        };
        Returns: Json;
      };
      record_payment_event: {
        Args: {
          p_amount_cents?: number;
          p_currency?: string;
          p_enrollment_id?: string;
          p_event_type: string;
          p_external_id?: string;
          p_idempotency_key: string;
          p_order_id?: string;
          p_payload_hash?: string;
          p_raw_payload?: Json;
          p_source: string;
        };
        Returns: string;
      };
      redeem_enrollment_key: {
        Args: { p_code: string; p_cohort_id: string };
        Returns: string;
      };
      refresh_cohort_template_snapshot: {
        Args: { p_cohort_id: string };
        Returns: boolean;
      };
      regenerate_cohort_sessions_for_template: {
        Args: { p_include_enrolled?: boolean; p_template_id: string };
        Returns: Json;
      };
      resolve_payment_log_student: {
        Args: { p_payment_log_id: string };
        Returns: Json;
      };
      restore_course_version: {
        Args: { p_version_id: string };
        Returns: string;
      };
      restore_lesson_plan_version: {
        Args: { p_version_id: string };
        Returns: string;
      };
      retry_generation_job: { Args: { p_job_id: string }; Returns: string };
      review_question: {
        Args: { p_question_id: string; p_status: string };
        Returns: undefined;
      };
      revoke_enrollment_key: {
        Args: { p_key_id: string; p_reason?: string };
        Returns: undefined;
      };
      search_linkable_payments: {
        Args: { p_days?: number; p_search?: string; p_user_id?: string };
        Returns: {
          amount: number;
          buyer_email: string;
          buyer_name: string;
          created_at: string;
          id: string;
          link_state: string;
          match_status: string;
          order_deposit_paid: number;
          order_id: string;
          order_program_name: string;
          order_total_amount: number;
          order_user_id: string;
          provider: string;
          provider_transaction_id: string;
          receipt_number: string;
          status: string;
          user_id: string;
        }[];
      };
      search_memory_entities: {
        Args: {
          p_agent_id?: string;
          p_match_count?: number;
          p_org_id: string;
          p_project_id?: string;
          p_query_embedding: string;
          p_user_id?: string;
        };
        Returns: {
          attrs: Json;
          entity_type: string;
          id: string;
          last_seen_at: string;
          pinned_at: string;
          project_id: string;
          similarity: number;
          source: string;
          title: string;
        }[];
      };
      search_message_chunks: {
        Args: {
          p_exclude_thread_id?: string;
          p_match_count?: number;
          p_org_id: string;
          p_project_id?: string;
          p_query_embedding: string;
        };
        Returns: {
          chunk_text: string;
          created_at: string;
          id: string;
          message_id: string;
          role: string;
          similarity: number;
          thread_id: string;
        }[];
      };
      search_textbook_chunks:
        | {
            Args: {
              p_limit?: number;
              p_organization_id: string;
              p_query_embedding: string;
            };
            Returns: {
              chapter_title: string;
              chunk_id: string;
              content: string;
              similarity: number;
              textbook_id: string;
            }[];
          }
        | {
            Args: {
              p_chapter_titles?: string[];
              p_limit?: number;
              p_organization_id: string;
              p_query_embedding: string;
              p_textbook_id?: string;
            };
            Returns: {
              chapter_title: string;
              chunk_id: string;
              content: string;
              similarity: number;
              textbook_id: string;
            }[];
          };
      search_unmatched_payments: {
        Args: {
          p_amount?: number;
          p_days?: number;
          p_email?: string;
          p_search?: string;
          p_user_id?: string;
        };
        Returns: {
          amount: number;
          buyer_email: string;
          buyer_name: string;
          created_at: string;
          id: string;
          provider: string;
          provider_transaction_id: string;
          receipt_number: string;
          status: string;
          student_match_status: string;
          user_id: string;
        }[];
      };
      set_enrollment_trusted_source: {
        Args: { p_enrollment_id: string };
        Returns: undefined;
      };
      show_limit: { Args: never; Returns: number };
      show_trgm: { Args: { "": string }; Returns: string[] };
      snapshot_course: {
        Args: { p_course_id: string; p_reason?: string };
        Returns: string;
      };
      snapshot_lesson_plan: {
        Args: { p_lesson_plan_id: string; p_reason?: string };
        Returns: string;
      };
      so_has_role: {
        Args: {
          _org: string;
          _roles: Database["public"]["Enums"]["so_role"][];
          _uid: string;
        };
        Returns: boolean;
      };
      student_has_bundle_for_program: {
        Args: { p_program_id: string; p_statuses?: string[]; p_user_id: string };
        Returns: boolean;
      };
      student_program_payment_total: {
        Args: { p_program_id: string; p_user_id: string };
        Returns: number;
      };
      submit_checkin: {
        Args: { p_identifier: string; p_method?: string; p_token: string };
        Returns: Json;
      };
      sync_installments_from_payments: {
        Args: { p_order_id: string };
        Returns: Json;
      };
      sync_order_payments_from_logs: {
        Args: { p_order_id: string };
        Returns: Json;
      };
      upsert_lead: {
        Args: {
          p_email: string;
          p_name: string;
          p_phone: string;
          p_program: string;
        };
        Returns: string;
      };
      user_belongs_to_org: {
        Args: { _org_id: string; _user_id: string };
        Returns: boolean;
      };
      validate_checkin_token: { Args: { p_token: string }; Returns: Json };
      wws_is_admin: { Args: { uid: string }; Returns: boolean };
    };
    Enums: {
      ao_agenda_calendar_mode: "builtin" | "google" | "outlook" | "hybrid";
      ao_approval_status: "pending" | "approved" | "rejected";
      ao_calendar_constraint_source: "builtin" | "google" | "outlook" | "manual";
      ao_constraint_kind:
        | "policy"
        | "operational"
        | "technical"
        | "compliance"
        | "capacity"
        | "demand"
        | "conversion"
        | "fulfilment"
        | "cash"
        | "talent";
      ao_constraint_source: "user_reported" | "system_detected";
      ao_constraint_status: "active" | "mitigated" | "resolved" | "accepted";
      ao_credit_bucket: "daily" | "subscription" | "topup" | "bonus" | "legacy" | "admin_grant";
      ao_day_plan_source: "chronos" | "manual" | "replan" | "system" | "automation";
      ao_day_plan_status:
        | "draft"
        | "proposed"
        | "committed"
        | "active"
        | "completed"
        | "superseded"
        | "abandoned";
      ao_identity_proposal_status: "pending" | "approved" | "rejected" | "superseded";
      ao_inbox_item_status:
        | "waiting"
        | "approved"
        | "rejected"
        | "completed"
        | "ignored"
        | "cancelled";
      ao_inbox_item_type:
        | "approval"
        | "input"
        | "exception"
        | "summary"
        | "compliance"
        | "alert"
        | "follow_up"
        | "activity"
        | "check"
        | "message"
        | "update"
        | "log";
      ao_inbox_lane: "approval" | "report" | "task";
      ao_inbox_priority: "low" | "normal" | "high" | "urgent";
      ao_integration_kind: "pipedream" | "composio" | "github" | "mcp" | "resend" | "zernio";
      ao_intel_history_kind:
        | "identity"
        | "objective"
        | "constraint"
        | "project"
        | "work_item"
        | "relationship"
        | "inbox"
        | "audit"
        | "system";
      ao_intel_master_plan_status: "draft" | "active" | "archived";
      ao_intel_project_status: "draft" | "active" | "on_hold" | "completed" | "cancelled";
      ao_ledger_reason:
        | "chat"
        | "grant"
        | "adjustment"
        | "signup_bonus"
        | "subscription"
        | "topup"
        | "daily_grant"
        | "expiry"
        | "tool"
        | "api"
        | "reservation_hold"
        | "reservation_release"
        | "usage";
      ao_markup_method:
        | "cost_plus_multiplier"
        | "cost_plus_percent"
        | "fixed_credits"
        | "fixed_micro_usd"
        | "pass_through";
      ao_message_role: "system" | "user" | "assistant" | "tool";
      ao_milestone_status: "planned" | "active" | "achieved" | "missed" | "cancelled";
      ao_objective_status: "draft" | "active" | "achieved" | "missed" | "cancelled" | "superseded";
      ao_org_role: "owner" | "admin" | "member" | "manager" | "guest";
      ao_outcome_review_status: "achieved" | "missed" | "partial" | "superseded" | "inconclusive";
      ao_pricing_rule_status: "draft" | "scheduled" | "published" | "archived";
      ao_pricing_rule_type:
        | "global"
        | "provider"
        | "model"
        | "plan"
        | "org"
        | "action"
        | "promotion"
        | "enterprise";
      ao_provider: "openai" | "anthropic";
      ao_provider_status: "active" | "inactive" | "degraded" | "disabled";
      ao_relationship_circle:
        | "self"
        | "god"
        | "family"
        | "friends"
        | "community"
        | "professional"
        | "spiritual"
        | "affiliations";
      ao_relationship_state: "active" | "dormant" | "ended" | "prospect";
      ao_reservation_status: "pending" | "active" | "finalized" | "released" | "expired";
      ao_rounding_method: "ceil" | "floor" | "round" | "bankers";
      ao_run_status: "pending" | "running" | "succeeded" | "failed" | "cancelled";
      ao_space_deploy_provider: "static" | "vercel" | "coolify";
      ao_space_deploy_status: "pending" | "live" | "failed";
      ao_space_preview_mode: "static_html";
      ao_space_status: "draft" | "published" | "archived";
      ao_time_block_flexibility: "flexible" | "fixed";
      ao_time_block_kind:
        | "work"
        | "focus"
        | "meeting"
        | "break"
        | "buffer"
        | "calendar_hold"
        | "personal";
      ao_time_block_status:
        | "planned"
        | "in_progress"
        | "done"
        | "skipped"
        | "slipped"
        | "cancelled"
        | "archived";
      ao_time_executor_kind: "human" | "agent" | "team" | "workflow" | "automation";
      ao_work_assignee_kind:
        | "human"
        | "agent"
        | "workflow"
        | "automation"
        | "integration"
        | "team"
        | "unassigned";
      ao_work_commitment_state: "proposed" | "draft" | "committed";
      ao_work_evidence_kind:
        | "artifact"
        | "inbox_item"
        | "audit_event"
        | "agent_run"
        | "commit"
        | "pr"
        | "metric"
        | "approval"
        | "document"
        | "other";
      ao_work_item_status:
        | "draft"
        | "ready"
        | "in_progress"
        | "blocked"
        | "awaiting_approval"
        | "done"
        | "verified"
        | "cancelled";
      ao_work_outcome_status: "unknown" | "achieved" | "missed" | "partial";
      ao_work_verification_status: "unverified" | "claimed" | "verified" | "rejected";
      app_role:
        | "admin"
        | "user"
        | "student"
        | "instructor"
        | "super_instructor"
        | "super_admin"
        | "kiosk"
        | "platform_operator";
      bundle_access_type: "lifetime" | "months" | "until_exam";
      call_status: "ringing" | "active" | "ended" | "missed" | "declined";
      call_type: "voice" | "video";
      cf_app_role: "super_admin" | "admin" | "staff";
      connection_status: "pending" | "accepted" | "blocked";
      conversation_type:
        | "dm"
        | "group_dm"
        | "cohort_channel"
        | "program_space"
        | "staff_channel"
        | "announcement";
      cta_destination_type:
        | "direct_enrollment_flow"
        | "shared_admissions_flow"
        | "preview_calendar"
        | "direct_calendar"
        | "internal_page"
        | "external_url";
      enrollment_key_source: "withdrawal" | "admin_issued" | "prepaid_purchase";
      enrollment_key_status: "active" | "redeemed" | "expired" | "revoked";
      import_batch_source: "excel" | "eventbrite";
      import_batch_status: "preview" | "running" | "completed" | "failed" | "rolled_back";
      import_row_outcome:
        | "pending"
        | "created"
        | "existing_linked"
        | "duplicate_in_cohort"
        | "waitlisted"
        | "failed"
        | "skipped";
      kb_project_member_role: "owner" | "admin" | "member";
      kb_stripe_order_status: "pending" | "completed" | "canceled";
      kb_stripe_subscription_status:
        | "not_started"
        | "incomplete"
        | "incomplete_expired"
        | "trialing"
        | "active"
        | "past_due"
        | "canceled"
        | "unpaid"
        | "paused";
      kb_subscription_status: "free" | "pro";
      kb_task_priority: "low" | "medium" | "high";
      learning_mode: "instructor_led" | "on_demand" | "hybrid";
      livescan_booking_mode: "walk_in" | "appointment";
      livescan_booking_status: "pending" | "confirmed" | "completed" | "cancelled" | "no_show";
      member_role: "member" | "admin" | "moderator";
      message_type: "text" | "image" | "file" | "system" | "voice_note";
      post_type:
        | "milestone"
        | "update"
        | "question"
        | "study_group"
        | "shoutout"
        | "tip"
        | "announcement"
        | "job_share";
      post_visibility: "cohort" | "program" | "friends" | "everyone";
      presence_status: "online" | "away" | "studying" | "in_class" | "offline";
      report_status: "pending" | "reviewed" | "actioned" | "dismissed";
      report_type: "message" | "post" | "user" | "comment";
      so_analytics_event_type:
        | "view"
        | "accept"
        | "decline"
        | "share"
        | "download"
        | "contact_click"
        | "expired";
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
        | "custom";
      so_offer_status:
        | "draft"
        | "sent"
        | "viewed"
        | "accepted"
        | "declined"
        | "expired"
        | "archived";
      so_offer_type:
        | "cash"
        | "subject_to"
        | "seller_financing"
        | "lease_option"
        | "novation"
        | "comparison"
        | "appointment"
        | "follow_up"
        | "custom";
      so_role: "owner" | "admin" | "member" | "viewer";
      sp_member_role: "admin" | "member";
      sp_poll_status: "draft" | "active" | "closed" | "archived";
      store_product_type: "enrollment_key" | "practice_week" | "livescan" | "general";
      store_purchase_status: "pending" | "paid" | "fulfilled" | "cancelled" | "refunded";
      user_lifecycle_status: "lead" | "applicant" | "enrolled" | "inactive" | "archived";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      ao_agenda_calendar_mode: ["builtin", "google", "outlook", "hybrid"],
      ao_approval_status: ["pending", "approved", "rejected"],
      ao_calendar_constraint_source: ["builtin", "google", "outlook", "manual"],
      ao_constraint_kind: [
        "policy",
        "operational",
        "technical",
        "compliance",
        "capacity",
        "demand",
        "conversion",
        "fulfilment",
        "cash",
        "talent",
      ],
      ao_constraint_source: ["user_reported", "system_detected"],
      ao_constraint_status: ["active", "mitigated", "resolved", "accepted"],
      ao_credit_bucket: ["daily", "subscription", "topup", "bonus", "legacy", "admin_grant"],
      ao_day_plan_source: ["chronos", "manual", "replan", "system", "automation"],
      ao_day_plan_status: [
        "draft",
        "proposed",
        "committed",
        "active",
        "completed",
        "superseded",
        "abandoned",
      ],
      ao_identity_proposal_status: ["pending", "approved", "rejected", "superseded"],
      ao_inbox_item_status: [
        "waiting",
        "approved",
        "rejected",
        "completed",
        "ignored",
        "cancelled",
      ],
      ao_inbox_item_type: [
        "approval",
        "input",
        "exception",
        "summary",
        "compliance",
        "alert",
        "follow_up",
        "activity",
        "check",
        "message",
        "update",
        "log",
      ],
      ao_inbox_lane: ["approval", "report", "task"],
      ao_inbox_priority: ["low", "normal", "high", "urgent"],
      ao_integration_kind: ["pipedream", "composio", "github", "mcp", "resend", "zernio"],
      ao_intel_history_kind: [
        "identity",
        "objective",
        "constraint",
        "project",
        "work_item",
        "relationship",
        "inbox",
        "audit",
        "system",
      ],
      ao_intel_master_plan_status: ["draft", "active", "archived"],
      ao_intel_project_status: ["draft", "active", "on_hold", "completed", "cancelled"],
      ao_ledger_reason: [
        "chat",
        "grant",
        "adjustment",
        "signup_bonus",
        "subscription",
        "topup",
        "daily_grant",
        "expiry",
        "tool",
        "api",
        "reservation_hold",
        "reservation_release",
        "usage",
      ],
      ao_markup_method: [
        "cost_plus_multiplier",
        "cost_plus_percent",
        "fixed_credits",
        "fixed_micro_usd",
        "pass_through",
      ],
      ao_message_role: ["system", "user", "assistant", "tool"],
      ao_milestone_status: ["planned", "active", "achieved", "missed", "cancelled"],
      ao_objective_status: ["draft", "active", "achieved", "missed", "cancelled", "superseded"],
      ao_org_role: ["owner", "admin", "member", "manager", "guest"],
      ao_outcome_review_status: ["achieved", "missed", "partial", "superseded", "inconclusive"],
      ao_pricing_rule_status: ["draft", "scheduled", "published", "archived"],
      ao_pricing_rule_type: [
        "global",
        "provider",
        "model",
        "plan",
        "org",
        "action",
        "promotion",
        "enterprise",
      ],
      ao_provider: ["openai", "anthropic"],
      ao_provider_status: ["active", "inactive", "degraded", "disabled"],
      ao_relationship_circle: [
        "self",
        "god",
        "family",
        "friends",
        "community",
        "professional",
        "spiritual",
        "affiliations",
      ],
      ao_relationship_state: ["active", "dormant", "ended", "prospect"],
      ao_reservation_status: ["pending", "active", "finalized", "released", "expired"],
      ao_rounding_method: ["ceil", "floor", "round", "bankers"],
      ao_run_status: ["pending", "running", "succeeded", "failed", "cancelled"],
      ao_space_deploy_provider: ["static", "vercel", "coolify"],
      ao_space_deploy_status: ["pending", "live", "failed"],
      ao_space_preview_mode: ["static_html"],
      ao_space_status: ["draft", "published", "archived"],
      ao_time_block_flexibility: ["flexible", "fixed"],
      ao_time_block_kind: [
        "work",
        "focus",
        "meeting",
        "break",
        "buffer",
        "calendar_hold",
        "personal",
      ],
      ao_time_block_status: [
        "planned",
        "in_progress",
        "done",
        "skipped",
        "slipped",
        "cancelled",
        "archived",
      ],
      ao_time_executor_kind: ["human", "agent", "team", "workflow", "automation"],
      ao_work_assignee_kind: [
        "human",
        "agent",
        "workflow",
        "automation",
        "integration",
        "team",
        "unassigned",
      ],
      ao_work_commitment_state: ["proposed", "draft", "committed"],
      ao_work_evidence_kind: [
        "artifact",
        "inbox_item",
        "audit_event",
        "agent_run",
        "commit",
        "pr",
        "metric",
        "approval",
        "document",
        "other",
      ],
      ao_work_item_status: [
        "draft",
        "ready",
        "in_progress",
        "blocked",
        "awaiting_approval",
        "done",
        "verified",
        "cancelled",
      ],
      ao_work_outcome_status: ["unknown", "achieved", "missed", "partial"],
      ao_work_verification_status: ["unverified", "claimed", "verified", "rejected"],
      app_role: [
        "admin",
        "user",
        "student",
        "instructor",
        "super_instructor",
        "super_admin",
        "kiosk",
        "platform_operator",
      ],
      bundle_access_type: ["lifetime", "months", "until_exam"],
      call_status: ["ringing", "active", "ended", "missed", "declined"],
      call_type: ["voice", "video"],
      cf_app_role: ["super_admin", "admin", "staff"],
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
      import_batch_status: ["preview", "running", "completed", "failed", "rolled_back"],
      import_row_outcome: [
        "pending",
        "created",
        "existing_linked",
        "duplicate_in_cohort",
        "waitlisted",
        "failed",
        "skipped",
      ],
      kb_project_member_role: ["owner", "admin", "member"],
      kb_stripe_order_status: ["pending", "completed", "canceled"],
      kb_stripe_subscription_status: [
        "not_started",
        "incomplete",
        "incomplete_expired",
        "trialing",
        "active",
        "past_due",
        "canceled",
        "unpaid",
        "paused",
      ],
      kb_subscription_status: ["free", "pro"],
      kb_task_priority: ["low", "medium", "high"],
      learning_mode: ["instructor_led", "on_demand", "hybrid"],
      livescan_booking_mode: ["walk_in", "appointment"],
      livescan_booking_status: ["pending", "confirmed", "completed", "cancelled", "no_show"],
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
      so_offer_status: ["draft", "sent", "viewed", "accepted", "declined", "expired", "archived"],
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
      store_product_type: ["enrollment_key", "practice_week", "livescan", "general"],
      store_purchase_status: ["pending", "paid", "fulfilled", "cancelled", "refunded"],
      user_lifecycle_status: ["lead", "applicant", "enrolled", "inactive", "archived"],
    },
  },
} as const;
