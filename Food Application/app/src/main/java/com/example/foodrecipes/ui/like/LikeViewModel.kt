package com.example.foodrecipes.ui.like

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class LikeViewModel : ViewModel() {
    private val _text = MutableLiveData<String>().apply {
        value = "This is Like Fragment"
    }
    val text: LiveData<String> = _text
}