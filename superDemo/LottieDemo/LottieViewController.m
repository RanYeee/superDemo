//
//  LottieViewController.m
//  SuperDemo
//
//  Created by Rany on 2017/2/6.
//  Copyright © 2017年 Rany. All rights reserved.
//

#import "LottieViewController.h"
#import <Lottie/Lottie.h>
@interface LottieViewController ()

@end

@implementation LottieViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    self.view.backgroundColor = [UIColor whiteColor];
    
    LOTAnimationView *animation = [LOTAnimationView animationNamed:@"Lottie"];
    
    [self.view addSubview:animation];
    
    [animation playWithCompletion:^(BOOL animationFinished) {
        // Do Something
    }];

}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
