module Types
  module Video
    class VideoPayload < Types::BaseObject
      field :video, Types::Video::VideoType
      field :errors, [ String ]
    end
  end
end
