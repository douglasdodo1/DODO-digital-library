module Resolvers
  class BaseResolver < GraphQL::Schema::Resolver
    def resolve(**args)
      raise NotImplementedError, "O método resolve deve ser implementado nas classes filhas"
    rescue ActiveRecord::RecordNotFound => e
      raise GraphQL::ExecutionError, "Registro não encontrado: #{e.message}"
    rescue ActiveRecord::RecordInvalid => e
      raise GraphQL::ExecutionError, "Erro de validação: #{e.record.errors.full_messages.join(', ')}"
    rescue Pundit::NotAuthorizedError => e
      raise GraphQL::ExecutionError, "Acesso não autorizado: #{e.message}"
    rescue StandardError => e
      raise GraphQL::ExecutionError, "Erro interno do servidor: #{e.message}"
    end
  end
end
