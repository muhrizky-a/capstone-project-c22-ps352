package com.example.foodrecipes.data.api


import com.example.foodrecipes.data.api.response.RecipesResponse
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Multipart
import retrofit2.http.POST
import retrofit2.http.Query

interface ApiService {
    @GET("recipes")
    fun getRecipes(
        @Query("name") page: String? = null,
    ): Call<RecipesResponse>
}