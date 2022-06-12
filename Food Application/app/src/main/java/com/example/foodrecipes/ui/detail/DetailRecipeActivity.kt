package com.example.foodrecipes.ui.detail

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.example.foodrecipes.R
import com.example.foodrecipes.data.api.response.RecipesItem
import com.example.foodrecipes.databinding.ActivityDetailRecipeBinding

class DetailRecipeActivity : AppCompatActivity() {
    companion object{
        const val DETAIL ="DETAILLL"
    }
    lateinit var binding :ActivityDetailRecipeBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityDetailRecipeBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val data = intent.getParcelableExtra<RecipesItem>(DETAIL) as RecipesItem
        binding.tvTittle.text = data.name
        binding.tvDesc.text = data.description
        var ingred = ""
        for ((i,x) in data.ingredients.withIndex()){
            val text = "${i+1}. $x \n"
            ingred += text
        }
        binding.tvIngred.text = ingred
        var step = ""
        for ((i,x) in data.steps.withIndex()){
            val text = "${i+1}. $x \n"
            step +=text
        }
        binding.tvStep.text = step
    }
}