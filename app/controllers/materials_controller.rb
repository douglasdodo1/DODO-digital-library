class MaterialsController < ApplicationController
  before_action :set_material, only: %i[ show update destroy ]

  # GET /materials
  def index
    @materials = Material.all

    render json: @materials
  end

  # GET /materials/1
  def show
    render json: @material
  end

  # POST /materials
  def create
    @material = Material.new(material_params)

    if @material.save
      render json: @material, status: :created, location: @material
    else
      render json: @material.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /materials/1
  def update
    if @material.update(material_params)
      render json: @material
    else
      render json: @material.errors, status: :unprocessable_entity
    end
  end

  # DELETE /materials/1
  def destroy
    @material.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_material
      @material = Material.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def material_params
      params.expect(material: [ :title, :description, :status, :author_id, :user_id ])
    end
end
