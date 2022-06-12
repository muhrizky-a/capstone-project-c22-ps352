package com.example.foodrecipes.data.api.response

import android.os.Parcelable
import com.google.gson.annotations.SerializedName
import kotlinx.parcelize.Parcelize

@Parcelize
data class PredResponse(
    @field:SerializedName("status")
    val status : String,

    @field:SerializedName("food")
    val food : String,

    @field:SerializedName("percentage")
    val percentage : Double,
) : Parcelable