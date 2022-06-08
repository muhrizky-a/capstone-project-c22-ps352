package com.example.foodrecipes.data.api.response

import android.os.Parcelable
import com.google.gson.annotations.SerializedName
import kotlinx.parcelize.Parcelize

@Parcelize
data class RecipesResponse(

	@field:SerializedName("data")
	val data: Data,

	@field:SerializedName("status")
	val status: String
) : Parcelable

@Parcelize
data class RecipesItem(

	@field:SerializedName("name")
	val name: String,

	@field:SerializedName("description")
	val description: String,

	@field:SerializedName("ingredients")
	val ingredients: ArrayList<String>,

	@field:SerializedName("id")
	val id: String,

	@field:SerializedName("steps")
	val steps: ArrayList<String>
) : Parcelable

@Parcelize
data class Data(

	@field:SerializedName("recipes")
	val recipes: ArrayList<RecipesItem>
) : Parcelable
