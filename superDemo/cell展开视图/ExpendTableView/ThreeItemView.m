//
//  ThreeItemView.m
//  BloodTest
//
//  Created by Ducky on 16/4/7.
//  Copyright © 2016年 kinglian. All rights reserved.
//

#import "ThreeItemView.h"
#import "ThreeItemCellTableViewCell.h"

@interface ThreeItemView ()<UITableViewDataSource,UITableViewDelegate>

@end

@implementation ThreeItemView

+ (instancetype)creatThreeItemView{
    return [[[NSBundle mainBundle]loadNibNamed:@"ThreeItemView" owner:self options:nil]lastObject];
}

#pragma mark - datasource

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section{
    return 1;
}
- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath{
    ThreeItemCellTableViewCell *cell = [ThreeItemCellTableViewCell creatThreeItemCell];
    return cell;
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath{
    return 470;
}

@end
