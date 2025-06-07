module Mutations
  class BaseMutation < GraphQL::Schema::Mutation
    def require_authentication!
      raise GraphQL::ExecutionError, "Authentication required" unless context[:current_user]
    end

    null false

    def self.inherited(subclass)
      super
      subclass.class_eval do
        alias_method :original_resolve, :resolve

        define_method(:resolve) do |**args|
          puts "[BaseMutation] Called resolve with args: #{args}"
          begin
            original_resolve(**args)
          rescue ActiveRecord::RecordNotFound => e
            raise GraphQL::ExecutionError, "[BaseMutation] Record not found: #{e.model&.name || 'Record'} with the given ID was not found."
          rescue ActiveRecord::RecordInvalid => e
            messages = e.record&.errors&.full_messages&.join(', ') || 'Unknown validation error'
            raise GraphQL::ExecutionError, "[BaseMutation] Validation error: #{messages}"
          rescue Pundit::NotAuthorizedError => e
            raise GraphQL::ExecutionError, "[BaseMutation] Unauthorized access: #{e.message}"
          rescue StandardError => e
            raise GraphQL::ExecutionError, "[BaseMutation] Internal server error: #{e.message}"
          end
        end
      end
    end
  end
end
