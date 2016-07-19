//
//  UIImage+AssetImage.m
//  SmartCommunity
//
//  Created by IMac on 15/7/29.
//  Copyright (c) 2015年 Horizontal. All rights reserved.
//

#import "UIImage+AssetImage.h"




@implementation UIImage (AssetImage)

+ (void)fullResolutionImageFromALAsset:(NSURL *)assetUrl result:(void(^)(UIImage *image))result
{
    NSLog(@">>> assetUrl :%@",assetUrl);
     __block UIImage *image;
    ALAssetsLibrary   *lib = [[ALAssetsLibrary alloc] init];
    
    //dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        
        [lib assetForURL:assetUrl resultBlock:^(ALAsset *asset)
         {
             //在这里使用asset来获取图片
             ALAssetRepresentation *assetRep = [asset defaultRepresentation];
             CGImageRef imgRef = [assetRep fullResolutionImage];
             image = [UIImage imageWithCGImage:imgRef
                                         scale:assetRep.scale
                                   orientation:(UIImageOrientation)assetRep.orientation];
             
             if (result) {
                 result(image);
             }
         }
            failureBlock:^(NSError *error)
         {
             
             
         }
         ];
        
//        dispatch_async(dispatch_get_main_queue(), ^{
//            
//            
//        });
//    });

}

@end
