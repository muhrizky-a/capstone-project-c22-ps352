package com.example.foodrecipes.ui.adapter


import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.RecyclerView
import com.example.foodrecipes.data.api.response.RecipesItem
import com.example.foodrecipes.databinding.ItemRecipiesBinding
import com.example.foodrecipes.helper.DiffRecipiesCallback

class RecipesAdapter : RecyclerView.Adapter<RecipesAdapter.RecipesViewHolder>() {
    private lateinit var onItemClickCallback: OnItemClickCallback
    private val listRecipes= ArrayList<RecipesItem>()

    fun setRecipes(listRecipes: List<RecipesItem>) {
        val diffCallback = DiffRecipiesCallback(this.listRecipes,listRecipes)
        val diffResult = DiffUtil.calculateDiff(diffCallback)
        this.listRecipes.clear()
        this.listRecipes.addAll(listRecipes)
        diffResult.dispatchUpdatesTo(this)
    }

    class RecipesViewHolder(private val binding: ItemRecipiesBinding) :
        RecyclerView.ViewHolder(binding.root) {
        fun bind(recipe: RecipesItem) {
            binding.tvItemName.text = recipe.name
            binding.tvItemDesc.text = recipe.description
        }
    }

    fun setOnItemClickCallback(onItemClickCallback: OnItemClickCallback) {
        this.onItemClickCallback = onItemClickCallback
    }

    interface OnItemClickCallback {
        fun onItemClicked(data: RecipesItem)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecipesViewHolder {
        val binding =
            ItemRecipiesBinding
                .inflate(
                    LayoutInflater.from(parent.context), parent, false)
        return RecipesViewHolder(binding)
    }

    override fun onBindViewHolder(holder: RecipesViewHolder, position: Int) {
        holder.bind(listRecipes[position])
        holder.itemView.setOnClickListener {
            onItemClickCallback.onItemClicked(listRecipes[holder.adapterPosition])
        }
    }

    override fun getItemCount(): Int = listRecipes.size
}