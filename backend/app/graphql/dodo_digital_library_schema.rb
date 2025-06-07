# frozen_string_literal: true

class DodoDigitalLibrarySchema < GraphQL::Schema
  mutation(Types::MutationType)
  query(Types::QueryType)

  use GraphQL::Dataloader

  def self.type_error(err, context)
    super
  end

  def self.resolve_type(abstract_type, obj, ctx)
    raise(GraphQL::RequiredImplementationMissingError)
  end

  max_query_string_tokens(5000)
  validate_max_errors(100)

  def self.id_from_object(object, type_definition, query_ctx)
    object.to_gid_param
  end

  def self.object_from_id(global_id, query_ctx)
    GlobalID.find(global_id)
  end

  rescue_from(ActiveRecord::RecordNotFound) do |err, obj, args, ctx, field|
    raise GraphQL::ExecutionError.new("[Schema] Record not found: #{err.message}")
  end

  rescue_from(ActiveRecord::RecordInvalid) do |err, obj, args, ctx, field|
    messages = err.record.errors.full_messages.join(", ")
    raise GraphQL::ExecutionError.new("[Schema] Validation error: #{messages}")
  end

  rescue_from(Pundit::NotAuthorizedError) do |err, obj, args, ctx, field|
    raise GraphQL::ExecutionError.new("[Schema] Unauthorized access: #{err.message}")
  end

  rescue_from(StandardError) do |err, obj, args, ctx, field|
    raise GraphQL::ExecutionError.new("[Schema] Internal server error: #{err.message}")
  end
end
