package com.example.foodrecipes.ui.search

import android.annotation.SuppressLint
import androidx.lifecycle.ViewModelProvider
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.appcompat.widget.SearchView
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.foodrecipes.data.api.response.RecipesItem
import com.example.foodrecipes.databinding.SearchFragmentBinding
import com.example.foodrecipes.ui.adapter.RecipesAdapter

class SearchFragment : Fragment() {

    private var _binding: SearchFragmentBinding? = null

    // This property is only valid between onCreateView and
    // onDestroyView
    private val binding get() = _binding!!

    private lateinit var adapter: RecipesAdapter

    @SuppressLint("NotifyDataSetChanged")
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        val SearchViewModel =
            ViewModelProvider(this)[SearchViewModel::class.java]

        _binding = SearchFragmentBinding.inflate(inflater, container, false)
        val root: View = binding.root
        adapter = RecipesAdapter()
        adapter.notifyDataSetChanged()
        viewSetup(SearchViewModel)

        return root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    private fun viewSetup(viewModel: SearchViewModel){
        binding.svSearchRecipes.setOnQueryTextListener(object : SearchView.OnQueryTextListener{
            override fun onQueryTextSubmit(p0: String?): Boolean {
                val q = p0.toString()
                viewModel.setSearchRecipes(q)
                return true
            }

            override fun onQueryTextChange(p0: String?): Boolean {
                return false
            }
        })

        binding.rvSearchRecipes.layoutManager = LinearLayoutManager(this.context)
        binding.rvSearchRecipes.setHasFixedSize(true)
        binding.rvSearchRecipes.adapter = adapter
        viewModel.listRecipes.observe(viewLifecycleOwner){
            adapter.setRecipes(it)
            adapter.setOnItemClickCallback(object : RecipesAdapter.OnItemClickCallback{
                override fun onItemClicked(data: RecipesItem) {
                    Toast.makeText(this@SearchFragment.context,data.name +" Clicked",Toast.LENGTH_SHORT).show()
                }
            })
        }
    }
}