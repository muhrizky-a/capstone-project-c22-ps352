package com.example.foodrecipes.ui.like

import androidx.lifecycle.ViewModelProvider
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.example.foodrecipes.R
import com.example.foodrecipes.databinding.AccountFragmentBinding
import com.example.foodrecipes.databinding.LikeFragmentBinding
import com.example.foodrecipes.ui.account.AccountViewModel

class LikeFragment : Fragment() {

    private var _binding: LikeFragmentBinding? = null

    // This property is only valid between onCreateView and
    // onDestroyView
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        val likeViewModel =
            ViewModelProvider(this).get(LikeViewModel::class.java)

        _binding = LikeFragmentBinding.inflate(inflater, container, false)
        val root: View = binding.root


        likeViewModel.text.observe(viewLifecycleOwner) {
        }
        return root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

}