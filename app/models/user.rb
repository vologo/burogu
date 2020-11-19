require 'ali/oss'

class User < ApplicationRecord
  mount_uploader :avatar, AvatarUploader
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :blogs, dependent: :destroy
  action_store :read, :blog, counter_cache: true
  action_store :like, :blog

  enum sex: %i[保密 男 女]

  def resource_errors
    errors.full_messages
  end

  def oss_avatar
    if avatar.file.nil?
      'https://assets-blog-xiongyuchi.oss-cn-beijing.aliyuncs.com/avatars/dog.jpg'
    else
      "https://assets-blog-xiongyuchi.oss-cn-beijing.aliyuncs.com#{avatar.url}"
    end
  end

end
