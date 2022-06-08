package com.example.foodrecipes.ui.search

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.example.foodrecipes.data.api.ApiConfig
import com.example.foodrecipes.data.api.response.RecipesItem
import com.example.foodrecipes.data.api.response.RecipesResponse
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class SearchViewModel : ViewModel() {
    private val _listRecipes = MutableLiveData<ArrayList<RecipesItem>>()
    val listRecipes: LiveData<ArrayList<RecipesItem>> = _listRecipes

    companion object {
        private const val TAG = "SearchViewModel"
    }

    fun setSearchRecipes(query: String) {
        val client = ApiConfig.getApiService().getRecipes(query)
        client.enqueue(object :Callback<RecipesResponse>{
            override fun onResponse(
                call: Call<RecipesResponse>,
                response: Response<RecipesResponse>
            ) {
                val responseBody = response.body()
                if (response.isSuccessful && responseBody != null) {
                    _listRecipes.postValue(responseBody.data.recipes)
                } else {
                    Log.e(TAG, "onFailure--: ${response.message()}")
                }

            }

            override fun onFailure(call: Call<RecipesResponse>, t: Throwable) {
                Log.e(TAG, "onFailure: ${t.message}")
            }

        })
    }
}