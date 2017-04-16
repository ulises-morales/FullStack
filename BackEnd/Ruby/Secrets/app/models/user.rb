class User < ApplicationRecord

  has_many :secrets
  has_many :likes, dependent: :destroy
  # will query all the secrets that the user has liked
  ## has_many :secrets, through: :likes

  # give an alias  to explicitly tell Rails which table we're referring to
  has_many :secrets_liked, through: :likes, source: :secret


  has_secure_password

  EMAIL_REGEX = /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]+)\z/i
  validates :name, presence: true
  validates :email, presence: true, uniqueness: { case_sensitive: false }, format: { with: EMAIL_REGEX }
  
  before_save :email_lowercase

  def email_lowercase
    email.downcase!
  end
  
end
