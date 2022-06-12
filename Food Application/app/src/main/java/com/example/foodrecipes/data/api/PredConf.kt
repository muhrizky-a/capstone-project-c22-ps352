package com.example.foodrecipes.data.api

import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class PredConf {
    companion object {
        fun getPredConf(): PredService {
            val loggingInterceptor =
                HttpLoggingInterceptor().setLevel(HttpLoggingInterceptor.Level.BODY)
            val client = OkHttpClient.Builder().addInterceptor(loggingInterceptor).build()
            val retrofit =
                Retrofit.Builder().baseUrl("https://api-predict-uryqsk2rpq-as.a.run.app/").addConverterFactory(GsonConverterFactory.create())
                    .client(client).build()
            return retrofit.create(PredService::class.java)
        }
    }
}