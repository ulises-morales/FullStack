class Dojo < ApplicationRecord
  has_many :students

  validates :branch, :street, :city, :state, presence: true
  validates :state, length: { minimum: 2 }
  # validates :state, length: { is: 2 }
end
