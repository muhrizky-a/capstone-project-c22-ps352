package com.example.foodrecipes.helper

import androidx.recyclerview.widget.DiffUtil
import com.example.foodrecipes.data.api.response.RecipesItem

class DiffRecipiesCallback(
    private val oldRecipesList : List<RecipesItem>,
    private val newRecipesList : List<RecipesItem>
) :DiffUtil.Callback() {

    override fun getOldListSize(): Int = oldRecipesList.size
    override fun getNewListSize(): Int = newRecipesList.size

    override fun areItemsTheSame(oldItemPosition: Int, newItemPosition: Int): Boolean {
        val oldItem = oldRecipesList[oldItemPosition]
        val newItem = newRecipesList[newItemPosition]
        return oldItem.name == newItem.name && oldItem.description == newItem.description
    }

    override fun areContentsTheSame(oldItemPosition: Int, newItemPosition: Int): Boolean =
        oldRecipesList[oldItemPosition].id == newRecipesList[newItemPosition].id

}