# frozen_string_literal: true

module Types
  AuthProviderSignupData = GraphQL::InputObjectType.define do
    name "AuthProviderSignupData"

    argument :credentials, Types::AuthProviderEmailInput
  end
end
