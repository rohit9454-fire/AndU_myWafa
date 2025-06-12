package com.gmg.loyalty.dev

import android.app.Activity
import android.app.AlertDialog
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class ExitAppModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "ExitApp"

    @ReactMethod
    fun showExitDialog() {
        val activity: Activity? = currentActivity
        activity?.runOnUiThread {
            AlertDialog.Builder(activity)
                .setTitle("Really Exit?")
                .setMessage("Are you sure you want to exit?")
                .setNegativeButton(android.R.string.no, null)
                .setPositiveButton(android.R.string.yes) { _, _ ->
                    activity.finishAffinity() // Fully close the app
                }
                .create()
                .show()
        }
    }
}