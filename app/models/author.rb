class Author < ApplicationRecord
  has_one :person
  has_one :institution
end
