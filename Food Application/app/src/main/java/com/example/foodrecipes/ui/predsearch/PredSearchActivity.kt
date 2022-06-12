package com.example.foodrecipes.ui.predsearch

import android.annotation.SuppressLint
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.foodrecipes.R
import com.example.foodrecipes.data.api.response.PredResponse
import com.example.foodrecipes.data.api.response.RecipesItem
import com.example.foodrecipes.databinding.ActivityPredSearchBinding
import com.example.foodrecipes.ui.adapter.RecipesAdapter
import com.example.foodrecipes.ui.detail.DetailRecipeActivity
import com.example.foodrecipes.ui.search.SearchViewModel

class PredSearchActivity : AppCompatActivity() {
    private lateinit var binding : ActivityPredSearchBinding

    companion object{
        const val SEARCH = "SEARCHHADSKFS"
    }

    @SuppressLint("NotifyDataSetChanged")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityPredSearchBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val data = intent.getParcelableExtra<PredResponse>(SEARCH) as PredResponse
        binding.predView.text = getString(R.string.pred,data.food)

        val SearchViewModel = ViewModelProvider(this)[SearchViewModel::class.java]
        SearchViewModel.setSearchRecipes(data.food)

        val adapter = RecipesAdapter()
        adapter.notifyDataSetChanged()
        binding.rvSearchRecipes.layoutManager = LinearLayoutManager(this)
        binding.rvSearchRecipes.setHasFixedSize(true)
        binding.rvSearchRecipes.adapter = adapter
        SearchViewModel.listRecipes.observe(this){
            adapter.setRecipes(it)
            adapter.setOnItemClickCallback(object : RecipesAdapter.OnItemClickCallback{
                override fun onItemClicked(data: RecipesItem) {
                    val intentToDetail = Intent(this@PredSearchActivity, DetailRecipeActivity::class.java)
                    intentToDetail.putExtra(DetailRecipeActivity.DETAIL,data)
                    startActivity(intentToDetail)
                    Toast.makeText(this@PredSearchActivity,data.name +" Clicked", Toast.LENGTH_SHORT).show()
                }
            })
        }
    }
}