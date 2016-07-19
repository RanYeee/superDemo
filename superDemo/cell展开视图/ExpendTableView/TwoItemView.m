//
//  TwoItemView.m
//  BloodTest
//
//  Created by Ducky on 16/4/7.
//  Copyright © 2016年 kinglian. All rights reserved.
//

#import "TwoItemView.h"

@interface TwoItemView ()<UITableViewDelegate,UITableViewDataSource>

@end

@implementation TwoItemView

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/

+ (instancetype)creatTwoItewmView{
    return [[[NSBundle mainBundle]loadNibNamed:@"TwoItemView" owner:self options:nil]lastObject];
}

#pragma mark - datasource

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section{
    return 1;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath{
    UITableViewCell *cell = [[UITableViewCell alloc]initWithStyle:UITableViewCellStyleSubtitle reuseIdentifier:@"cee"];
    return cell;
}

@end
