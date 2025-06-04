# frozen_string_literal: true

class GraphqlController < ApplicationController
  SECRET_KEY = Rails.application.secret_key_base



  def encode_token(payload)
    JWT.encode(payload.merge(exp: 24.hours.from_now.to_i), SECRET_KEY)
  end

  def decoded_token
    token = request.headers["Authorization"]&.split(" ")&.last
    return nil unless token

    begin
      decoded = JWT.decode(token, SECRET_KEY)[0]
      decoded.with_indifferent_access
    rescue JWT::DecodeError
      nil
    end
  end

  def current_user
    return nil unless decoded_token
    ::User.find_by(cpf: decoded_token[:cpf])
  end

  def context
    {
      current_user: current_user,
      encode_token: method(:encode_token)
    }
  end

  def execute
    variables = prepare_variables(params[:variables])
    query = params[:query]
    operation_name = params[:operationName]

    result = DodoDigitalLibrarySchema.execute(
      query,
      variables: variables,
      context: context,
      operation_name: operation_name
    )

    render json: result
  end

  private

  def prepare_variables(variables_param)
    case variables_param
    when String
      if variables_param.present?
        JSON.parse(variables_param) || {}
      else
        {}
      end
    when Hash
      variables_param
    when ActionController::Parameters
      variables_param.to_unsafe_hash
    when nil
      {}
    else
      raise ArgumentError, "Unexpected parameter: #{variables_param}"
    end
  end
end
