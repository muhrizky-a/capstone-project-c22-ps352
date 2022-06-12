package com.example.foodrecipes.data.api

import com.example.foodrecipes.data.api.response.PredResponse
import okhttp3.MultipartBody
import retrofit2.Call
import retrofit2.http.Multipart
import retrofit2.http.POST
import retrofit2.http.Part

interface PredService {
    @Multipart
    @POST("predict")
    fun predImg(
        @Part file:MultipartBody.Part
    ) : Call<PredResponse>
}