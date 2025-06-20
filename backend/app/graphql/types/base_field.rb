module Types
  class BaseField < GraphQL::Schema::Field
    def resolve_field(obj, args, ctx)
      super
    rescue ActiveRecord::RecordNotFound => e
      raise GraphQL::ExecutionError, "[BaseField] Record not found: #{e.model&.name || 'Record'} with the given ID was not found."
    rescue ActiveRecord::RecordInvalid => e
      messages = e.record&.errors&.full_messages&.join(', ') || 'Unknown validation error'
      raise GraphQL::ExecutionError, "[BaseField] Validation error: #{messages}"
    rescue Pundit::NotAuthorizedError => e
      raise GraphQL::ExecutionError, "[BaseField] Unauthorized access: #{e.message}"
    rescue StandardError => e
      raise GraphQL::ExecutionError, "[BaseField] Internal server error: #{e.message}"
    end
  end
end
