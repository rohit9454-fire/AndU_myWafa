//
//  JailbreakDetector.swift
//  MyWafa
//
//  Created by Rohit Singh on 02/06/25.
//

import Foundation
import React
 
@objc(JailbreakDetector)
class JailbreakDetector: NSObject {
 
    @objc
    func standardDeviceCheck() {
        CheckStandardDevice.standardDeviceCheck()
    }
 
    @objc
    static func requiresMainQueueSetup() -> Bool {
        return true
    }
}
