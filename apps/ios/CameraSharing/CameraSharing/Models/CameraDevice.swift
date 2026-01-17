//
//  CameraDevice.swift
//  CameraSharing
//
//  Created by Claude Code on 2025-01-16.
//

import Foundation

/// カメラデバイスを表すモデル
struct CameraDevice: Identifiable {
    let id: UUID
    let name: String
    let roomId: String?
    let ipAddress: String
    let port: Int
    let resolution: CameraResolution

    init(
        id: UUID = UUID(),
        name: String,
        roomId: String? = nil,
        ipAddress: String,
        port: Int,
        resolution: CameraResolution = .res1080p
    ) {
        self.id = id
        self.name = name
        self.roomId = roomId
        self.ipAddress = ipAddress
        self.port = port
        self.resolution = resolution
    }
}

/// カメラ解像度
enum CameraResolution: String, CaseIterable {
    case res360p = "360p"
    case res480p = "480p"
    case res720p = "720p"
    case res1080p = "1080p"
    case res4K = "4K"

    var label: String {
        switch self {
        case .res360p: return "360p (低画質・低遅延)"
        case .res480p: return "480p (標準)"
        case .res720p: return "720p (HD)"
        case .res1080p: return "1080p (フルHD)"
        case .res4K: return "4K (超高画質)"
        }
    }

    var dimensions: (width: Int, height: Int) {
        switch self {
        case .res360p: return (640, 360)
        case .res480p: return (854, 480)
        case .res720p: return (1280, 720)
        case .res1080p: return (1920, 1080)
        case .res4K: return (3840, 2160)
        }
    }
}

/// シグナリングモード
enum SignalingMode {
    case peerJS(serverURL: String)  // Phase 1: PeerJS互換
    case local                       // Phase 2: ローカルシグナリング
}
